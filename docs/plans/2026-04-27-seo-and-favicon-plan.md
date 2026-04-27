# SEO & favicon implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the full SEO surface defined in `docs/specs/2026-04-27-seo-and-favicon-design.md` — favicon kit, OG/Twitter cards, JSON-LD, sitemap, robots — without changing the visible site.

**Architecture:** Generate static assets (favicons, OG cards) once from committed SVG sources via a one-off Node script that uses `@resvg/resvg-js` + `png-to-ico` installed with `--no-save`. Centralize all `<head>` metadata in a typed `src/seo.ts` helper consumed by `src/layouts/Base.astro`. Use `@astrojs/sitemap` for the sitemap; ship a static `robots.txt`.

**Tech Stack:** Astro 5 (static), TypeScript (strict), `@astrojs/sitemap` (added), Schema.org JSON-LD, Open Graph + Twitter Card meta, SVG → PNG raster pipeline via `@resvg/resvg-js`.

**Out of scope:** `theme-color`, browser-chrome polish, unit tests for the helper (TypeScript types + manual rich-results / opengraph.xyz verification are the gates per spec §7).

---

## File map

**New (committed):**
- `public/favicon.svg` — primary favicon source
- `public/favicon.ico` — generated, multi-res
- `public/apple-touch-icon.png` — generated, 180×180, opaque cream fill
- `public/icon-192.png`, `public/icon-512.png` — generated, manifest icons
- `public/site.webmanifest`
- `public/og/og-en.svg`, `public/og/og-de.svg` — OG card source SVGs
- `public/og/og-en.png`, `public/og/og-de.png` — generated, 1200×630
- `public/robots.txt`
- `scripts/render-static-assets.mjs` — one-off renderer
- `src/seo.ts` — typed metadata builder
- `docs/plans/2026-04-27-seo-and-favicon-plan.md` (this file)

**Modified:**
- `src/i18n/types.ts` — extend `Copy['meta']` with optional `ogTitle?` / `ogDescription?` / `ogImageAlt?`
- `src/i18n/en.ts`, `src/i18n/de.ts` — add the new optional strings
- `src/layouts/Base.astro` — render full SEO `<head>`
- `astro.config.mjs` — register `@astrojs/sitemap`
- `package.json` — add `@astrojs/sitemap`
- `.gitignore` — add `scripts/.fontcache/`

---

## Task 1: Author favicon SVG (path-based, no font dep)

**Files:**
- Create: `public/favicon.svg`

The W is rendered as an inline SVG path so the favicon is renderable by any SVG tool without font lookup. Geometry is calibrated for legibility at 16×16: thicker strokes than the nav glyph, slight italic slant via skew.

- [ ] **Step 1:** Create `public/favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="16" r="14.5" stroke="#2c2a23" stroke-width="1.5"/>
  <g transform="translate(16 16) skewX(-12) translate(-16 -16)">
    <path d="M8.5 10 L11.5 22 L14.5 13 L17.5 22 L20.5 10"
          stroke="#2c2a23" stroke-width="1.6"
          fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
```

- [ ] **Step 2:** Verify the file by opening it in a browser:

```zsh
open public/favicon.svg
```

Expected: a small W in a circle, slightly slanted, ink color.

- [ ] **Step 3:** Commit:

```zsh
git add public/favicon.svg
git commit -m "Add favicon SVG (W-in-circle, path-based)"
```

---

## Task 2: Author OG card SVGs (en + de)

**Files:**
- Create: `public/og/og-en.svg`
- Create: `public/og/og-de.svg`

These SVGs use Fraunces `<text>` elements. They will be rasterized by the script in Task 4 with explicit font paths, so the `<text>` elements render correctly in the PNG output. The SVGs themselves are also valid as fallback assets if a platform ever supports SVG OG.

- [ ] **Step 1:** Create the directory:

```zsh
mkdir -p public/og
```

