const sections = [
  { id: "hero", label: "Intro", focus: { x: "24%", y: "62%", scale: 1.34, brightness: 1.12 } },
  { id: "roadmap", label: "Roadmap", focus: { x: "58%", y: "46%", scale: 1.04, brightness: 0.96 } },
  { id: "situation", label: "Ausgangssituation", focus: { x: "34%", y: "58%", scale: 1.28, brightness: 0.92 } },
  { id: "method", label: "Methodik", focus: { x: "48%", y: "42%", scale: 1.34, brightness: 0.84 } },
  { id: "process", label: "Anwendung & Lösung", focus: { x: "62%", y: "48%", scale: 1.42, brightness: 0.76 } },
  { id: "converter", label: "Parameter Converter", focus: { x: "70%", y: "44%", scale: 1.5, brightness: 0.74 } },
  { id: "vcdm", label: "vCDM", focus: { x: "78%", y: "35%", scale: 1.58, brightness: 0.72 } },
  { id: "vcdm-possibilities", label: "vCDM Möglichkeiten", focus: { x: "72%", y: "42%", scale: 1.5, brightness: 0.72 } },
  { id: "outlook", label: "Ausblick", focus: { x: "58%", y: "48%", scale: 1.34, brightness: 0.7 } },
  { id: "sharepoint", label: "SharePoint", focus: { x: "74%", y: "54%", scale: 1.44, brightness: 0.76 } }
];

const roadmapPoints = [
  {
    id: "01",
    title: "Ausgangssituation",
    subtitle: "Unstrukturierter Ausgangszustand",
    target: "situation",
    pinX: 64,
    pinY: 73,
    labelOffsetY: 80
  },
  {
    id: "02",
    title: "Methodik",
    subtitle: "Strukturiertes Vorgehen",
    target: "method",
    pinX: 50,
    pinY: 50,
    labelOffsetY: 80
  },
  {
    id: "03",
    title: "Anwendung & Lösung",
    subtitle: "Neuer Prozess mit vCDM",
    target: "process",
    pinX: 63,
    pinY: 36,
    labelOffsetY: 80
  },
  {
    id: "04",
    title: "Ergebnis & Empfehlung",
    subtitle: "vCDM als Zielsystem",
    target: "vcdm",
    pinX: 80,
    pinY: 27,
    labelOffsetY: 80
  }
];

