# SEO & favicon — design spec

**Date:** 2026-04-27
**Site:** https://wiolettaslowik.com/ (EN) and https://wiolettaslowik.com/de/ (DE)
**Goal:** ship a complete, professional SEO surface — favicons, OG/Twitter link previews, structured data, sitemap, robots — without changing the visible site.

## Scope

In: favicon kit, OG/Twitter Cards, JSON-LD structured data, `sitemap.xml` + `robots.txt`.
Out: `theme-color` and other browser-chrome polish (deferred).

## 1. Information architecture

A new `src/seo.ts` module exports `getSeo(locale, currentUrl)` that returns a single typed object containing every metadata value the head needs (title, description, canonical, hreflang alternates, OG/Twitter values, JSON-LD payloads, image URLs).

`src/layouts/Base.astro` calls `getSeo()` once and renders all tags. No per-page boilerplate; both `src/pages/index.astro` and `src/pages/de/index.astro` keep their current shape — the only thing they pass is the locale's `Copy` object, which `Base.astro` already receives.

Per-locale strings live in `src/i18n/{en,de}.ts`. The existing `meta: { title, description }` block in the `Copy` interface is extended with optional `ogTitle` and `ogDescription` — if absent, the helper falls back to `meta.title` / `meta.description`. One source of truth, no drift.

## 2. Favicon set

**Source of truth:** hand-authored `public/favicon.svg` — italic Fraunces "W" inside a 1px-stroke circle, ink color `oklch(0.18 0.01 80)`, transparent background, ~1KB. SVG uses native `<text>` with the same Fraunces font, falling back to serif if the font isn't loaded (acceptable at 16/32px).

**Files in `public/`:**

| File | Purpose | Size |
| --- | --- | --- |
| `favicon.svg` | Modern browsers (Safari, Chrome, Firefox) | scalable |
| `favicon.ico` | Legacy fallback | 16/32/48 multi-res |
| `apple-touch-icon.png` | iOS home-screen | 180×180, cream fill (no transparency — iOS strips it) |
| `icon-192.png` | Android home-screen via manifest | 192×192 |
| `icon-512.png` | Android maskable + splash | 512×512 |
| `site.webmanifest` | PWA-lite, Android home-screen metadata | JSON |

**`site.webmanifest` contents:**

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

**Linked from `<head>` in `Base.astro`:**

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="alternate icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

**Production:** PNG/ICO files are rendered once during implementation from the SVG by a small Node script `scripts/render-static-assets.mjs`. The script depends on `@resvg/resvg-js` (font-aware SVG → PNG, accepts explicit font paths) and `png-to-ico` (PNG bundle → multi-resolution ICO). Both are installed with `npm install --no-save @resvg/resvg-js png-to-ico` so they never enter `package.json`. The script downloads Fraunces woff2 files from Google Fonts on first run and caches them to `scripts/.fontcache/` (gitignored). The script is committed for future regeneration but is **not** wired into `npm run build`. Source SVG is committed; raster outputs are committed.

## 3. OG / Twitter cards

**Files:**

- `public/og/og-en.svg` and `public/og/og-de.svg` — source SVGs, committed for future edits
- `public/og/og-en.png` and `public/og/og-de.png` — rendered 1200×630 PNGs, committed

**Rendering:** same `scripts/render-static-assets.mjs` script as the favicon kit (uses `@resvg/resvg-js` with cached Fraunces woff2 fonts). Run once during implementation, results committed. To regenerate later: `npm install --no-save @resvg/resvg-js png-to-ico && node scripts/render-static-assets.mjs`.

**Card design** (mirrors site visual vocabulary):

- Background: cream `oklch(0.985 0.005 80)` (rendered as the equivalent sRGB)
- Top-left: mono kicker, 22px, muted: `§ 01 — HR & EMPLOYMENT LAW` (EN) / `§ 01 — HR & ARBEITSRECHT` (DE)
- Center-left: italic Fraunces 88px, ink: `Wioletta Słowik`
- Below name: italic Fraunces 36px, accent olive `oklch(0.55 0.06 110)`: `HR Business Partner · LL.B. Business Law` (EN) / `HR Business Partner · LL.B. Wirtschaftsrecht` (DE)
- Bottom-left: 32px thin rule + mono `wiolettaslowik.com`
- Bottom-right: W-in-circle motif, 96px diameter, 1px stroke
- Generous margins: 80px from edges
- Optical hierarchy is identical to the site so a recipient who sees the card and clicks through arrives at a recognizable page

