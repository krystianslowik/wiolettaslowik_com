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
