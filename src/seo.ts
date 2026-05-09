import type { Copy, Locale } from "./i18n";

export const SITE_URL = "https://wiolettaslowik.com";

export type PageKind = "home" | "packages";

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

const PATHS: Record<PageKind, Record<Locale, string>> = {
  home: { en: "/", de: "/de/" },
  packages: { en: "/packages/", de: "/de/pakete/" },
};

export function absUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${trimmed}`;
}

export function getSeo(t: Copy, kind: PageKind = "home"): SeoTags {
  const locale = t.locale;
  const otherLocale: Locale = locale === "en" ? "de" : "en";
  const paths = PATHS[kind];
  const canonical = absUrl(paths[locale]);
  const ogImage = absUrl(`/og/og-${locale}.png`);
  const portrait = absUrl("/assets/wioletta.png");

  const meta = kind === "packages" ? t.packages.pageMeta : t.meta;
  const ogTitle = meta.ogTitle ?? meta.title;
  const ogDescription = meta.ogDescription ?? meta.description;

  return {
    htmlLang: t.htmlLang,
    title: meta.title,
    description: meta.description,
    canonical,
    alternates: [
      { hreflang: "en", href: absUrl(paths.en) },
      { hreflang: "de", href: absUrl(paths.de) },
      { hreflang: "x-default", href: absUrl(paths.en) },
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
      imageAlt: meta.ogImageAlt,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      imageAlt: meta.ogImageAlt,
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
