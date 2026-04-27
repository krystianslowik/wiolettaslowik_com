export type Locale = "en" | "de";

export interface Job {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  duration: string;
  parallel?: boolean;
  bullets: string[];
  skills: string[];
}

export interface Copy {
  locale: Locale;
  htmlLang: string;
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
  nav: {
    about: string;
    focus: string;
    experience: string;
    systems: string;
    contact: string;
    cta: string;
  };
  profile: {
    name: string;
    email: string;
    location: string;
    linkedin: string;
  };
  hero: {
    titleA: string;
    titleB: string;
    titleC: string;
    /** Lede with `<strong>` placeholder around the name. The `{name}` token is replaced at render. */
    ledeBefore: string;
    ledeAfter: string;
    ctaPrimary: string;
    ctaSecondary: string;
    caption: string;
    meta: Array<[string, string]>;
  };
  about: {
    kicker: string;
    index: string;
    /** Title with `{em}...{/em}` token marking the italic accent fragment. */
    title: string;
    body: string[];
    principles: Array<[string, string]>;
  };
  focus: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    areas: Array<[string, string, string]>;
  };
  experience: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    expandAll: string;
    collapseAll: string;
    selectedWork: string;
    skills: string;
    parallel: string;
    jobs: Job[];
  };
  systems: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    list: string[];
    asideA: string;
    asideB: string;
  };
  contact: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    info: Array<[string, string | null]>;
    sendCta: string;
  };
  footer: {
    tag: string;
    backToTop: string;
  };
  langSwitch: {
    label: string;
    en: string;
    de: string;
  };
}
