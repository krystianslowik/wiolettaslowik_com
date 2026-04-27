import type { Copy, Locale } from "./types";
import { en } from "./en";
import { de } from "./de";

export const COPY: Record<Locale, Copy> = { en, de };

export const LOCALES: Locale[] = ["en", "de"];

export function getCopy(locale: Locale): Copy {
  return COPY[locale];
}

export function homeUrl(locale: Locale): string {
  return locale === "en" ? "/" : `/${locale}/`;
}

export type { Copy, Locale };