- [ ] **Step 2:** Create `public/og/og-en.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbf9f5"/>

  <!-- top kicker -->
  <text x="80" y="120"
        font-family="Geist Mono, ui-monospace, monospace"
        font-size="22" letter-spacing="2"
        fill="#75716a">§ 01 — HR &amp; EMPLOYMENT LAW</text>

  <!-- main name -->
  <text x="80" y="305"
        font-family="Fraunces, serif"
        font-style="italic" font-weight="500"
        font-size="118" letter-spacing="-3"
        fill="#2c2a23">Wioletta Słowik</text>

  <!-- subtitle -->
  <text x="80" y="375"
        font-family="Fraunces, serif"
        font-style="italic" font-weight="500"
        font-size="42" letter-spacing="-1"
        fill="#7d8a4a">HR Business Partner · LL.B. Business Law</text>

  <!-- bottom-left rule + url -->
  <line x1="80" y1="540" x2="148" y2="540" stroke="#75716a" stroke-width="1"/>
  <text x="160" y="546"
        font-family="Geist Mono, ui-monospace, monospace"
        font-size="22" letter-spacing="2"
        fill="#75716a">WIOLETTASLOWIK.COM</text>

  <!-- bottom-right W mark -->
  <g transform="translate(1024 470)">
    <circle cx="48" cy="48" r="46" stroke="#2c2a23" stroke-width="1.5" fill="none"/>
    <g transform="translate(48 48) skewX(-12) translate(-48 -48)">
      <path d="M22 30 L34 66 L48 38 L62 66 L74 30"
            stroke="#2c2a23" stroke-width="2"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
```

- [ ] **Step 3:** Create `public/og/og-de.svg` (identical layout, German strings):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbf9f5"/>

  <text x="80" y="120"
        font-family="Geist Mono, ui-monospace, monospace"
        font-size="22" letter-spacing="2"
        fill="#75716a">§ 01 — HR &amp; ARBEITSRECHT</text>

  <text x="80" y="305"
        font-family="Fraunces, serif"
        font-style="italic" font-weight="500"
        font-size="118" letter-spacing="-3"
        fill="#2c2a23">Wioletta Słowik</text>

  <text x="80" y="375"
        font-family="Fraunces, serif"
        font-style="italic" font-weight="500"
        font-size="42" letter-spacing="-1"
        fill="#7d8a4a">HR Business Partner · LL.B. Wirtschaftsrecht</text>

  <line x1="80" y1="540" x2="148" y2="540" stroke="#75716a" stroke-width="1"/>
  <text x="160" y="546"
        font-family="Geist Mono, ui-monospace, monospace"
        font-size="22" letter-spacing="2"
        fill="#75716a">WIOLETTASLOWIK.COM</text>

  <g transform="translate(1024 470)">
    <circle cx="48" cy="48" r="46" stroke="#2c2a23" stroke-width="1.5" fill="none"/>
    <g transform="translate(48 48) skewX(-12) translate(-48 -48)">
      <path d="M22 30 L34 66 L48 38 L62 66 L74 30"
            stroke="#2c2a23" stroke-width="2"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
```

- [ ] **Step 4:** Open both SVGs in a browser to spot-check layout:

```zsh
open public/og/og-en.svg public/og/og-de.svg
```

Expected: cream background, mono kicker top-left, italic name center-left, olive italic subtitle, mono URL bottom-left, W-circle bottom-right. Fraunces will only render correctly if installed on the system; otherwise serif fallback is fine — the rasterizer in Task 4 will load Fraunces explicitly.

- [ ] **Step 5:** Commit:

```zsh
git add public/og/og-en.svg public/og/og-de.svg
git commit -m "Add OG card source SVGs (en, de)"
```

---

## Task 3: Add `scripts/.fontcache/` to gitignore

**Files:**
- Modify: `.gitignore`

The renderer caches downloaded woff2 files to avoid re-fetching on each run. Cache directory must not enter the repo.

- [ ] **Step 1:** Append to `.gitignore`:

```
# fonts cached by scripts/render-static-assets.mjs
scripts/.fontcache/
```

- [ ] **Step 2:** Verify:

```zsh
grep fontcache .gitignore
```

Expected output:
```
# fonts cached by scripts/render-static-assets.mjs
scripts/.fontcache/
```

- [ ] **Step 3:** Commit:

```zsh
git add .gitignore
git commit -m "Gitignore scripts/.fontcache/ for render-time woff2 cache"
```

---

## Task 4: Write the renderer script

**Files:**
- Create: `scripts/render-static-assets.mjs`

Single Node script that:
1. Downloads Fraunces + Geist Mono woff2 from Google Fonts on first run, caches to `scripts/.fontcache/`.
2. Uses `@resvg/resvg-js` with explicit `font.fontFiles` to rasterize all SVGs to PNG.
3. Bundles 16/32/48 PNGs into `favicon.ico` via `png-to-ico`.

The script is idempotent — re-running overwrites outputs. It is **not** wired into `npm run build`.

- [ ] **Step 1:** Create the directory:

```zsh
mkdir -p scripts
```

- [ ] **Step 2:** Create `scripts/render-static-assets.mjs`:

```js
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
```

- [ ] **Step 3:** Verify the file is syntactically valid:

```zsh
node --check scripts/render-static-assets.mjs && echo "ok"
```

Expected output: `ok`

- [ ] **Step 4:** Commit:

```zsh
git add scripts/render-static-assets.mjs
git commit -m "Add scripts/render-static-assets.mjs (one-off SVG rasterizer)"
```

---

## Task 5: Run the renderer and commit generated assets

**Files (generated):**
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/icon-192.png`, `public/icon-512.png`
- `public/og/og-en.png`, `public/og/og-de.png`