const methodSteps = [
  {
    title: "Analyse",
    shortDesc: "Ist-Zustand verstehen",
    subSlide: "methodAnalyseSlide1",
    heading: "Analysephase",
    subtitle: "Untersuchung des Ist-Zustands",
    icon: "fa-magnifying-glass",
    visual: "analysis",
    text: "In der Analysephase wird der bestehende Umgang mit Parametern im Unternehmen untersucht. Ziel ist es, den Ist-Zustand transparent darzustellen und zentrale Problemfelder zu identifizieren.",
    bullets: [
      "Untersuchung bestehender Prozesse",
      "Dokumentenanalyse",
      "Experteninterviews",
      "Erfassung von Medienbrüchen und Schwachstellen",
      "Grundlage für die Anforderungsermittlung"
    ]
  },
  {
    title: "Anforderungen",
    shortDesc: "Kriterien ableiten",
    subSlide: "methodAnforderungenSlide1",
    heading: "Anforderungsphase",
    subtitle: "Ableitung und Priorisierung der Anforderungen",
    icon: "fa-file-lines",
    visual: "funnel",
    text: "Auf Basis der Analyse werden funktionale und nicht-funktionale Anforderungen an ein zukünftiges Parametermanagementsystem abgeleitet, strukturiert und priorisiert.",
    bullets: [
      "Funktionale Anforderungen",
      "Nicht-funktionale Anforderungen",
      "Muss-, Soll- und Kann-Kriterien",
      "Anforderungskatalog",
      "Grundlage für Toolauswahl und Bewertung"
    ]
  },
  {
    title: "Marktanalyse",
    shortDesc: "Tools identifizieren",
    subSlide: "methodMarktSlide1",
    heading: "Markt- und Toolanalyse",
    subtitle: "Identifikation geeigneter Lösungen",
    icon: "fa-chart-simple",
    visual: "market",
    text: "In der Marktanalyse werden verfügbare Softwarelösungen recherchiert, verglichen und anhand der Muss-Anforderungen eingegrenzt.",
    bullets: [
      "Recherche verfügbarer Tools",
      "Aufbau einer Longlist",
      "Prüfung der Muss-Anforderungen",
      "Reduktion auf Shortlist",
      "Vorbereitung der Bewertung"
    ]
  },
  {
    title: "Nutzwertanalyse",
    shortDesc: "Alternativen bewerten",
    subSlide: "methodNutzwertSlide1",
    heading: "Bewertungsphase",
    subtitle: "Systematischer Vergleich der Tools",
    icon: "fa-scale-balanced",
    visual: "utility",
    text: "Die verbleibenden Tools werden anhand gewichteter Kriterien bewertet. Dadurch entsteht eine transparente und nachvollziehbare Entscheidungsgrundlage.",
    bullets: [
      "Bewertung definierter Kriterien",
      "Gewichtung der Anforderungen",
      "Ermittlung des Gesamtnutzwerts",
      "Vergleich der Alternativen",
      "Entscheidungsvorbereitung"
    ]
  },
  {
    title: "Entscheidung",
    shortDesc: "Empfehlung ableiten",
    subSlide: "methodEntscheidungSlide1",
    heading: "Auswahlentscheidung",
    subtitle: "Begründete Empfehlung",
    icon: "fa-circle-check",
    visual: "decision",
    text: "Auf Basis der Nutzwertanalyse und der praktischen Evaluation wird eine begründete Empfehlung ausgesprochen.",
    bullets: [
      "Vergleich der bestbewerteten Lösungen",
      "Herstellerpräsentationen",
      "Praktische Evaluation",
      "Auswahl von vCDM",
      "Ergänzung durch den Parameter Converter"
    ]
  }
];

const toolData = [
  {
    name: "Vector vCDM",
    shortName: "vCDM",
    total: 74.54,
    tech: 51.54,
    implementation: 23,
    badge: "Empfehlung im Zielprozess",
    detail: "Spezialisiertes Standardtool für Kalibrier- und Parameterdatenmanagement. Die fehlende native Formatabdeckung wird durch den Parameter Converter kompensiert.",
    chips: ["Versionierung", "Freigabe", "Traceability", "Change Log", "API"]
  },
  {
    name: "CONTACT / CIM Database",
    shortName: "CIM",
    total: 79.77,
    tech: 50.77,
    implementation: 29,
    badge: "Starke PLM-Alternative",
    detail: "Hoher Wert in der Matrix und starke Datenmodellfähigkeit. Die Systemlogik passt jedoch weniger direkt zum fokussierten Parametermanagement-Zielprozess.",
    chips: ["Datenmodell", "PLM", "Governance", "Integration"]
  },
  {
    name: "ETAS INCA eCDM",
    shortName: "eCDM",
    total: 52.62,
    tech: 34.62,
    implementation: 18,
    badge: "Spezialkontext",
    detail: "Stark im INCA-Umfeld, für ein unternehmensweites, zentrales Parametermanagement aber nur eingeschränkt als Zielbild geeignet.",
    chips: ["INCA", "Kalibrierung", "Spezialtool"]
  },
  {
    name: "Eigenentwicklung",
    shortName: "Inhouse",
    total: 81,
    tech: 60,
    implementation: 21,
    badge: "Höchster Matrixwert, hohes Risiko",
    detail: "Fachlich sehr anpassbar, aber mit hohem Implementierungs-, Betriebs- und Wartungsaufwand. Deshalb nicht automatisch die beste Empfehlung.",
    chips: ["Flexibel", "Aufwand", "Betrieb", "Risiko"]
  }
];
