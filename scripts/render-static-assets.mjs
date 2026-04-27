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

// resvg-js (≤2.6) does not parse woff2 reliably. Fetch TTF variable fonts
// directly from the official Google Fonts repo on GitHub instead.
const FONT_TTF_URLS = [
  {
    name: "Fraunces.ttf",
    url: "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
  },
  {
    name: "Fraunces-Italic.ttf",
    url: "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
  },
  {
    name: "GeistMono.ttf",
    url: "https://github.com/google/fonts/raw/main/ofl/geistmono/GeistMono%5Bwght%5D.ttf",
  },
];

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function ensureFonts() {
  const cached = readdirSync(fontDir).filter((n) => n.endsWith(".ttf"));
  if (cached.length === FONT_TTF_URLS.length) {
    return cached.map((n) => resolve(fontDir, n));
  }
  console.log("→ downloading TTF variable fonts (one-time, cached to scripts/.fontcache/)");
  const paths = [];
  for (const { name, url } of FONT_TTF_URLS) {
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

function rasterize(svgPath, { width, background }) {
  const svg = readFileSync(svgPath);
  const opts = {
    fitTo: width ? { mode: "width", value: width } : { mode: "original" },
    font: {
      fontDirs: [fontDir],
      loadSystemFonts: false,
    },
    background,
  };
  const resvg = new Resvg(svg, opts);
  return resvg.render().asPng();
}

// ---------- main -----------------------------------------------------

(async () => {
  await ensureFonts();

  const faviconSvg = pub("favicon.svg");
  if (!existsSync(faviconSvg)) throw new Error(`missing ${faviconSvg}`);

  // apple-touch-icon: 180×180, OPAQUE cream (iOS strips alpha)
  writeFileSync(
    pub("apple-touch-icon.png"),
    rasterize(faviconSvg, { width: 180, background: "#fbf9f5" })
  );
  console.log("✓ apple-touch-icon.png");

  // android manifest icons: transparent
  for (const size of [192, 512]) {
    writeFileSync(
      pub(`icon-${size}.png`),
      rasterize(faviconSvg, { width: size })
    );
    console.log(`✓ icon-${size}.png`);
  }

  // multi-res ICO: 16/32/48
  const icoBuffers = [16, 32, 48].map((size) =>
    rasterize(faviconSvg, { width: size })
  );
  writeFileSync(pub("favicon.ico"), await pngToIco(icoBuffers));
  console.log("✓ favicon.ico");

  // OG cards
  for (const lang of ["en", "de"]) {
    const ogSvg = pub(`og/og-${lang}.svg`);
    if (!existsSync(ogSvg)) throw new Error(`missing ${ogSvg}`);
    writeFileSync(
      pub(`og/og-${lang}.png`),
      rasterize(ogSvg, { width: 1200 })
    );
    console.log(`✓ og/og-${lang}.png`);
  }

  console.log("\ndone.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