- [ ] **Step 1:** Install renderer deps with `--no-save` (so `package.json` stays clean):

```zsh
npm install --no-save @resvg/resvg-js png-to-ico
```

Expected: `node_modules` populated, no diff in `package.json` or `package-lock.json`. Verify:

```zsh
git diff package.json package-lock.json
```

Expected output: empty (no diff).

If a diff appears, hard-reset those two files:

```zsh
git checkout -- package.json package-lock.json
```

- [ ] **Step 2:** Run the renderer:

```zsh
node scripts/render-static-assets.mjs
```

Expected output (first run, font download):
```
→ downloading fonts (one-time, cached to scripts/.fontcache/)
   cached fraunces-italic-…woff2 (… bytes)
   …
✓ apple-touch-icon.png
✓ icon-192.png
✓ icon-512.png
✓ favicon.ico
✓ og/og-en.png
✓ og/og-de.png

done.
```

- [ ] **Step 3:** Spot-check the outputs visually:

```zsh
open public/favicon.ico public/apple-touch-icon.png public/og/og-en.png public/og/og-de.png
```

Expected: favicon shows clean W-circle; apple icon has cream background; OG cards show "Wioletta Słowik" in italic Fraunces, olive subtitle, W-mark in corner.

- [ ] **Step 4:** Stage generated assets, leave font cache out:

```zsh
git status -s public/ scripts/
```

Expected: only the generated PNGs and ICO show up; `scripts/.fontcache/` is gitignored.

- [ ] **Step 5:** Commit:

```zsh
git add public/favicon.ico public/apple-touch-icon.png public/icon-192.png public/icon-512.png public/og/og-en.png public/og/og-de.png
git commit -m "Render favicon set and OG cards from source SVGs"
```

- [ ] **Step 6:** Optional cleanup — uninstall the no-save deps to keep `node_modules` minimal:

```zsh
npm prune
```

This is safe because `package.json` was never modified.

---

## Task 6: Web manifest + robots.txt

**Files:**
- Create: `public/site.webmanifest`
- Create: `public/robots.txt`

- [ ] **Step 1:** Create `public/site.webmanifest`:

```json
{
  "name": "Wioletta Słowik",
  "short_name": "W. Słowik",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#2c2a23",
  "background_color": "#fbf9f5",
  "display": "minimal-ui"
}
```

- [ ] **Step 2:** Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://wiolettaslowik.com/sitemap-index.xml
```

- [ ] **Step 3:** Validate the manifest is parseable JSON:

```zsh
node -e "JSON.parse(require('node:fs').readFileSync('public/site.webmanifest','utf8')); console.log('ok')"
```

Expected output: `ok`

- [ ] **Step 4:** Commit:

```zsh
git add public/site.webmanifest public/robots.txt
git commit -m "Add web manifest and robots.txt"
```

---

## Task 7: Extend i18n types and copy

**Files:**
- Modify: `src/i18n/types.ts`
- Modify: `src/i18n/en.ts`
- Modify: `src/i18n/de.ts`

OG strings can be shorter than the full meta description (Twitter card line limit is ~70 chars for title, ~200 for description). Add optional fields; the `seo.ts` helper will fall back to `meta.title` / `meta.description` if absent.

- [ ] **Step 1:** Modify `src/i18n/types.ts` — locate the `meta` block in the `Copy` interface and replace it:

Find:
```ts
  meta: {
    title: string;
    description: string;
  };
