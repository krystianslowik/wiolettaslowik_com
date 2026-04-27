import { defineConfig } from "astro/config";

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
});