**Tags emitted in `<head>`** (per locale, absolute URLs):

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://wiolettaslowik.com/" />
<meta property="og:image" content="https://wiolettaslowik.com/og/og-en.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
<meta property="og:site_name" content="Wioletta Słowik" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="de_DE" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://wiolettaslowik.com/og/og-en.png" />
<meta name="twitter:image:alt" content="..." />
```

DE page substitutes `de_DE`/`en_US`, `og-de.png`, German strings.

## 4. JSON-LD structured data

Two `<script type="application/ld+json">` blocks emitted in `<head>`, generated server-side from the i18n dictionary so they cannot drift from visible content.

**`Person` schema** (per page, locale-tagged where applicable):

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Wioletta Słowik",
  "givenName": "Wioletta",
  "familyName": "Słowik",
  "jobTitle": "HR Business Partner",
  "email": "mailto:hello@wiolettaslowik.com",
  "url": "https://wiolettaslowik.com/",
  "image": "https://wiolettaslowik.com/assets/wioletta.png",
  "sameAs": ["https://www.linkedin.com/in/wioletta-slowik/"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Münster",
    "addressRegion": "North Rhine-Westphalia",
    "addressCountry": "DE"
  },
  "knowsLanguage": ["de", "en", "pl"],
  "knowsAbout": [
    "Employment Law",
    "HR Operations",
    "Works Council",
    "Personio",
    "DATEV LODAS",
    "Compliance"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "LL.B. Wirtschaftsrecht"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Allinq Networks GmbH"
  }
}
```

**`WebSite` schema** (homepage only, both locales):

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wioletta Słowik",
  "url": "https://wiolettaslowik.com/",
  "inLanguage": ["en", "de"]
}
```

The `Person.url` and `Person.image` are absolute URLs. `addressRegion` is rendered in English on both locales (German equivalent `Nordrhein-Westfalen` is acceptable but English form has wider crawler recognition).

## 5. Sitemap + `robots.txt`

**Sitemap:** install `@astrojs/sitemap` (official Astro integration). Configure in `astro.config.mjs`:

```js
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://wiolettaslowik.com",
  // existing config…
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", de: "de-DE" }
      }
    })
  ]
});
```

Build emits `dist/sitemap-index.xml` + `dist/sitemap-0.xml`. URL list will contain `/` and `/de/`, each with `<xhtml:link rel="alternate" hreflang>` annotations linking the locale alternates.

**`public/robots.txt`** (committed):

```
User-agent: *
Allow: /

Sitemap: https://wiolettaslowik.com/sitemap-index.xml
```

## 6. File-level changes summary

**New files:**

- `src/seo.ts`
- `public/favicon.svg`
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/site.webmanifest`
- `public/og/og-en.svg`, `public/og/og-de.svg`
- `public/og/og-en.png`, `public/og/og-de.png`
- `public/robots.txt`
- `scripts/render-static-assets.mjs` (one-off renderer, not run at build time)

**Modified files:**

- `src/layouts/Base.astro` — extend `<head>` with favicon links, OG/Twitter tags, JSON-LD scripts
- `src/i18n/types.ts` — extend `Copy['meta']` with optional `ogTitle?`, `ogDescription?`
- `src/i18n/en.ts`, `src/i18n/de.ts` — add `ogTitle` / `ogDescription` if they should differ from page title/description
- `astro.config.mjs` — register `@astrojs/sitemap`
- `package.json` — add `@astrojs/sitemap` to dependencies

## 7. Verification (definition of done)

- `npm run typecheck` — 0 errors
- `npm run build` — clean; `dist/` contains: `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`, all favicon assets, `og/og-en.png`, `og/og-de.png`
- Manual: paste rendered HTML of `/` and `/de/` into [Google Rich Results Test](https://search.google.com/test/rich-results) — `Person` + `WebSite` validate without warnings
- Manual: paste `https://wiolettaslowik.com/` and `/de/` into [opengraph.xyz](https://opengraph.xyz/) — card renders correctly for both locales
- Manual: open `dist/index.html` and confirm absolute URLs are correct (no relative paths in OG/JSON-LD)
- Local Lighthouse audit (incognito, mobile preset) — SEO score ≥ 95

## 8. Out of scope / future

- Per-section anchored sub-pages (e.g. `/experience` as its own URL) — current design has all sections on one page; deep-linkable section anchors already exist.
- Multilingual variants of the JSON-LD `knowsAbout` skill labels — kept English-only for crawler consistency.
- Paid analytics / tag manager — none planned.
- `theme-color` meta and full PWA install flow — deferred.
- A CI step to validate JSON-LD on every push — manual verification only for now.