```

Replace with:
```ts
  meta: {
    title: string;
    description: string;
    /** OG/Twitter title; defaults to `title` when absent. */
    ogTitle?: string;
    /** OG/Twitter description; defaults to `description` when absent. */
    ogDescription?: string;
    /** Alt text for the OG image. */
    ogImageAlt: string;
  };
```

- [ ] **Step 2:** Modify `src/i18n/en.ts` — locate the `meta` block and replace:

Find:
```ts
  meta: {
    title: "Wioletta Słowik — HR Business Partner · LL.B.",
    description:
      "Wioletta Słowik. HR Business Partner with a legal background. Employment law, compliance, contract management, works council, Personio.",
  },
```

Replace with:
```ts
  meta: {
    title: "Wioletta Słowik — HR Business Partner · LL.B.",
    description:
      "Wioletta Słowik. HR Business Partner with a legal background. Employment law, compliance, contract management, works council, Personio.",
    ogTitle: "Wioletta Słowik — HR Business Partner · LL.B.",
    ogDescription:
      "HR Generalist with an LL.B. in Business Law. Contracts, works council, Personio + DATEV LODAS, employee relations.",
    ogImageAlt:
      "Wioletta Słowik — HR Business Partner · LL.B. Business Law",
  },
```

- [ ] **Step 3:** Modify `src/i18n/de.ts` — locate the `meta` block and replace:

Find:
```ts
  meta: {
    title: "Wioletta Słowik — HR Business Partner · LL.B.",
    description:
      "Wioletta Słowik. HR Business Partner mit juristischem Hintergrund. Arbeitsrecht, Compliance, Vertragsmanagement, Betriebsrat, Personio.",
  },
```

Replace with:
```ts
  meta: {
    title: "Wioletta Słowik — HR Business Partner · LL.B.",
    description:
      "Wioletta Słowik. HR Business Partner mit juristischem Hintergrund. Arbeitsrecht, Compliance, Vertragsmanagement, Betriebsrat, Personio.",
    ogTitle: "Wioletta Słowik — HR Business Partner · LL.B.",
    ogDescription:
      "HR-Generalistin mit LL.B. Wirtschaftsrecht. Verträge, Betriebsrat, Personio + DATEV LODAS, Employee Relations.",
    ogImageAlt:
      "Wioletta Słowik — HR Business Partner · LL.B. Wirtschaftsrecht",
  },
```

- [ ] **Step 4:** Typecheck:

```zsh
npm run typecheck 2>&1 | tail -6
```

Expected output:
```
Result (20 files):
- 0 errors
- 0 warnings
- 0 hints
```

- [ ] **Step 5:** Commit:

```zsh
git add src/i18n/types.ts src/i18n/en.ts src/i18n/de.ts
git commit -m "i18n: add ogTitle/ogDescription/ogImageAlt to Copy.meta"
```

---

## Task 8: SEO helper (`src/seo.ts`)

**Files:**
- Create: `src/seo.ts`

Pure function `getSeo(t, currentUrl)` returns one typed object with everything `Base.astro` needs. JSON-LD is built here too so the layout stays simple. All URLs are made absolute against `astro.config.mjs#site`.

- [ ] **Step 1:** Create `src/seo.ts`:

```ts
import type { Copy, Locale } from "./i18n";

export const SITE_URL = "https://wiolettaslowik.com";

export interface SeoTags {
  htmlLang: string;
  title: string;
  description: string;
  canonical: string;
  alternates: Array<{ hreflang: string; href: string }>;
  og: {
    type: "website";
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    localeAlternate: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  jsonLd: {
    person: Record<string, unknown>;
    website: Record<string, unknown>;
  };
}

const LOCALE_TO_OG: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
};

const PATH_FOR_LOCALE: Record<Locale, string> = {
  en: "/",
  de: "/de/",
};

export function absUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${trimmed}`;
}

