/* global React, ReactDOM */
const { useState, useEffect } = React;

// =========================================================
// I18N CONTENT
// =========================================================
const COPY = {
  en: {
    locale: "en",
    htmlLang: "en",
    nav: {
      about: "About",
      focus: "Focus",
      experience: "Experience",
      systems: "Systems",
      contact: "Contact",
      cta: "Get in touch",
    },
    profile: {
      name: "Wioletta Słowik",
      email: "hello@wiolettaslowik.com",
      location: "Münster / Rheine, North Rhine-Westphalia",
    },
    hero: {
      titleA: "HR & employment",
      titleB: "law, translated",
      titleC: "into clear action.",
      lede: <>I'm <strong>Wioletta Słowik</strong> — an HR Generalist with an LL.B. in Business Law. I help companies of 100–500 people run a structured, compliant HR function: contracts, works council, payroll plumbing, and the awkward conversations in between.</>,
      ctaPrimary: "See experience",
      ctaSecondary: "Start a conversation",
      caption: "Münster · Rheine · NRW",
      meta: [
        ["Based", "Münsterland, DE"],
        ["Org size", "100–500 employees"],
        ["Languages", "DE · EN · PL"],
        ["Notice", "On request"],
      ],
    },
    about: {
      kicker: "About",
      index: "01",
      title: <>A lawyer's training, <em>an operator's instincts.</em></>,
      body: [
        "I work where employment law meets day-to-day people operations. My focus areas are contract management, employee relations, process optimization, and advising leadership on labor and compliance matters.",
        "Across my roles I've managed HR operations for organizations of 100–500 employees, established a works council (Betriebsrat) from the ground up, and rebuilt the data flow between Personio and DATEV LODAS to remove a recurring source of payroll errors.",
        "My approach is structured, goal-oriented and pragmatic — I prefer documented processes, clean templates, and decisions that hold up under audit.",
      ],
      principles: [
        ["Pragmatic", "Decisions that hold up under audit and survive contact with reality."],
        ["Structured", "Templates, documented processes, and a calm paper trail."],
        ["Bilingual", "Fluent translation between legal language and the operational floor."],
        ["Confidential", "The default posture for everything that crosses my desk."],
      ],
    },
    focus: {
      kicker: "What I do",
      index: "02",
      title: <>Six things I'm <em>actually</em> good at.</>,
      lede: "Hover or tap to read more. Everything below has shipped in the last few years.",
      areas: [
        ["01", "Employment Law & Compliance", "Day-to-day advisory on Arbeitsrecht for managers and leadership. Disciplinary proceedings, terminations, contract design, audit preparation."],
        ["02", "Works Council Relations", "Established a Betriebsrat from scratch — election support, negotiation of works agreements, and ongoing collaboration on operational matters."],
        ["03", "Contract & Template Management", "Standardized contract families and amendment templates that scale across departments and reduce legal review cycles."],
        ["04", "Payroll & Systems", "Personio, DATEV LODAS & LuG, Lexware, e2n, IFS. Payroll preparation, social-security and tax-audit coordination, reporting."],
        ["05", "Employee Relations", "Trusted point of contact across the employee lifecycle — onboarding, conflict, performance, exits — with a calm, confidential posture."],
        ["06", "HR Operations", "Process design, documentation, and the unglamorous plumbing that keeps an HR function audit-ready and predictable."],
      ],
    },
    experience: {
      kicker: "Experience",
      index: "03",
      title: <>Roughly a <em>decade</em> in the trenches.</>,
      lede: "Five roles across staffing, hospitality, healthcare, and infrastructure. Two of them still active.",
      expandAll: "Expand all",
      collapseAll: "Collapse all",
      selectedWork: "Selected work",
      skills: "Skills",
      present: "Present",
      parallel: "in parallel",
      jobs: [
        {
          company: "Allinq Networks GmbH", role: "HR Generalist", location: "Rheine, NRW",
          start: "Apr 2024", end: "Present", duration: "2 yrs 1 mo",
          bullets: [
            "HR operations and employee relations for 100+ employees",
            "Led establishment of works council (Betriebsrat), incl. negotiations and ongoing collaboration",
            "Standardized employment contracts and templates across the organization",
            "Optimized payroll data flow between Personio and DATEV LODAS",
            "Coordinated social-security audits (Betriebsprüfung) and financial & tax audits (Finanzprüfung)",
            "Implemented employee benefits program (Hansefit, Corporate Benefits)",
            "Advisory to management on employment law, compliance, and disciplinary matters",
            "HR-managed budget planning and cost control",
          ],
          skills: ["HR Operations", "Employment Law", "Works Council", "Personio", "DATEV LODAS", "Compliance"],
        },
        {
          company: "Becker & Knawek Steuerberater", role: "Payroll Specialist", location: "Münster, NRW",
          start: "Jul 2020", end: "Present", duration: "5 yrs 10 mos", parallel: true,
          bullets: [
            "Payroll processing and social security filings",
            "Communication with health insurers and public authorities",
            "Handling short-time and full-time work applications",
            "Preparation for pension insurance audits",
          ],
          skills: ["Payroll", "Wage Tax", "Social Insurance"],
        },
        {
          company: "Christoph-Dornier-Klinik GmbH", role: "Executive Assistant & HR Generalist", location: "Münster, NRW",
          start: "Feb 2023", end: "Mar 2024", duration: "1 yr 2 mos",
          bullets: [
            "Dual role: executive support to Managing Director + HR operations ownership",
            "End-to-end recruiting: postings, screening, interviews, hiring decisions",
            "Drafted and managed employment contracts and amendments",
            "Maintained employee records and HR data in Personio",
            "Payroll preparation and HR controlling/reporting",
            "Trusted advisor to leadership on employee relations, labor law, and HR policy",
            "Led HR process improvement projects",
          ],
          skills: ["C-Level Support", "HR Management", "Recruiting", "Personio"],
        },
        {
          company: "Magnolo Gastronomie GmbH", role: "Executive Assistant & Back Office Manager", location: "Münster, NRW",
          start: "Apr 2021", end: "Jan 2023", duration: "1 yr 10 mos",
          bullets: [
            "Sole owner of executive office operations and HR function",
            "Full employee lifecycle: recruiting, onboarding, contracts, terminations",
            "Ensured HR compliance across all personnel processes",
            "Payroll preparation, personnel files, certification issuance",
            "Preparatory bookkeeping, invoicing, payment runs",
            "Central point of contact for employees, management, clients, suppliers",
          ],
          skills: ["Employment Law", "C-Level Support", "Bookkeeping"],
        },
        {
          company: "BUHL Personal GmbH", role: "Department Manager", location: "Münster, NRW",
          start: "Oct 2016", end: "Apr 2021", duration: "4 yrs 7 mos",
          bullets: [
            "Led department operations in temporary staffing (Arbeitnehmerüberlassung)",
            "Full-cycle recruiting, onboarding, and offboarding",
            "Workforce planning and capacity management",
            "Employee development and performance management",
            "Payroll preparation and HR compliance oversight",
            "Sales, client acquisition, and key account management",
            "Quality management per company and regulatory standards",
          ],
          skills: ["People Management", "Employment Law", "Workforce Planning"],
        },
      ],
    },
    systems: {
      kicker: "Systems & stack",
      index: "04",
      title: <>The tools <em>on my desk.</em></>,
      lede: "A pragmatic mix — the German payroll backbone, plus the modern HRIS layer on top.",
      list: ["Personio", "DATEV LODAS", "DATEV LuG", "Lexware", "e2n", "IFS"],
      asideA: "Beyond the named systems, day-to-day work runs through MS 365, the standard German audit and reporting templates, and a lot of disciplined spreadsheet hygiene.",
      asideB: "Comfortable owning the boundary between an HRIS and the payroll provider — where most of the quiet errors live.",
    },
    contact: {
      kicker: "Contact",
      index: "05",
      title: <>Let's talk about <em>your HR function.</em></>,
      lede: "Open to permanent HR Business Partner roles, interim mandates, and works-council projects.",
      info: [
        ["Email", null], // filled at render
        ["Location", "Münster / Rheine, North Rhine-Westphalia"],
        ["Languages", "German (native-level) · English · Polish"],
        ["Working hours", "CET, Mon–Fri"],
        ["Response time", "Usually within 48 hours"],
      ],
      form: {
        name: "Your name",
        company: "Company",
        topic: "Topic",
        message: "Message",
        placeholder: "A few lines about the role, team size, and timing.",
        send: "Send message",
        sent: "Message sent ✓",
        or: "Or write directly:",
        topics: ["Role inquiry", "Interim / freelance mandate", "Works council project", "Coffee / general"],
      },
    },
    footer: {
      tag: "HR Business Partner · LL.B. Business Law",
      backToTop: "Back to top ↑",
    },
  },

  de: {
    locale: "de",
    htmlLang: "de",
    nav: {
      about: "Über mich",
      focus: "Schwerpunkte",
      experience: "Erfahrung",
      systems: "Systeme",
      contact: "Kontakt",
      cta: "Kontakt aufnehmen",
    },
    profile: {
      name: "Wioletta Słowik",
      email: "hello@wiolettaslowik.com",
      location: "Münster / Rheine, Nordrhein-Westfalen",
    },
    hero: {
      titleA: "HR & Arbeitsrecht,",
      titleB: "klar übersetzt",
      titleC: "in konkretes Handeln.",
      lede: <>Ich bin <strong>Wioletta Słowik</strong> — HR-Generalistin mit juristischem Hintergrund (LL.B. Wirtschaftsrecht). Ich unterstütze Unternehmen mit 100–500 Mitarbeitenden beim Aufbau einer strukturierten, rechtssicheren HR-Funktion: Verträge, Betriebsrat, saubere Schnittstellen zur Lohnabrechnung — und die unangenehmen Gespräche dazwischen.</>,
      ctaPrimary: "Erfahrung ansehen",
      ctaSecondary: "Gespräch beginnen",
      caption: "Münster · Rheine · NRW",
      meta: [
        ["Standort", "Münsterland, DE"],
        ["Unternehmensgröße", "100–500 Mitarbeitende"],
        ["Sprachen", "DE · EN · PL"],
        ["Verfügbarkeit", "Auf Anfrage"],
      ],
    },
    about: {
      kicker: "Über mich",
      index: "01",
      title: <>Juristische Ausbildung, <em>operatives Gespür.</em></>,
      body: [
        "Ich arbeite an der Schnittstelle zwischen Arbeitsrecht und operativer Personalarbeit. Meine Schwerpunkte: Vertragsmanagement, Employee Relations, Prozessoptimierung und die Beratung der Geschäftsleitung in arbeitsrechtlichen und Compliance-Themen.",
        "In meinen bisherigen Rollen habe ich HR-Operations für Organisationen mit 100–500 Mitarbeitenden verantwortet, einen Betriebsrat von Grund auf etabliert und den Datenfluss zwischen Personio und DATEV LODAS neu aufgesetzt, um eine wiederkehrende Fehlerquelle in der Lohnabrechnung zu beseitigen.",
        "Mein Stil ist strukturiert, zielorientiert und pragmatisch — ich bevorzuge dokumentierte Prozesse, saubere Vorlagen und Entscheidungen, die einer Prüfung standhalten.",
      ],
      principles: [
        ["Pragmatisch", "Entscheidungen, die einer Prüfung standhalten und im Alltag funktionieren."],
        ["Strukturiert", "Vorlagen, dokumentierte Prozesse und eine ruhige Aktenführung."],
        ["Zweisprachig", "Fließende Übersetzung zwischen Juristensprache und operativem Alltag."],
        ["Vertraulich", "Selbstverständliche Grundhaltung für alles, was über meinen Tisch geht."],
      ],
    },
    focus: {
      kicker: "Was ich mache",
      index: "02",
      title: <>Sechs Themen, in denen ich <em>wirklich</em> stark bin.</>,
      lede: "Mit der Maus oder per Tipp aufklappen. Alles unten ist in den letzten Jahren tatsächlich umgesetzt worden.",
      areas: [
        ["01", "Arbeitsrecht & Compliance", "Tägliche Beratung der Führungskräfte in arbeitsrechtlichen Fragen. Abmahnungen, Kündigungen, Vertragsgestaltung, Vorbereitung von Prüfungen."],
        ["02", "Betriebsratsarbeit", "Betriebsrat von Grund auf etabliert — Wahlbegleitung, Verhandlung von Betriebsvereinbarungen und laufende Zusammenarbeit zu operativen Themen."],
        ["03", "Vertrags- & Vorlagenmanagement", "Standardisierte Vertragsfamilien und Änderungsvorlagen, die abteilungsübergreifend skalieren und Rechtsprüfungen verkürzen."],
        ["04", "Lohnabrechnung & Systeme", "Personio, DATEV LODAS & LuG, Lexware, e2n, IFS. Lohnvorbereitung, Koordination von Sozialversicherungs- und Steuerprüfungen, Reporting."],
        ["05", "Employee Relations", "Vertrauensvolle Anlaufstelle entlang des gesamten Mitarbeiterlebenszyklus — Onboarding, Konflikte, Performance, Exits — ruhig und vertraulich."],
        ["06", "HR-Operations", "Prozessdesign, Dokumentation und die unscheinbare Infrastruktur, die eine HR-Abteilung prüfungssicher und planbar hält."],
      ],
    },
    experience: {
      kicker: "Erfahrung",
      index: "03",
      title: <>Rund ein <em>Jahrzehnt</em> aus der Praxis.</>,
      lede: "Fünf Stationen in Personaldienstleistung, Gastronomie, Gesundheitswesen und Infrastruktur. Zwei davon laufen noch.",
      expandAll: "Alle aufklappen",
      collapseAll: "Alle einklappen",
      selectedWork: "Ausgewählte Tätigkeiten",
      skills: "Skills",
      present: "Heute",
      parallel: "parallel",
      jobs: [
        {
          company: "Allinq Networks GmbH", role: "HR-Generalist", location: "Rheine, NRW",
          start: "Apr 2024", end: "Heute", duration: "2 J. 1 Mo.",
          bullets: [
            "HR-Operations und Employee Relations für 100+ Mitarbeitende",
            "Etablierung eines Betriebsrats inkl. Verhandlungen und laufender Zusammenarbeit",
            "Standardisierung von Arbeitsverträgen und Vorlagen unternehmensweit",
            "Optimierung des Lohndatenflusses zwischen Personio und DATEV LODAS",
            "Koordination von Betriebsprüfung (DRV) sowie Finanz- und Steuerprüfungen",
            "Einführung eines Mitarbeiter-Benefit-Programms (Hansefit, Corporate Benefits)",
            "Beratung der Geschäftsleitung in Arbeitsrecht, Compliance und Disziplinarfragen",
            "HR-seitige Budgetplanung und Kostencontrolling",
          ],
          skills: ["HR-Operations", "Arbeitsrecht", "Betriebsrat", "Personio", "DATEV LODAS", "Compliance"],
        },
        {
          company: "Becker & Knawek Steuerberater", role: "Lohn- und Gehaltsbuchhalterin", location: "Münster, NRW",
          start: "Jul 2020", end: "Heute", duration: "5 J. 10 Mo.", parallel: true,
          bullets: [
            "Lohn- und Gehaltsabrechnung sowie Sozialversicherungsmeldungen",
            "Kommunikation mit Krankenkassen und Behörden",
            "Bearbeitung von Kurz- und Vollarbeitsanträgen",
            "Vorbereitung von Rentenversicherungsprüfungen",
          ],
          skills: ["Lohn- und Gehaltsabrechnung", "Lohnsteuer", "Sozialversicherung"],
        },
        {
          company: "Christoph-Dornier-Klinik GmbH", role: "Assistenz der Geschäftsleitung & HR-Generalist", location: "Münster, NRW",
          start: "Feb 2023", end: "Mär 2024", duration: "1 J. 2 Mo.",
          bullets: [
            "Doppelrolle: Unterstützung des Geschäftsführers + Verantwortung für HR-Operations",
            "End-to-End-Recruiting: Ausschreibungen, Screening, Interviews, Einstellungen",
            "Erstellung und Pflege von Arbeitsverträgen und Vertragsänderungen",
            "Pflege der Personalakten und HR-Daten in Personio",
            "Lohnvorbereitung sowie HR-Controlling und Reporting",
            "Vertrauensvolle Beraterin der Leitung in Employee Relations, Arbeitsrecht und HR-Policy",
            "Leitung von Projekten zur HR-Prozessverbesserung",
          ],
          skills: ["C-Level-Support", "HR-Management", "Recruiting", "Personio"],
        },
        {
          company: "Magnolo Gastronomie GmbH", role: "Assistenz der Geschäftsleitung & Back-Office-Managerin", location: "Münster, NRW",
          start: "Apr 2021", end: "Jan 2023", duration: "1 J. 10 Mo.",
          bullets: [
            "Alleinverantwortung für Office-Operations und HR-Funktion",
            "Vollständiger Mitarbeiterlebenszyklus: Recruiting, Onboarding, Verträge, Beendigungen",
            "Sicherstellung der HR-Compliance in allen Personalprozessen",
            "Lohnvorbereitung, Personalakten, Bescheinigungswesen",
            "Vorbereitende Buchhaltung, Rechnungsstellung, Zahlungsläufe",
            "Zentrale Ansprechpartnerin für Mitarbeitende, Geschäftsleitung, Kunden und Lieferanten",
          ],
          skills: ["Arbeitsrecht", "C-Level-Support", "Buchhaltung"],
        },
        {
          company: "BUHL Personal GmbH", role: "Niederlassungsleitung", location: "Münster, NRW",
          start: "Okt 2016", end: "Apr 2021", duration: "4 J. 7 Mo.",
          bullets: [
            "Leitung der Niederlassung im Bereich Arbeitnehmerüberlassung",
            "Full-Cycle-Recruiting, Onboarding und Offboarding",
            "Personaleinsatzplanung und Kapazitätsmanagement",
            "Mitarbeiterentwicklung und Performance-Management",
            "Lohnvorbereitung und HR-Compliance",
            "Vertrieb, Kundenakquise und Key-Account-Management",
            "Qualitätsmanagement nach Unternehmens- und gesetzlichen Standards",
          ],
          skills: ["Personalmanagement", "Arbeitsrecht", "Personaleinsatzplanung"],
        },
      ],
    },
    systems: {
      kicker: "Systeme & Stack",
      index: "04",
      title: <>Die Werkzeuge <em>auf meinem Schreibtisch.</em></>,
      lede: "Ein pragmatischer Mix — das deutsche Lohnabrechnungs-Rückgrat plus die moderne HRIS-Schicht obendrauf.",
      list: ["Personio", "DATEV LODAS", "DATEV LuG", "Lexware", "e2n", "IFS"],
      asideA: "Über die genannten Systeme hinaus läuft der Alltag über MS 365, die üblichen deutschen Prüfungs- und Reporting-Vorlagen — und sehr viel disziplinierte Tabellenpflege.",
      asideB: "Ich übernehme gern die Verantwortung an der Schnittstelle zwischen HRIS und Lohnabrechnung — da wo die meisten leisen Fehler entstehen.",
    },
    contact: {
      kicker: "Kontakt",
      index: "05",
      title: <>Sprechen wir über <em>Ihre HR-Funktion.</em></>,
      lede: "Offen für feste HR-Business-Partner-Rollen, Interim-Mandate und Betriebsratsprojekte.",
      info: [
        ["E-Mail", null],
        ["Standort", "Münster / Rheine, Nordrhein-Westfalen"],
        ["Sprachen", "Deutsch (muttersprachlich) · Englisch · Polnisch"],
        ["Arbeitszeiten", "MEZ, Mo–Fr"],
        ["Antwortzeit", "Meist innerhalb von 48 Stunden"],
      ],
      form: {
        name: "Ihr Name",
        company: "Unternehmen",
        topic: "Thema",
        message: "Nachricht",
        placeholder: "Ein paar Zeilen zur Rolle, Teamgröße und zum Zeitrahmen.",
        send: "Nachricht senden",
        sent: "Nachricht gesendet ✓",
        or: "Oder direkt schreiben:",
        topics: ["Stellenanfrage", "Interim- / Freelance-Mandat", "Betriebsratsprojekt", "Kaffee / allgemein"],
      },
    },
    footer: {
      tag: "HR Business Partner · LL.B. Wirtschaftsrecht",
      backToTop: "Nach oben ↑",
    },
  },
};

