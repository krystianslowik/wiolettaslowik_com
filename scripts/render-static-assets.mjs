#!/usr/bin/env node
// One-off rasterizer for static SEO assets. Run after editing source SVGs.
//
// Usage:
//   npm install --no-save @resvg/resvg-js png-to-ico
//   node scripts/render-static-assets.mjs
//
// Reads:
//   public/favicon.svg
//   public/og/og-en.svg
//   public/og/og-de.svg
//
// Writes:
//   public/favicon.ico
//   public/apple-touch-icon.png
//   public/icon-192.png
//   public/icon-512.png
//   public/og/og-en.png
//   public/og/og-de.png

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const fontDir = resolve(__dirname, ".fontcache");
const pub = (p) => resolve(root, "public", p);

mkdirSync(fontDir, { recursive: true });

// ---------- font cache -----------------------------------------------

const FONT_CSS_URLS = [
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&display=swap",
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap",
];

async function fetchText(url) {
  // Google Fonts serves different font formats based on User-Agent.
  // A modern UA gets woff2. Without one we get TTF (older clients). woff2 is fine for resvg-js.
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0",
    },
  });
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function ensureFonts() {
  const cached = readdirSync(fontDir).filter((n) => n.endsWith(".woff2"));
  if (cached.length > 0) {
    return cached.map((n) => resolve(fontDir, n));
  }
  console.log("→ downloading fonts (one-time, cached to scripts/.fontcache/)");
  const allUrls = new Set();
  for (const cssUrl of FONT_CSS_URLS) {
    const css = await fetchText(cssUrl);
    for (const m of css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)) {
      allUrls.add(m[1]);
    }
  }
  if (allUrls.size === 0) {
    throw new Error("no woff2 URLs parsed from Google Fonts CSS");
  }
  const paths = [];
  for (const url of allUrls) {
    const name = basename(new URL(url).pathname);
    const dest = resolve(fontDir, name);
    if (!existsSync(dest)) {
      const buf = await fetchBuffer(url);
      writeFileSync(dest, buf);
      console.log(`   cached ${name} (${buf.length} bytes)`);
    }
    paths.push(dest);
  }
  return paths;
}

// ---------- rasterizers ----------------------------------------------

function rasterize(svgPath, { width, fontFiles, background }) {
  const svg = readFileSync(svgPath);
  const opts = {
    fitTo: width ? { mode: "width", value: width } : { mode: "original" },
    font: { fontFiles, loadSystemFonts: false },
    background,
  };
  const resvg = new Resvg(svg, opts);
  return resvg.render().asPng();
}

// ---------- main -----------------------------------------------------

(async () => {
  const fontFiles = await ensureFonts();

  const faviconSvg = pub("favicon.svg");
  if (!existsSync(faviconSvg)) throw new Error(`missing ${faviconSvg}`);

  // apple-touch-icon: 180×180, OPAQUE cream (iOS strips alpha)
  writeFileSync(
    pub("apple-touch-icon.png"),
    rasterize(faviconSvg, { width: 180, fontFiles, background: "#fbf9f5" })
  );
  console.log("✓ apple-touch-icon.png");

  // android manifest icons: transparent
  for (const size of [192, 512]) {
    writeFileSync(
      pub(`icon-${size}.png`),
      rasterize(faviconSvg, { width: size, fontFiles })
    );
    console.log(`✓ icon-${size}.png`);
  }

  // multi-res ICO: 16/32/48
  const icoBuffers = [16, 32, 48].map((size) =>
    rasterize(faviconSvg, { width: size, fontFiles })
  );
  writeFileSync(pub("favicon.ico"), await pngToIco(icoBuffers));
  console.log("✓ favicon.ico");

  // OG cards
  for (const lang of ["en", "de"]) {
    const ogSvg = pub(`og/og-${lang}.svg`);
    if (!existsSync(ogSvg)) throw new Error(`missing ${ogSvg}`);
    writeFileSync(
      pub(`og/og-${lang}.png`),
      rasterize(ogSvg, { width: 1200, fontFiles })
    );
    console.log(`✓ og/og-${lang}.png`);
  }

  console.log("\ndone.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