export function getSeo(t: Copy): SeoTags {
  const locale = t.locale;
  const otherLocale: Locale = locale === "en" ? "de" : "en";
  const canonical = absUrl(PATH_FOR_LOCALE[locale]);
  const ogImage = absUrl(`/og/og-${locale}.png`);
  const portrait = absUrl("/assets/wioletta.png");

  const ogTitle = t.meta.ogTitle ?? t.meta.title;
  const ogDescription = t.meta.ogDescription ?? t.meta.description;

  return {
    htmlLang: t.htmlLang,
    title: t.meta.title,
    description: t.meta.description,
    canonical,
    alternates: [
      { hreflang: "en", href: absUrl(PATH_FOR_LOCALE.en) },
      { hreflang: "de", href: absUrl(PATH_FOR_LOCALE.de) },
      { hreflang: "x-default", href: absUrl(PATH_FOR_LOCALE.en) },
    ],
    og: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: t.profile.name,
      locale: LOCALE_TO_OG[locale],
      localeAlternate: LOCALE_TO_OG[otherLocale],
      image: ogImage,
      imageWidth: 1200,
      imageHeight: 630,
      imageAlt: t.meta.ogImageAlt,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      imageAlt: t.meta.ogImageAlt,
    },
    jsonLd: {
      person: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: t.profile.name,
        givenName: "Wioletta",
        familyName: "Słowik",
        jobTitle: "HR Business Partner",
        email: `mailto:${t.profile.email}`,
        url: absUrl("/"),
        image: portrait,
        sameAs: [t.profile.linkedin],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Münster",
          addressRegion: "North Rhine-Westphalia",
          addressCountry: "DE",
        },
        knowsLanguage: ["de", "en", "pl"],
        knowsAbout: [
          "Employment Law",
          "HR Operations",
          "Works Council",
          "Personio",
          "DATEV LODAS",
          "Compliance",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "LL.B. Wirtschaftsrecht",
        },
        worksFor: {
          "@type": "Organization",
          name: "Allinq Networks GmbH",
        },
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: t.profile.name,
        url: absUrl("/"),
        inLanguage: ["en", "de"],
      },
    },
  };
}
```

- [ ] **Step 2:** Typecheck:

```zsh
npm run typecheck 2>&1 | tail -6
```

Expected output: 0 errors.

- [ ] **Step 3:** Commit:

```zsh
git add src/seo.ts
git commit -m "Add src/seo.ts (typed metadata builder)"
```

---

## Task 9: Render the SEO `<head>` in `Base.astro`

**Files:**
- Modify: `src/layouts/Base.astro`

Replace the existing minimal head with the full SEO surface emitted from `getSeo()`.

- [ ] **Step 1:** Open `src/layouts/Base.astro` and replace the entire frontmatter + `<head>` block.

Find (the whole frontmatter and `<head>...</head>`):
```astro
---
import "../styles/global.css";
import type { Copy } from "../i18n";

interface Props {
  t: Copy;
}

const { t } = Astro.props;
const fontsHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap";
---

