import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import cloudflare from "@astrojs/cloudflare";

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
    partytown({
      // Forward gtag's dataLayer.push calls from main thread to the worker.
      config: { forward: ["dataLayer.push"] },
    }),
  ],

  adapter: cloudflare()
});