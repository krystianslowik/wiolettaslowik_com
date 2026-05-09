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

export interface PackageGroup {
  /** Optional group label (e.g. "HIRE"). Absent for ungrouped lists. */
  label?: string;
  items: string[];
}

export interface PackageModel {
  name: string;
  hours: string;
  desc: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  /** Compact price shown in the collapsed accordion row (e.g. "690–1.490 €"). */
  priceShort: string;
  intro: string;
  content: PackageGroup[];
  result: string;
  audience: string;
  duration?: string;
  models?: PackageModel[];
  /** Full investment line shown in the expanded panel. */
  investment: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  body: string;
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
    packages: string;
    process: string;
    systems: string;
    experience: string;
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
    /** Lede paragraphs, rendered one `<p>` each. */
    lede: string[];
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
  packages: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    expandAll: string;
    collapseAll: string;
    labels: {
      content: string;
      result: string;
      audience: string;
      duration: string;
      models: string;
      investment: string;
    };
    items: Package[];
  };
  process: {
    kicker: string;
    index: string;
    title: string;
    lede: string;
    steps: ProcessStep[];
    cta: string;
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