// =========================================================
// LANG CONTEXT
// =========================================================
const LangContext = React.createContext(null);
const useT = () => React.useContext(LangContext);

// =========================================================
// COMPONENTS
// =========================================================
function LangSwitch({ lang, setLang }) {
  const setBoth = (v) => {
    setLang(v);
    if (typeof window.__setLangTweak === "function") window.__setLangTweak(v);
  };
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button
        className={lang === "en" ? "is-active" : ""}
        onClick={() => setBoth("en")}
        aria-pressed={lang === "en"}>EN</button>
      <span className="lang-divider" aria-hidden="true">·</span>
      <button
        className={lang === "de" ? "is-active" : ""}
        onClick={() => setBoth("de")}
        aria-pressed={lang === "de"}>DE</button>
    </div>
  );
}

function Nav({ section, lang, setLang }) {
  const t = useT();
  const items = [
    { id: "about", label: t.nav.about },
    { id: "focus", label: t.nav.focus },
    { id: "experience", label: t.nav.experience },
    { id: "systems", label: t.nav.systems },
    { id: "contact", label: t.nav.contact },
  ];
  return (
    <nav className="nav">
      <a href="#top" className="nav-mark">
        <span className="mark-glyph">W</span>
        <span className="mark-text">Wioletta Słowik</span>
      </a>
      <ul className="nav-links">
        {items.map(i => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={section === i.id ? "is-active" : ""}>{i.label}</a>
          </li>
        ))}
      </ul>
      <LangSwitch lang={lang} setLang={setLang} />
    </nav>
  );
}