<!doctype html>
<html lang={t.htmlLang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{t.meta.title}</title>
    <meta name="description" content={t.meta.description} />

    <link rel="alternate" hreflang="en" href="https://wiolettaslowik.com/" />
    <link rel="alternate" hreflang="de" href="https://wiolettaslowik.com/de/" />
    <link rel="alternate" hreflang="x-default" href="https://wiolettaslowik.com/" />
    <link rel="canonical" href={t.locale === "en" ? "https://wiolettaslowik.com/" : "https://wiolettaslowik.com/de/"} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href={fontsHref} />
  </head>
```

Replace with:
```astro
---
import "../styles/global.css";
import type { Copy } from "../i18n";
import { getSeo } from "../seo";

interface Props {
  t: Copy;
}

const { t } = Astro.props;
const seo = getSeo(t);

const fontsHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap";
---

<!doctype html>
<html lang={seo.htmlLang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />

    {seo.alternates.map((a) => (
      <link rel="alternate" hreflang={a.hreflang} href={a.href} />
    ))}
    <link rel="canonical" href={seo.canonical} />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <meta property="og:type" content={seo.og.type} />
    <meta property="og:title" content={seo.og.title} />
    <meta property="og:description" content={seo.og.description} />
    <meta property="og:url" content={seo.og.url} />
    <meta property="og:site_name" content={seo.og.siteName} />
    <meta property="og:locale" content={seo.og.locale} />
    <meta property="og:locale:alternate" content={seo.og.localeAlternate} />
    <meta property="og:image" content={seo.og.image} />
    <meta property="og:image:width" content={String(seo.og.imageWidth)} />
    <meta property="og:image:height" content={String(seo.og.imageHeight)} />
    <meta property="og:image:alt" content={seo.og.imageAlt} />

    <meta name="twitter:card" content={seo.twitter.card} />
    <meta name="twitter:title" content={seo.twitter.title} />
    <meta name="twitter:description" content={seo.twitter.description} />
    <meta name="twitter:image" content={seo.twitter.image} />
    <meta name="twitter:image:alt" content={seo.twitter.imageAlt} />

    <script type="application/ld+json" set:html={JSON.stringify(seo.jsonLd.person).replace(/</g, "\\u003c")} />
    <script type="application/ld+json" set:html={JSON.stringify(seo.jsonLd.website).replace(/</g, "\\u003c")} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href={fontsHref} />
  </head>
```

- [ ] **Step 2:** Typecheck:

```zsh
npm run typecheck 2>&1 | tail -6
```

Expected output: 0 errors.

- [ ] **Step 3:** Build and inspect head of the EN page:

```zsh
npm run build 2>&1 | tail -3
```

Expected: `2 page(s) built`.

- [ ] **Step 4:** Verify all expected tags are present in the EN output:

```zsh
for tag in 'rel="icon"' 'rel="manifest"' 'apple-touch-icon' 'og:title' 'og:image' 'twitter:card' 'application/ld+json' '"@type":"Person"' '"@type":"WebSite"'; do
  if grep -q "$tag" dist/index.html; then echo "✓ $tag"; else echo "✗ MISSING $tag"; fi
done
```

Expected: every line prefixed with `✓`.

- [ ] **Step 5:** Same check on DE output, plus verify locale-specific values:

```zsh
grep -o 'og:locale" content="de_DE"' dist/de/index.html
grep -o '/og/og-de.png' dist/de/index.html
```

Expected: each grep returns a non-empty match.

- [ ] **Step 6:** Commit:

```zsh
git add src/layouts/Base.astro
git commit -m "Base.astro: emit full SEO head (favicons, OG/Twitter, JSON-LD)"
```

---

## Task 10: Sitemap

**Files:**
- Modify: `package.json` (adds `@astrojs/sitemap` dependency)
- Modify: `astro.config.mjs`

- [ ] **Step 1:** Install:

```zsh
npm install @astrojs/sitemap@^3.4.2
```

Expected: dependency added to `package.json`.

- [ ] **Step 2:** Modify `astro.config.mjs`. Replace the entire file with:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build
export default defineConfig({
  site: "https://wiolettaslowik.com",
  output: "static",
  trailingSlash: "ignore",
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", de: "de-DE" },
      },
    }),
  ],
});
```

- [ ] **Step 3:** Build and verify sitemap files are emitted:

```zsh
npm run build 2>&1 | tail -5 && ls dist/sitemap-*.xml
```

Expected: build succeeds; `dist/sitemap-index.xml` and `dist/sitemap-0.xml` both exist.

- [ ] **Step 4:** Verify sitemap contents include both locale URLs with hreflang annotations:

```zsh
grep -o 'wiolettaslowik.com/' dist/sitemap-0.xml | head -5
grep -c 'hreflang=' dist/sitemap-0.xml
```

Expected: both `/` and `/de/` URLs present; at least 4 `hreflang=` matches (en + de annotations on each of 2 pages).

- [ ] **Step 5:** Verify `robots.txt` is published as-is:

```zsh
cat dist/robots.txt
```

Expected output:
```
User-agent: *
Allow: /

Sitemap: https://wiolettaslowik.com/sitemap-index.xml
```

- [ ] **Step 6:** Commit:

```zsh
git add package.json package-lock.json astro.config.mjs
git commit -m "Add @astrojs/sitemap with i18n alternates"
```

---

## Task 11: Final verification

**No file changes** — just verification gates. Do not declare done until all of these pass.

- [ ] **Step 1:** Typecheck clean:

```zsh
npm run typecheck 2>&1 | tail -6
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 2:** Build clean:

```zsh
npm run build 2>&1 | tail -10
```

Expected: `2 page(s) built` (sitemap is emitted as part of the build, not counted as a page).

- [ ] **Step 3:** Confirm all expected files exist in `dist/`:

```zsh
for f in index.html de/index.html sitemap-index.xml sitemap-0.xml robots.txt favicon.svg favicon.ico apple-touch-icon.png icon-192.png icon-512.png site.webmanifest og/og-en.png og/og-de.png; do
  test -f "dist/$f" && echo "✓ $f" || echo "✗ MISSING dist/$f"
done
```

Expected: every line `✓`.

- [ ] **Step 4:** Spot-check JSON-LD on the EN page is valid JSON (no trailing commas, no template artefacts). Note that `<` will appear as `<` in the source — un-escape before parsing:

```zsh
node -e '
const html = require("node:fs").readFileSync("dist/index.html","utf8");
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let m, count = 0;
while ((m = re.exec(html))) {
  const body = m[1].replace(/\\u003c/g, "<");
  JSON.parse(body);
  console.log("✓ valid:", JSON.parse(body)["@type"]);
  count++;
}
if (count !== 2) { console.error("expected 2, got", count); process.exit(1); }
'
```

Expected output:
```
✓ valid: Person
✓ valid: WebSite
```

- [ ] **Step 5:** Manual: paste rendered HTML of `https://wiolettaslowik.com/` (via `npm run preview` and curl, or after deploy) into Google Rich Results Test:
- URL: <https://search.google.com/test/rich-results>
- Expected: detects `Person` schema; no warnings.

- [ ] **Step 6:** Manual: validate OG card preview for both locales:
- URL: <https://opengraph.xyz/url/https%3A%2F%2Fwiolettaslowik.com%2F> (after deploy)
- And the DE version
- Expected: card image renders; title and description display correctly; site name shown.

- [ ] **Step 7:** Manual: run Lighthouse on the local preview:

```zsh
npm run preview
```

Then in Chrome incognito, open <http://localhost:4321/>, run Lighthouse (mobile preset, SEO category only).
- Expected: SEO score ≥ 95.

- [ ] **Step 8:** No commit needed — this task is verification only.

---

## Self-review log

**1. Spec coverage:** Every spec section maps to a task:
- §1 architecture (`src/seo.ts` + `Base.astro` consumption) → Task 8 + Task 9
- §2 favicon set → Tasks 1, 4, 5, 6
- §3 OG/Twitter → Tasks 2, 4, 5, 9
- §4 JSON-LD → Tasks 8, 9
- §5 sitemap + robots → Tasks 6, 10
- §6 file-level summary → matches the "File map" section above
- §7 verification gates → Task 11

**2. Placeholder scan:** No "TBD", "TODO", "implement later", or generic "add validation" steps. Every step shows the actual code or command.

**3. Type consistency:** `Copy['meta']` extension declared in Task 7 step 1; consumed in Task 8 (`t.meta.ogTitle` / `t.meta.ogDescription` / `t.meta.ogImageAlt`); same identifiers used end-to-end. `getSeo(t)` signature in Task 8 matches the call site in Task 9. `SeoTags` properties referenced in Task 9 (`seo.alternates`, `seo.og.*`, `seo.twitter.*`, `seo.jsonLd.*`) all exist in the interface declared in Task 8.

**4. Decision: no formal unit tests.** The spec's verification gates (typecheck, build, manual rich-results, manual opengraph.xyz, Lighthouse) are sufficient for a static portfolio with one pure helper. Adding `vitest` for one ~80-line module is gold-plating beyond YAGNI. Type safety + build-time verification + manual SEO tooling cover regressions.