function Hero() {
  const t = useT();
  return (
    <header id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="ht-line">{t.hero.titleA}</span>
            <span className="ht-line ht-italic">{t.hero.titleB}</span>
            <span className="ht-line">{t.hero.titleC}</span>
          </h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary">
              {t.hero.ctaPrimary}
              <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">{t.hero.ctaSecondary}</a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src="assets/wioletta.png" alt={`Portrait — ${t.profile.name}`} />
          <figcaption>
            <span className="cap-rule" />
            <span>{t.hero.caption}</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-meta">
        {t.hero.meta.map(([l, v]) => (
          <div className="meta" key={l}>
            <span className="meta-label">{l}</span>
            <span className="meta-value">{v}</span>
          </div>
        ))}
      </div>
    </header>
  );
}

function SectionHeader({ index, kicker, title, lede }) {
  return (
    <div className="sec-head">
      <div className="sec-head-top">
        <span className="sec-index">§ {index}</span>
        <span className="sec-kicker">{kicker}</span>
      </div>
      <h2 className="sec-title">{title}</h2>
      {lede ? <p className="sec-lede">{lede}</p> : null}
    </div>
  );
}

function About() {
  const t = useT();
  return (
    <section id="about" className="section section-about">
      <SectionHeader index={t.about.index} kicker={t.about.kicker} title={t.about.title} />
      <div className="about-grid">
        <div className="about-body">
          {t.about.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <aside className="about-side">
          {t.about.principles.map(([k, v]) => (
            <div key={k} className="principle">
              <span className="principle-key">{k}</span>
              <span className="principle-val">{v}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Focus() {
  const t = useT();
  const [active, setActive] = useState(0);
  return (
    <section id="focus" className="section section-focus">
      <SectionHeader index={t.focus.index} kicker={t.focus.kicker} title={t.focus.title} lede={t.focus.lede} />
      <ul className="focus-list" role="list">
        {t.focus.areas.map(([num, title, body], i) => (
          <li
            key={num}
            className={`focus-row ${active === i ? "is-open" : ""}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}>
            <span className="focus-num">{num}</span>
            <span className="focus-title">{title}</span>
            <span className="focus-rule" />
            <span className="focus-arrow">{active === i ? "—" : "+"}</span>
            <div className="focus-body">
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExperienceItem({ job, isOpen, onToggle, labels }) {
  return (
    <article className={`xp ${isOpen ? "is-open" : ""}`}>
      <button className="xp-row" onClick={onToggle} aria-expanded={isOpen}>
        <span className="xp-dates">
          <span className="xp-start">{job.start}</span>
          <span className="xp-end">{job.end}</span>
        </span>
        <span className="xp-meta">
          <span className="xp-role">{job.role}</span>
          <span className="xp-company">
            {job.company}
            {job.parallel ? <span className="xp-parallel"> · {labels.parallel}</span> : null}
          </span>
        </span>
        <span className="xp-loc">{job.location}</span>
        <span className="xp-duration">{job.duration}</span>
        <span className="xp-toggle" aria-hidden="true">{isOpen ? "–" : "+"}</span>
      </button>
      <div className="xp-detail" aria-hidden={!isOpen}>
        <div className="xp-detail-inner">
          <div className="xp-bullets">
            <span className="xp-detail-label">{labels.selectedWork}</span>
            <ul>{job.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
          <div className="xp-skills">
            <span className="xp-detail-label">{labels.skills}</span>
            <ul>{job.skills.map(s => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function Experience() {
  const t = useT();
  const [open, setOpen] = useState(new Set([0]));
  const toggle = (i) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const allOpen = open.size === t.experience.jobs.length;
  const expandAll = () => setOpen(allOpen ? new Set() : new Set(t.experience.jobs.map((_, i) => i)));

  return (
    <section id="experience" className="section section-xp">
      <SectionHeader index={t.experience.index} kicker={t.experience.kicker} title={t.experience.title} lede={t.experience.lede} />
      <div className="xp-controls">
        <button className="xp-expand" onClick={expandAll}>
          {allOpen ? t.experience.collapseAll : t.experience.expandAll}
          <span className="arrow">{allOpen ? "↑" : "↓"}</span>
        </button>
      </div>
      <div className="xp-list">
        {t.experience.jobs.map((job, i) => (
          <ExperienceItem
            key={job.company + job.role}
            job={job}
            isOpen={open.has(i)}
            onToggle={() => toggle(i)}
            labels={{
              selectedWork: t.experience.selectedWork,
              skills: t.experience.skills,
              parallel: t.experience.parallel,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function Systems() {
  const t = useT();
  return (
    <section id="systems" className="section section-systems">
      <SectionHeader index={t.systems.index} kicker={t.systems.kicker} title={t.systems.title} lede={t.systems.lede} />
      <div className="sys-wrap">
        <ul className="sys-grid">
          {t.systems.list.map((s, i) => (
            <li key={s} className="sys-item">
              <span className="sys-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="sys-name">{s}</span>
            </li>
          ))}
        </ul>
        <div className="sys-aside">
          <p>{t.systems.asideA}</p>
          <p className="sys-note">{t.systems.asideB}</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const t = useT();
  const info = t.contact.info.map(([label, value]) => [label, value === null ? t.profile.email : value]);

  return (
    <section id="contact" className="section section-contact">
      <SectionHeader index={t.contact.index} kicker={t.contact.kicker} title={t.contact.title} lede={t.contact.lede} />
      <div className="contact-info">
        {info.map(([label, value], i) => (
          <div className="ci-block" key={label}>
            <span className="ci-label">{label}</span>
            {i === 0
              ? <a className="ci-value" href={`mailto:${t.profile.email}`}>{value}</a>
              : <span className="ci-value">{value}</span>}
          </div>
        ))}
      </div>
      <div className="contact-cta">
        <a href={`mailto:${t.profile.email}`} className="btn btn-primary">
          {t.contact.form?.send || "Send a message"}
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-mark">
        <span className="footer-glyph">W. S.</span>
        <span className="footer-tag">{t.footer.tag}</span>
      </div>
      <div className="footer-meta">
        <span>© {year} Wioletta Słowik</span>
        <span>·</span>
        <a href="#top">{t.footer.backToTop}</a>
      </div>
    </footer>
  );
}

// =========================================================
// TWEAKS
// =========================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper",
  "accent": "olive",
  "displayFont": "newsreader",
  "density": "comfortable",
  "lang": "en"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  const themes = {
    paper: { bg: "oklch(0.985 0.005 80)", ink: "oklch(0.18 0.01 80)", muted: "oklch(0.45 0.01 80)", rule: "oklch(0.85 0.01 80)", panel: "oklch(0.96 0.008 80)" },
    bone: { bg: "oklch(0.96 0.012 75)", ink: "oklch(0.20 0.015 60)", muted: "oklch(0.45 0.015 60)", rule: "oklch(0.82 0.015 70)", panel: "oklch(0.93 0.018 75)" },
    ink: { bg: "oklch(0.16 0.012 270)", ink: "oklch(0.96 0.005 80)", muted: "oklch(0.65 0.01 270)", rule: "oklch(0.30 0.012 270)", panel: "oklch(0.20 0.015 270)" }
  };
  const th = themes[t.theme] || themes.paper;
  Object.entries(th).forEach(([k, v]) => root.style.setProperty(`--c-${k}`, v));
  const accents = {
    olive: "oklch(0.55 0.06 110)", rust: "oklch(0.55 0.10 35)",
    plum: "oklch(0.45 0.08 320)", forest: "oklch(0.45 0.06 150)"
  };
  root.style.setProperty("--c-accent", accents[t.accent] || accents.olive);
  const fonts = {
    newsreader: '"Newsreader", "Times New Roman", serif',
    fraunces: '"Fraunces", "Times New Roman", serif',
    instrument: '"Instrument Serif", "Times New Roman", serif'
  };
  root.style.setProperty("--font-display", fonts[t.displayFont] || fonts.newsreader);
  const dens = { compact: "0.85", comfortable: "1", spacious: "1.18" };
  root.style.setProperty("--density", dens[t.density] || "1");
}

function Tweaks({ lang, setLang }) {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  // tweak panel value -> app lang state (one-way; nav button writes via setLangAndTweak below)
  useEffect(() => {
    if (t.lang !== lang) setLang(t.lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.lang]);

  // expose setter so the nav switch can update the persisted tweak too
  useEffect(() => {
    window.__setLangTweak = (v) => setTweak("lang", v);
  }, [setTweak]);
  const { TweaksPanel, TweakSection, TweakRadio, TweakSelect } = window;
  return (
    <TweaksPanel>
      <TweakSection title="Language">
        <TweakRadio label="Locale" value={t.lang} options={[
          { value: "en", label: "English" },
          { value: "de", label: "Deutsch" },
        ]} onChange={v => setTweak("lang", v)} />
      </TweakSection>
      <TweakSection title="Palette">
        <TweakRadio label="Theme" value={t.theme} options={[
          { value: "paper", label: "Paper" }, { value: "bone", label: "Bone" }, { value: "ink", label: "Ink" }
        ]} onChange={v => setTweak("theme", v)} />
        <TweakRadio label="Accent" value={t.accent} options={[
          { value: "olive", label: "Olive" }, { value: "rust", label: "Rust" },
          { value: "plum", label: "Plum" }, { value: "forest", label: "Forest" }
        ]} onChange={v => setTweak("accent", v)} />
      </TweakSection>
      <TweakSection title="Type & Density">
        <TweakSelect label="Display font" value={t.displayFont} options={[
          { value: "newsreader", label: "Newsreader" },
          { value: "fraunces", label: "Fraunces" },
          { value: "instrument", label: "Instrument Serif" }
        ]} onChange={v => setTweak("displayFont", v)} />
        <TweakRadio label="Density" value={t.density} options={[
          { value: "compact", label: "Compact" },
          { value: "comfortable", label: "Comfortable" },
          { value: "spacious", label: "Spacious" }
        ]} onChange={v => setTweak("density", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// =========================================================
// APP
// =========================================================
function App() {
  const [section, setSection] = useState("about");
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("ws_lang");
      if (saved === "en" || saved === "de") return saved;
      const nav = (navigator.language || "en").toLowerCase();
      return nav.startsWith("de") ? "de" : "en";
    } catch { return "en"; }
  });
  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    try { localStorage.setItem("ws_lang", lang); } catch {}
  }, [lang, t.htmlLang]);

  useEffect(() => {
    const ids = ["about", "focus", "experience", "systems", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setSection(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <LangContext.Provider value={t}>
      <Nav section={section} lang={lang} setLang={setLang} />
      <main>
        <Hero />
        <About />
        <Focus />
        <Experience />
        <Systems />
        <Contact />
      </main>
      <Footer />
      <Tweaks lang={lang} setLang={setLang} />
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
