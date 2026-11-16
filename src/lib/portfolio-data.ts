import { LocalizedText } from "./i18n";

export const PROFILE_LINKS = {
  email: "contact@joshuanancey.com",
  malt: "https://www.malt.fr/profile/joshuanancey?origin=dashboard_profile_name",
  github: "https://github.com/joshdeutc",
  linkedin: "https://www.linkedin.com/in/joshua-nancey-3218171a2",
  domain: "https://joshuanancey.com",
  custosGithub: "https://github.com/joshdeutc/custos",
  custosReleases: "https://github.com/joshdeutc/custos/releases/latest",
  resumeEn: "/cv/cv_apple_ml_engineer.pdf",
  resumeFr: "/cv/cv_data_ia_engineer.pdf",
};

export interface EducationItem {
  id: string;
  logo: string;
  school: LocalizedText;
  degree: LocalizedText;
  period: string;
  location: string;
  highlights: LocalizedText[];
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "utc",
    logo: "/images/logos/utc.jpg",
    school: {
      en: "Université de Technologie de Compiègne (UTC)",
      fr: "Université de Technologie de Compiègne (UTC)",
    },
    degree: {
      en: "M.Eng. in Computer Science — AI & Data Science (IAD) + Mathematical Modeling Honors (Label Mod'Math)",
      fr: "Diplôme d'Ingénieur en Génie Informatique — Filière IAD + Label Modélisation Mathématique (Mod'Math)",
    },
    period: "2023 – 2026",
    location: "Compiègne, France",
    highlights: [
      {
        en: "Mod'Math Track: Numerical Matrix Analysis (MT09), Convex & Graph Optimization (RO04), Markov Chains & Queuing Theory (RO05), Statistical Estimation & Monte-Carlo (SY02).",
        fr: "Label Mod'Math : Analyse Numérique Matricielle (MT09), Optimisation Convexe & Graphes (RO04), Chaînes de Markov & Files d'Attente (RO05), Statistique & Monte-Carlo (SY02).",
      },
      {
        en: "AI & Systems Core: Deep Learning & Transformers (AOS2), Computer Vision (SY32), Data Mining (SY09), Data Warehouse & ETL (NF26), Multi-Agent Systems (IA04), Network & Systems Security (SR01/SR04/SR07), C++ OOP (LO21).",
        fr: "Cœur IA & Systèmes : Deep Learning & Transformers (AOS2), Vision par Ordinateur (SY32), Data Mining (SY09), Data Warehouse & ETL (NF26), Systèmes Multi-Agents (IA04), Réseaux & Sécurité (SR01/SR04/SR07), C++ POO (LO21).",
      },
    ],
  },
  {
    id: "raspail",
    logo: "",
    school: {
      en: "Lycée Raspail — CPGE PTSI / PT",
      fr: "Lycée Raspail — CPGE PTSI / PT",
    },
    degree: {
      en: "Preparatory Classes for French Engineering Schools (Physics, Mathematics & Industrial Engineering)",
      fr: "Classes Préparatoires aux Grandes Écoles (Physique, Mathématiques & Sciences Industrielles)",
    },
    period: "2020 – 2023",
    location: "Paris 14e, France",
    highlights: [
      {
        en: "Ranked 7th/35 overall in second-year honors (2nd/35 Industrial Engineering, 6th/35 Physics, 8th/35 Mathematics).",
        fr: "Classé 7e/35 au classement général en 5/2 (2e/35 en Sciences Industrielles, 6e/35 en Physique, 8e/35 en Mathématiques).",
      },
    ],
  },
];

export interface OffScreenItem {
  id: string;
  icon: string;
  title: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
}

export const OFF_SCREEN_ITEMS: OffScreenItem[] = [
  {
    id: "wrestling",
    icon: "🤼",
    title: { en: "Wrestling", fr: "Lutte Libre" },
    role: { en: "PRIMARY PASTIME · SPORT", fr: "PASSE-TEMPS PRINCIPAL · SPORT" },
    description: {
      en: "Discipline, balance, grip control and calm execution under sustained high-pressure resistance.",
      fr: "Rigueur physique, gestion de l'effort, prise d'appui et lucidité sous haute intensité.",
    },
  },
  {
    id: "boxing",
    icon: "🥊",
    title: { en: "English Boxing", fr: "Boxe Anglaise" },
    role: { en: "COMBAT SPORT", fr: "SPORT DE COMBAT" },
    description: {
      en: "Footwork, timing, precision under fatigue and continuous tactical adaptation.",
      fr: "Déplacements, timing, précision technique et adaptation tactique permanente.",
    },
  },
  {
    id: "grocery",
    icon: "🤝",
    title: { en: "Student Solidarity Grocery", fr: "Épicerie Solidaire UTC" },
    role: { en: "VOLUNTEER LOGISTICS", fr: "ENGAGEMENT ASSOCIATIF" },
    description: {
      en: "Active organization of weekly food distributions and inventory coordination fighting student precarity at UTC Compiègne.",
      fr: "Organisation des distributions alimentaires et logistique contre la précarité étudiante à l'UTC Compiègne.",
    },
  },
];

export const LANGUAGES_DATA = [
  { name: { en: "French", fr: "Français" }, level: { en: "Native", fr: "Langue maternelle" }, code: "FR" },
  { name: { en: "English", fr: "Anglais" }, level: { en: "Professional B2+ (Linguaskill)", fr: "Courant B2+ (Linguaskill)" }, code: "EN" },
  { name: { en: "Mandarin Chinese", fr: "Chinois Mandarin" }, level: { en: "Elementary (A1)", fr: "Notions (A1)" }, code: "ZH" },
];

export interface ProjectScreen {
  src: string;
  caption: LocalizedText;
  isPhone?: boolean;
}

export interface ProjectItem {
  id: string;
  rank: string;
  category: "mobile" | "ai" | "math";
  flagship?: boolean;
  title: LocalizedText;
  org: string;
  period: string;
  metrics: string[];
  summary: LocalizedText;
  highlights: LocalizedText[];
  stack: string[];
  screens: ProjectScreen[];
  links: {
    github?: string;
    release?: string;
    privacy?: string;
    externalLabel?: LocalizedText;
    external?: string;
  };
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "custos",
    rank: "RANK S · FLAGSHIP",
    category: "mobile",
    flagship: true,
    title: {
      en: "Custos — OS-Level Android Self-Control & Commitment Engine",
      fr: "Custos — Application Android d'Auto-Discipline & Device Owner",
    },
    org: "Custos - Joshua Nancey",
    period: "2025 – 2026 · v1.4",
    metrics: ["Device Owner DPM", "72h Time-Lock", "Accessibility In-App", "Zero Telemetry"],
    summary: {
      en: "Native Kotlin Android commitment device engineered down to OS primitives: irreversible time-locked rules, Accessibility Node inspection to strip only addictive feeds (Shorts/Channels), Zero-Trust app whitelist quarantine, Guardian IPC watchdog, and Private DNS-over-TLS.",
      fr: "Application Android native en Kotlin conçue au niveau système : verrous temporels irréversibles, inspection AccessibilityNode pour ne bloquer que les flux addictifs (Shorts/Chaînes), quarantaine Zero-Trust des applis, architecture Guardian IPC et DNS-over-TLS.",
    },
    highlights: [
      {
        en: "Pentagon constellation UI (`ZoomableCanvasView`) with 5 modules around a central Security & Delay core.",
        fr: "Interface minimaliste en constellation pentagonale (`ZoomableCanvasView`) articulant 5 modules autour du noyau Security & Delay.",
      },
      {
        en: "Zero-Trust App Whitelist & 72h Quarantine Delay blocking impulse installs via `DevicePolicyManager`.",
        fr: "Whitelist Zero-Trust et délai de quarantaine de 72h neutralisant toute nouvelle installation impulsive via `DevicePolicyManager`.",
      },
      {
        en: "Cross-OEM hardening tested across Google Pixel 8a, Xiaomi HyperOS and Samsung Galaxy A53 (Knox / Magisk ABX provisioning).",
        fr: "Durcissement multi-constructeurs éprouvé sur Google Pixel 8a, Xiaomi HyperOS et Samsung Galaxy A53 (provisioning Knox / Magisk ABX).",
      },
    ],
    stack: ["Kotlin", "Android SDK", "DevicePolicyManager", "AccessibilityService", "AIDL IPC", "Gradle Flavors", "Private DoT DNS", "ADB Test Suite"],
    screens: [
      { src: "/images/projects/custos/01_home.png", caption: { en: "Samsung A53 Live Capture — Pentagon Hub", fr: "Capture réelle Samsung A53 — Hub Pentagone" }, isPhone: true },
      { src: "/images/projects/custos/02_app_limits.png", caption: { en: "Daily App Limits & Active Blocks", fr: "Limites d'usage & blocages actifs" }, isPhone: true },
      { src: "/images/projects/custos/03_delay.png", caption: { en: "Security & Irreversible Time-Lock Delays", fr: "Verrous temporels irréversibles" }, isPhone: true },
      { src: "/images/projects/custos/04_nuclear.png", caption: { en: "Nuclear Deep-Focus Lock Mode", fr: "Mode Nucléaire (Focus Total)" }, isPhone: true },
      { src: "/images/projects/custos/05_whitelist.png", caption: { en: "Zero-Trust Whitelist (72h Quarantine)", fr: "Whitelist Zero-Trust (Quarantaine 72h)" }, isPhone: true },
    ],
    links: {
      github: "https://github.com/joshdeutc/custos",
      release: "https://github.com/joshdeutc/custos/releases/latest",
      externalLabel: { en: "Google Play (Reviewing Org)", fr: "Google Play (En cours)" },
    },
  },
  {
    id: "cath-llm",
    rank: "RANK S · CLINICAL NLP",
    category: "ai",
    title: {
      en: "CATH-LLM — Grounded Clinical Extraction & Cross-Lingual Eval",
      fr: "CATH-LLM — Extraction Clinique Sans Hallucination & Cross-Lingue",
    },
    org: "Epiconcept R&D",
    period: "2026",
    metrics: ["F1 = 0.91 (EN)", "F1 = 0.88 (HR)", "16,384 Context", "20 LLM Configs / 1× A100"],
    summary: {
      en: "On-premise clinical NLP suite benchmarked across 249 MIMIC-IV hospital records and 20 open-weight configurations on a single NVIDIA A100 (40 GB) via Unsloth 4-bit NF4 & FlashAttention-2.",
      fr: "Chaîne NLP clinique locale évaluée sur 249 comptes rendus MIMIC-IV et 20 configurations de modèles ouverts sur un seul GPU NVIDIA A100 (40 Go) via Unsloth 4-bit NF4 & FlashAttention-2.",
    },
    highlights: [
      {
        en: "Built adversarial 4-tier grader (`verify.csv`: `hallucination > parse_failed > no_evidence > wrong_class`), proving a 31B model's deceptive 1.000 precision came from 55% JSON failures and catching errors in reference gold-standard datasets.",
        fr: "Conception d'un grader adversaire à 4 niveaux (`verify.csv`), révélant que la précision 1,000 d'un modèle 31B masquait 55 % d'échecs JSON et débusquant des erreurs dans le jeu de référence.",
      },
      {
        en: "Diagnosed +40% BPE tokenizer expansion in Croatian vs English and calibrated an exact 16,384-token context window eliminating silent truncation.",
        fr: "Diagnostic de l'inflation BPE (+40 % de tokens en croate vs anglais) et calibrage d'une fenêtre exacte de 16 384 tokens.",
      },
    ],
    stack: ["PyTorch", "MedGemma 27B/4B", "Qwen / Mistral", "Unsloth NF4", "FlashAttention-2", "Pydantic", "NLLB-200", "Quarto"],
    screens: [
      { src: "/images/projects/cath-llm/llm-f1-vs-format.png", caption: { en: "Deceptive F1 vs JSON Parse Rate Audit (verify.csv)", fr: "Audit F1 trompeur vs taux de parsing JSON exploitable" } },
    ],
    links: {
      github: "https://github.com/joshdeutc/cath-llm-clinical-extraction",
    },
  },
  {
    id: "deep-piste",
    rank: "RANK A+ · VISION & RISK",
    category: "ai",
    title: {
      en: "deep.piste — High-Res Mammography Vision & Guaranteed Risk (SGR)",
      fr: "deep.piste — Vision Mammographie HD & Contrôle Statistique du Risque",
    },
    org: "Epiconcept R&D",
    period: "2026",
    metrics: ["AUC = 0.889", "300+ GB RSNA 16-bit", "FNR / FPR ≤ 5%", "8-Ch. Docker Capsule"],
    summary: {
      en: "Fine-tuned interpretable GMIC multi-instance attention networks (ResNet-22 global + ResNet-18 local ROI patches) on 300+ GB 16-bit mammograms, paired with finite-sample binomial risk control.",
      fr: "Fine-tuning de réseaux à attention multi-instance GMIC (ResNet-22 global + ResNet-18 patchs locaux) sur 300+ Go de mammographies 16-bit avec garanties statistiques de risque en échantillon fini.",
    },
    highlights: [
      {
        en: "Improved test ROC-AUC from 0.683 baseline to 0.889 (95% CI: [0.858, 0.921]) using a 5-model Deep Ensemble.",
        fr: "Progression de l'AUC de 0,683 (baseline) à 0,889 (IC 95 % : [0,858 ; 0,921]) via Deep Ensemble de 5 modèles GMIC.",
      },
      {
        en: "Implemented Geifman & El-Yaniv SGR selective prediction bounds (Hoeffding / binomial tail inversion) and authored an 8-chapter Dockerized Jupyter training capsule.",
        fr: "Implémentation de l'abstention sélective SGR (Hoeffding / inversion binomiale) et co-rédaction d'une capsule de formation Docker en 8 chapitres.",
      },
    ],
    stack: ["PyTorch 16-bit", "GMIC (ResNet-22/18)", "MC Dropout", "Hoeffding / SGR", "Docker", "JupyterLab"],
    screens: [
      { src: "/images/projects/deep-piste/gmic-architecture.png", caption: { en: "GMIC Global + ROI Attention Architecture", fr: "Architecture GMIC Global + Attention Locale ROI" } },
      { src: "/images/projects/deep-piste/abstention-principe.png", caption: { en: "Selective Risk Control (SGR) & Binomial Bound", fr: "Contrôle sélectif du risque (SGR) & borne binomiale" } },
      { src: "/images/projects/deep-piste/capsule-jupyterlab.png", caption: { en: "8-Chapter Docker Training Capsule", fr: "Capsule pédagogique Docker en 8 chapitres" } },
    ],
    links: {
      github: "https://github.com/joshdeutc/data-capsule-deep-piste",
      external: "https://github.com/Epiconcept-Paris/data-capsule-deep-piste",
      externalLabel: { en: "Epiconcept Repo", fr: "Dépôt Epiconcept" },
    },
  },
  {
    id: "tz2-surfaces",
    rank: "RANK A+ · R&D MEMOIR",
    category: "math",
    title: {
      en: "4D Implicit Neural Surfaces f(x,y,z,t)=0 & Differential Geometry",
      fr: "Surfaces Implicites Neuronales 4D f(x,y,z,t)=0 & Mémoire BMBI",
    },
    org: "CNRS UMR 7338 (BMBI) · TZ2",
    period: "Sept. 2025 – Jan. 2026",
    metrics: ["IoU = 99.65%", "Gauss-Bonnet 0.025%", "Error 18% → 4.6%", "Technical Memoir"],
    summary: {
      en: "Applied mathematical & deep learning research project with a comprehensive technical research memoir (not yet published as a peer-reviewed journal paper): continuous 4D space-time modeling of red blood cells and deforming micro-capsules.",
      fr: "Projet de recherche académique accompagné d'un mémoire technique complet (pas encore publié en revue officielle) : modélisation continue spatio-temporelle 4D de globules rouges et capsules déformables en écoulement.",
    },
    highlights: [
      {
        en: "Recovered Kuchel's exact quartic equation in 10 polynomial coefficients (vs 197,886 MLP weights) and validated Gauss-Bonnet (∮ K dA = 4π) to 0.025% via mesh-free 2nd-order PyTorch autograd.",
        fr: "Identification de la quartique analytique exacte de Kuchel en 10 coefficients (vs 197 886 poids MLP) et validation de Gauss-Bonnet à 0,025 % par autograd PyTorch d'ordre 2 sans maillage.",
      },
      {
        en: "Trained 4D SIREN + spatial Eikonal regularization on finite-element meshes (20,001 steps), achieving 99.65% IoU on unseen frames and cutting velocity error from 18% to 4.6%.",
        fr: "Réseaux SIREN 4D avec contrainte Eikonale spatiale sur données Éléments Finis (IoU = 99,65 % sur instants cachés, erreur vitesse réduite de 18 % à 4,6 %).",
      },
    ],
    stack: ["PyTorch Autograd 2nd-Order", "SIREN / Fourier MLP", "Eikonal PDE", "Marching Cubes", "Differential Geometry", "LaTeX Memoir"],
    screens: [
      { src: "/images/projects/tz2/capsule_deformation_60fps.gif", caption: { en: "4D Learned Implicit Capsule Deformation (60fps)", fr: "Déformation apprise en espace-temps 4D (60fps)" } },
      { src: "/images/projects/tz2/rendu_globule_rouge.png", caption: { en: "Kuchel Quartic Red Blood Cell F(x,y,z)=0", fr: "Globule rouge analytique (Quartique de Kuchel)" } },
      { src: "/images/projects/tz2/temporel_3d.png", caption: { en: "Interpolation at Hidden Time Steps (IoU 99.65%)", fr: "Reconstruction d'instants jamais montrés (IoU 99,65 %)" } },
      { src: "/images/projects/tz2/capsules_formes.png", caption: { en: "Non-Affine Parachute Deformation Sequence", fr: "Séquence non affine (parachute concave → relaxation)" } },
    ],
    links: {
      github: "https://github.com/joshdeutc/surfaces-implicites",
    },
  },
  {
    id: "aubay-outliers",
    rank: "RANK A · TABULAR ML",
    category: "math",
    title: {
      en: "Contextual Tabular Anomaly Detection & Full-Stack Platform",
      fr: "Détection d'Anomalies Contextuelles Tabulaires & Plateforme Web",
    },
    org: "Aubay Innovation Lab",
    period: "Sept. 2024 – Feb. 2025",
    metrics: ["F1 = 0.77", "100% Recall", "PyTorch Tabular", "Flask + React + S3"],
    summary: {
      en: "End-to-end R&D benchmark and web platform combining Tabular Transformers (GANDALF, FT-Transformer, TabTransformer) with Isolation Forest & Deep Isolation Forest on mixed tabular datasets.",
      fr: "Plateforme full-stack et benchmark combinant Transformers tabulaires (GANDALF, FT-Transformer, TabTransformer) avec Isolation Forest et Deep Isolation Forest sur données mixtes.",
    },
    highlights: [
      {
        en: "Achieved F1 = 0.77 with 100% recall on contextual price anomalies (Automobile UCI benchmark with Yeo-Johnson normalization).",
        fr: "Score F1 = 0,77 avec 100 % de rappel sur la détection d'anomalies contextuelles de prix (jeu Automobile UCI + Yeo-Johnson).",
      },
      {
        en: "Modular Flask REST backend running isolated Conda environments per model, connected to a React frontend, Docker & Amazon S3.",
        fr: "Back-end REST Flask orchestrant des environnements Conda isolés par algorithme, front-end React, Docker et stockage Amazon S3.",
      },
    ],
    stack: ["PyTorch Tabular", "GANDALF / FT-Transformer", "Deep Isolation Forest", "Flask REST API", "React", "Docker", "Conda", "AWS S3"],
    screens: [
      { src: "/images/projects/aubay/menu.png", caption: { en: "React + Flask Anomaly Pipeline UI", fr: "Interface Web React / API Flask du projet" } },
      { src: "/images/projects/aubay/confusion_gandalf.png", caption: { en: "100% Recall Confusion Matrix (Automobile Price)", fr: "Matrice de confusion — Rappel 100 %" } },
    ],
    links: {},
  },
  {
    id: "monlycee-relay",
    rank: "RANK A · ZERO-TRUST CLOUD",
    category: "mobile",
    title: {
      en: "MonLycée Relay — Zero-Trust SSO Cloud Broker & Edge Extension",
      fr: "MonLycée Relay — Broker SSO Zero-Trust & Extension Edge Manifest V3",
    },
    org: "Personal Systems Architecture",
    period: "2026",
    metrics: ["< 50ms RAM Cache", "Edge Manifest V3", "Zero Local Password", "Cloud Playwright"],
    summary: {
      en: "Remote cloud SSO negotiator (FastAPI + Playwright Headless Chromium on AWS/Oracle Ubuntu) pairing with a custom Microsoft Edge Manifest V3 extension that injects authenticated Keycloak cookies without ever storing passwords on the client.",
      fr: "Serveur cloud de négociation SSO (FastAPI + Playwright Headless Chromium sur AWS/Oracle) couplé à une extension Edge Manifest V3 injectant les cookies sans jamais stocker de mot de passe en local.",
    },
    highlights: [
      {
        en: "Paired with Self-System (`systemd` watchdogs, `mitmproxy` TLS domain quotas, `dm-verity`) for multi-OS behavioral hardening.",
        fr: "Complète l'écosystème Self-System (`systemd` watchdogs, `mitmproxy`, `dm-verity`) pour le contrôle multi-OS.",
      },
    ],
    stack: ["FastAPI", "Playwright", "Manifest V3", "JavaScript", "AWS / Oracle Cloud", "systemd", "mitmproxy"],
    screens: [
      { src: "/images/projects/monlycee/extension.png", caption: { en: "Live Capture — MonLycée Connect Edge Extension", fr: "Capture réelle — Extension Edge Manifest V3" } },
    ],
    links: {
      github: "https://github.com/joshdeutc/monlycee-relay",
      external: "https://github.com/joshdeutc/self-system",
      externalLabel: { en: "Self-System Repo", fr: "Dépôt Self-System" },
    },
  },
];

export interface ExperienceItem {
  id: string;
  role: LocalizedText;
  company: string;
  location: string;
  type: LocalizedText;
  period: LocalizedText;
  duration: LocalizedText;
  isCurrent?: boolean;
  logos: string[];
  // Percentage along 2022 -> 2026 gauge (Jan 2022 = 0, Dec 2026 = 100)
  gaugeLeftPct: number;
  gaugeWidthPct: number;
  companyBio: LocalizedText;
  projectsCol: LocalizedText[];
  missionsCol: LocalizedText[];
  takeaway: LocalizedText;
  stack: string[];
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "freelance-custos",
    role: {
      en: "FREELANCE AI & MOBILE SYSTEMS ENGINEER",
      fr: "INGÉNIEUR FREELANCE IA & SYSTÈMES MOBILES",
    },
    company: "MALT · CUSTOS",
    location: "PARIS, FRANCE",
    type: { en: "FREELANCE & FOUNDER", fr: "FREELANCE & ÉDITEUR" },
    period: { en: "2025 – Present", fr: "2025 – Aujourd'hui" },
    duration: { en: "Active", fr: "En cours" },
    isCurrent: true,
    logos: ["/images/logos/malt.svg", "/images/logos/custos.svg"],
    gaugeLeftPct: 68,
    gaugeWidthPct: 30,
    companyBio: {
      en: "Independent engineering practice available via Malt alongside shipping Custos, a native Android Device Owner self-discipline application engineered from OS primitives up to Play Console release readiness.",
      fr: "Activité d'ingénierie indépendante sur Malt en parallèle de l'édition de Custos, une application Android Device Owner conçue au plus près des API système jusqu'au déploiement Google Play.",
    },
    projectsCol: [
      {
        en: "Built and shipped Custos v1.4 (com.jo.selfcontrol.ultimate) tested across Pixel, Xiaomi HyperOS and Samsung Knox.",
        fr: "Conception et déploiement de Custos v1.4 (com.jo.selfcontrol.ultimate) éprouvé sur Pixel, Xiaomi HyperOS et Samsung Knox.",
      },
      {
        en: "Engineered automated multi-agent career & RAG intelligence pipelines (SQLite FTS5 BM25 + Groq LLaMA 3.3 70B + Pydantic citation checks).",
        fr: "Développement de pipelines RAG locaux et d'évaluation multi-agents (SQLite FTS5 BM25 + API Groq + validation Pydantic).",
      },
      {
        en: "Designed Next.js 15 / Vercel web portals with complete GDPR compliance for mobile product distribution.",
        fr: "Création de portails Next.js 15 / Vercel conformes au RGPD pour la distribution d'applications mobiles.",
      },
    ],
    missionsCol: [
      {
        en: "End-to-end Kotlin Android system programming: DevicePolicyManager, AccessibilityService tree parsing, ForegroundService, AIDL IPC, Private DNS-over-TLS.",
        fr: "Programmation système Kotlin/Android : DevicePolicyManager, inspection d'accessibilité, ForegroundService, AIDL IPC, Private DNS-over-TLS.",
      },
      {
        en: "AI Engineering consulting: grounded LLM extraction, adversarial evaluation harnesses, local/cloud deployment.",
        fr: "Conseil & réalisation IA : extraction structurée sans hallucination, bancs d'évaluation et déploiement cloud/local.",
      },
    ],
    takeaway: {
      en: "Shipping software under your own publisher identity forces zero compromises on reliability, OS edge cases, privacy transparency and user trust.",
      fr: "Porter un produit de bout en bout sous sa propre entité oblige à maîtriser autant la couche OS bas niveau que l'architecture web et la conformité RGPD.",
    },
    stack: ["Kotlin", "Android DPM", "Next.js 15", "TypeScript", "FastAPI", "Groq / RAG", "MCP", "Vercel / Docker"],
  },
  {
    id: "epiconcept",
    role: {
      en: "ML & CLINICAL NLP RESEARCH ENGINEER",
      fr: "INGÉNIEUR RECHERCHE ML & NLP CLINIQUE",
    },
    company: "EPICONCEPT",
    location: "PARIS 11E, FRANCE",
    type: { en: "R&D INTERNSHIP (TN10)", fr: "STAGE FIN D'ÉTUDES (TN10)" },
    period: { en: "Mar. 2026 – Sept. 2026", fr: "Mars 2026 – Sept. 2026" },
    duration: { en: "6 mos.", fr: "6 mois" },
    logos: ["/images/logos/epiconcept.jpg"],
    gaugeLeftPct: 83.3,
    gaugeWidthPct: 11.7,
    companyBio: {
      en: "Epiconcept is a digital health & epidemiology R&D company developing public-health screening systems (deep.piste breast cancer AI) and European clinical surveillance pipelines (ECDC).",
      fr: "Epiconcept est une société R&D en e-santé et épidémiologie développant des solutions de dépistage par IA (deep.piste) et de surveillance clinique européenne (ECDC).",
    },
    projectsCol: [
      {
        en: "deep.piste Mammography Vision: fine-tuned 5-model GMIC Deep Ensemble (ResNet-22/18) on 300+ GB 16-bit RSNA scans, lifting AUC from 0.683 to 0.889.",
        fr: "Vision deep.piste : fine-tuning d'un ensemble de 5 réseaux GMIC sur 300+ Go de mammographies RSNA 16-bit (AUC 0,683 → 0,889).",
      },
      {
        en: "Implemented finite-sample SGR selective prediction (Hoeffding / binomial tail inversion) bounding clinical FNR ≤ 5% and FPR ≤ 5%.",
        fr: "Classification sélective SGR par inversion binomiale / Hoeffding garantissant simultanément FNR ≤ 5 % et FPR ≤ 5 %.",
      },
      {
        en: "CATH-LLM Extraction: achieved F1 = 0.91 (EN) and F1 = 0.88 (Croatian zero-shot) across 249 MIMIC-IV clinical notes.",
        fr: "CATH-LLM : extraction de cathéters avec F1 = 0,91 (EN) et F1 = 0,88 (croate zéro-shot) sur 249 comptes rendus MIMIC-IV.",
      },
    ],
    missionsCol: [
      {
        en: "Authored an 8-chapter executable PyTorch & Risk Control training capsule inside Docker for Epiconcept's engineering team.",
        fr: "Rédaction d'une capsule pédagogique de 8 chapitres exécutables (Docker / PyTorch / Incertitude) pour l'équipe data.",
      },
      {
        en: "Sized and quantized 24B/27B models in 4-bit NF4 via Unsloth & FlashAttention-2 on a single A100 40GB (~2–3s/note, <€100 total compute for 4,500+ runs).",
        fr: "Quantification 4-bit NF4 (Unsloth + FlashAttention-2) sur 1× A100 40 Go (~2–3 s/note, < 100 € pour 4 500+ inférences).",
      },
      {
        en: "Diagnosed +40% BPE token inflation in Croatian vs English and designed the 4-tier verify.csv adversarial grader & 6-chapter Quarto manual.",
        fr: "Diagnostic d'inflation BPE (+40 % croate vs anglais), fenêtre 16 384 tokens, grader adversaire verify.csv et manuel Quarto 6 chapitres.",
      },
    ],
    takeaway: {
      en: "In medical AI, an impressive headline F1 hides critical failure modes: deterministic grounding checks, parse verification and abstention guarantees separate toy demos from deployable tools.",
      fr: "En IA médicale, un bon F1 agrégé peut masquer des hallucinations ou échecs de parsing : la vérifiabilité déterministe et le contrôle statistique du risque sont indispensables.",
    },
    stack: ["PyTorch 16-bit", "GMIC ResNet", "MedGemma / Qwen", "Unsloth NF4", "FlashAttention-2", "SGR Hoeffding", "Docker", "Quarto"],
  },
  {
    id: "aubay",
    role: {
      en: "DATA SCIENCE & FULL-STACK ENGINEER",
      fr: "STAGIAIRE DATA SCIENCE & FULL-STACK",
    },
    company: "AUBAY INNOVATION",
    location: "BOULOGNE-BILLANCOURT, FRANCE",
    type: { en: "ENGINEERING INTERNSHIP (TN09)", fr: "STAGE ASSISTANT INGÉNIEUR (TN09)" },
    period: { en: "Sept. 2024 – Feb. 2025", fr: "Sept. 2024 – Fév. 2025" },
    duration: { en: "6 mos.", fr: "6 mois" },
    logos: ["/images/logos/aubay.jpg"],
    gaugeLeftPct: 53.3,
    gaugeWidthPct: 10.0,
    companyBio: {
      en: "Aubay Innov' is the internal R&D lab of consulting group Aubay, building data quality, contextual anomaly detection and applied AI proofs of concept.",
      fr: "Aubay Innov' est le pôle R&D et innovation du groupe Aubay, dédié aux PoC de qualité des données, détection d'anomalies et IA appliquée.",
    },
    projectsCol: [
      {
        en: "Benchmarked PyTorch Tabular embeddings (GANDALF, FT-Transformer, TabTransformer) paired with Isolation Forest & Deep Isolation Forest on mixed tabular data.",
        fr: "Benchmark d'architectures PyTorch Tabular (GANDALF, FT-Transformer, TabTransformer) couplées à Isolation Forest et Deep Isolation Forest.",
      },
      {
        en: "Delivered F1 = 0.77 with 100% recall (precision 0.625) on contextual price anomalies (UCI Automobile with Yeo-Johnson transform).",
        fr: "Obtention de F1 = 0,77 et 100 % de rappel sur la détection d'anomalies contextuelles de prix (jeu Automobile UCI + Yeo-Johnson).",
      },
    ],
    missionsCol: [
      {
        en: "Architected the modular Flask REST API serving contextual outlier pipelines inside isolated Conda environments & Docker containers.",
        fr: "Développement de l'API REST Flask modulaire exécutant chaque modèle dans des environnements Conda isolés et conteneurs Docker.",
      },
      {
        en: "Connected the backend to a React interface and AWS S3 storage while documenting self-supervised extensions for unlabelled schemas.",
        fr: "Connexion au front-end React et au stockage Amazon S3, avec préconisations d'approches auto-supervisées.",
      },
    ],
    takeaway: {
      en: "Bridged research notebooks with maintainable backend architecture: learned to turn experimental tabular neural models into clean, reproducible web APIs.",
      fr: "Apprentissage concret de l'industrialisation : transformer des benchmarks tabulaires complexes en une API web isolée, testable et maintenable.",
    },
    stack: ["PyTorch Tabular", "GANDALF", "Isolation Forest / DIF", "Flask REST", "React", "Docker", "Conda", "AWS S3"],
  },
  {
    id: "completude",
    role: {
      en: "MATHEMATICS & PHYSICS TUTOR",
      fr: "PROFESSEUR PARTICULIER MATHS & PHYSIQUE",
    },
    company: "COMPLÉTUDE",
    location: "PARIS & COMPIÈGNE, FRANCE",
    type: { en: "PART-TIME · 4+ YEARS", fr: "ENSEIGNEMENT · 4+ ANS" },
    period: { en: "Mar. 2022 – Present", fr: "Mars 2022 – Aujourd'hui" },
    duration: { en: "4+ yrs", fr: "4+ ans" },
    isCurrent: true,
    logos: ["/images/logos/completude.svg"],
    gaugeLeftPct: 3.3,
    gaugeWidthPct: 94.7,
    companyBio: {
      en: "One-to-one academic tutoring across High School & Preparatory tracks in Paris and Compiègne alongside engineering studies.",
      fr: "Accompagnement individuel en Mathématiques et Sciences Physiques (Lycée & Supérieur) à Paris et Compiègne en parallèle du cursus ingénieur.",
    },
    projectsCol: [
      {
        en: "Designed tailored diagnostic assessments and structured revision plans preparing students for Baccalauréat and competitive exams.",
        fr: "Diagnostic pédagogique personnalisé et plans d'entraînement structurés pour le Baccalauréat et les concours scientifiques.",
      },
    ],
    missionsCol: [
      {
        en: "Explained rigorous analytical and probabilistic concepts clearly, building intuition and exam autonomy over 4+ continuous years.",
        fr: "Vulgarisation de notions mathématiques et physiques rigoureuses avec suivi régulier sur plus de 4 ans.",
      },
    ],
    takeaway: {
      en: "Teaching complex math every week sharpens clear technical communication — the exact skill needed to defend ML architectures in front of clinicians and product stakeholders.",
      fr: "Expliquer des notions mathématiques chaque semaine forge une clarté pédagogique essentielle pour vulgariser un modèle devant des médecins ou clients.",
    },
    stack: ["Mathematics", "Physics", "Pedagogy", "Scientific Communication"],
  },
];

export interface SkillItem {
  name: string;
  usedIn: LocalizedText;
}

export interface SkillCategory {
  id: string;
  title: LocalizedText;
  kanji: string;
  subtitle: LocalizedText;
  items: SkillItem[];
}

export const STACK_CATEGORIES: SkillCategory[] = [
  {
    id: "llm-rag",
    title: { en: "LLMs, Agents, RAG & Eval", fr: "LLMs, Agents, RAG & Évaluation" },
    kanji: "知",
    subtitle: {
      en: "Open-weights inference, deterministic verification, retrieval & agentic loops",
      fr: "Inférence locale quantifiée, vérification déterministe, RAG & boucles multi-agents",
    },
    items: [
      { name: "PyTorch", usedIn: { en: "GMIC, CATH-LLM, 4D SIREN, Aubay Tabular", fr: "GMIC, CATH-LLM, SIREN 4D, Aubay" } },
      { name: "Hugging Face Transformers", usedIn: { en: "20 local LLM benchmarks (Epiconcept)", fr: "Benchmark 20 LLMs locaux (Epiconcept)" } },
      { name: "Unsloth (4-bit NF4)", usedIn: { en: "24B/27B models on single 40GB A100", fr: "Modèles 24B/27B sur A100 40 Go" } },
      { name: "FlashAttention-2", usedIn: { en: "16,384-token clinical context sizing", fr: "Fenêtre clinique 16 384 tokens" } },
      { name: "bitsandbytes (int8/NF4)", usedIn: { en: "Memory-bounded inference optimization", fr: "Quantification VRAM GPU contraint" } },
      { name: "Groq API (LLaMA 3.3 70B)", usedIn: { en: "Jarvis multi-pass ATS filtering jury", fr: "Jury LLM multi-passes Jarvis" } },
      { name: "Instructor + Pydantic v2", usedIn: { en: "Strict JSON schemas & zero parse errors", fr: "Sorties JSON strictes & validateurs" } },
      { name: "SQLite FTS5 (BM25 RAG)", usedIn: { en: "Jarvis Brain local sub-20ms search index", fr: "Moteur RAG local Jarvis (< 20 ms)" } },
      { name: "MCP (Model Context Protocol)", usedIn: { en: "Graphify MCP & IDE agent integrations", fr: "Graphify MCP & outils agents IDE" } },
      { name: "Google ADK Multi-Agent Pattern", usedIn: { en: "Researcher -> Builder <-> Judge loops", fr: "Boucles Researcher -> Builder <-> Judge" } },
      { name: "vLLM / SGLang", usedIn: { en: "High-throughput local LLM serving", fr: "Serving local LLMs open-weights" } },
      { name: "Adversarial Grading (verify.csv)", usedIn: { en: "4-tier clinical error & quote grounding", fr: "Grader 4 niveaux & citations verbatim" } },
      { name: "NLLB-200 / EuroLLM / BPE", usedIn: { en: "Cross-lingual EN <-> Croatian evaluation", fr: "Transfert cross-lingue EN <-> Croate" } },
    ],
  },
  {
    id: "ml-math",
    title: { en: "ML, Vision & Scientific Math", fr: "ML, Vision & Calcul Scientifique" },
    kanji: "数",
    subtitle: {
      en: "Selective risk guarantees, differential geometry, tabular transformers & classical CV",
      fr: "Contrôle statistique du risque, géométrie différentielle, tabulaire & vision",
    },
    items: [
      { name: "GMIC (ResNet-22 / ResNet-18)", usedIn: { en: "RSNA 16-bit mammography (AUC 0.889)", fr: "Mammographies RSNA 16-bit (AUC 0,889)" } },
      { name: "Selective Risk (SGR / Hoeffding)", usedIn: { en: "FNR <= 5% & FPR <= 5% binomial bounds", fr: "Bornes binomiales FNR <= 5% & FPR <= 5%" } },
      { name: "MC Dropout & Deep Ensembles", usedIn: { en: "Epistemic uncertainty (deep.piste)", fr: "Quantification d'incertitude (deep.piste)" } },
      { name: "SIREN / Fourier MLP + Eikonal", usedIn: { en: "4D space-time surfaces (IoU 99.65%)", fr: "Surfaces 4D espace-temps (IoU 99,65 %)" } },
      { name: "2nd-Order Autograd Hessians", usedIn: { en: "Gauss-Bonnet validation at 0.025%", fr: "Courbures exactes & Gauss-Bonnet 0,025 %" } },
      { name: "PyTorch Tabular (GANDALF / FT)", usedIn: { en: "Aubay mixed tabular contextual outliers", fr: "Anomalies contextuelles Aubay (F1 0,77)" } },
      { name: "Isolation Forest / Deep IF", usedIn: { en: "100% recall anomaly scoring (Aubay)", fr: "Rappel 100 % anomalies contextuelles" } },
      { name: "scikit-learn & LightGBM", usedIn: { en: "Tabular benchmarks, Wald tests, clustering", fr: "Classification, tests de Wald, clustering" } },
      { name: "OpenCV / HOG / LBP / HNM", usedIn: { en: "SY32 object detection & NMS", fr: "Détection d'objets SY32 & NMS" } },
      { name: "NumPy / SciPy / Pandas / PySpark", usedIn: { en: "NF26 20,600+ missions ETL & numerics", fr: "Pipeline ETL 20 600 missions & calcul" } },
      { name: "Markov Chains & Convex Opt.", usedIn: { en: "UTC Label Mod'Math (RO04 / RO05 / MT09)", fr: "Label Mod'Math UTC (RO04 / RO05 / MT09)" } },
      { name: "TensorBoard & Scilab", usedIn: { en: "Training diagnostics & matrix numerics", fr: "Suivi d'entraînement & analyse numérique" } },
    ],
  },
  {
    id: "mobile-os",
    title: { en: "Android, Kotlin & OS Security", fr: "Android, Kotlin & Sécurité Système" },
    kanji: "盾",
    subtitle: {
      en: "Privilege hardening, accessibility inspection, watchdogs & cross-language systems",
      fr: "Durcissement privilèges OS, accessibilité, watchdogs & programmation système",
    },
    items: [
      { name: "Kotlin", usedIn: { en: "Custos, WebView Fleet, Soundboard", fr: "Custos, WebView Fleet, Soundboard" } },
      { name: "Android SDK (API 26–35)", usedIn: { en: "Custos Production v1.4", fr: "Custos Production v1.4" } },
      { name: "Jetpack Compose (Material 3)", usedIn: { en: "Audio Soundboard & UI tooling", fr: "Soundboard Android & composants UI" } },
      { name: "DevicePolicyManager (Device Owner)", usedIn: { en: "Custos Zero-Trust app quarantine", fr: "Quarantaine Zero-Trust Device Owner" } },
      { name: "AccessibilityService", usedIn: { en: "Custos in-app Partial Access filtering", fr: "Filtrage granulaire in-app (Custos)" } },
      { name: "AIDL IPC & ForegroundService", usedIn: { en: "Guardian dual-process protection", fr: "Architecture dual-process Guardian" } },
      { name: "Samsung Knox / Magisk ABX", usedIn: { en: "Pixel 8a, Xiaomi HyperOS, Galaxy A53", fr: "Pixel 8a, Xiaomi HyperOS, Galaxy A53" } },
      { name: "Private DNS-over-TLS", usedIn: { en: "Network-level filtering in Custos", fr: "Contrôle réseau DNS-over-TLS Custos" } },
      { name: "ADB Automation & Gradle Flavors", usedIn: { en: "Multi-device provisioning & test suites", fr: "Suites de tests ADB & 4 flavors Gradle" } },
      { name: "Linux systemd & dm-verity", usedIn: { en: "Self-System tamper-proof daemons", fr: "Démons système anti-contournement" } },
      { name: "mitmproxy (TLS Inspection)", usedIn: { en: "HTTP/HTTPS per-domain time quotas", fr: "Quotas HTTP/HTTPS par domaine" } },
      { name: "C / C++17 & Qt 6 / CMake", usedIn: { en: "SR01 Unix IPC & LO21 7 Wonders Duel", fr: "Système Unix C & Jeu C++17 Qt 6" } },
      { name: "Go & Prolog", usedIn: { en: "IA04 Multi-Agent Sim & IA02 CSP/SAT", fr: "Systèmes multi-agents Go & Prolog" } },
    ],
  },
  {
    id: "backend-cloud",
    title: { en: "Backend, Web & Cloud Infra", fr: "Backend, Web & Cloud Infrastructure" },
    kanji: "雲",
    subtitle: {
      en: "Production APIs, browser automation, GPU cloud provisioning & CI/CD deployment",
      fr: "APIs de production, extensions navigateur, cloud GPU & déploiement continu",
    },
    items: [
      { name: "Next.js 15 (App Router)", usedIn: { en: "joshuanancey.com & Custos Web", fr: "joshuanancey.com & site Custos" } },
      { name: "React 19 & TypeScript", usedIn: { en: "Aubay Anomaly UI & Portfolio", fr: "UI Aubay & Portfolio interactif" } },
      { name: "Tailwind CSS & Framer Motion", usedIn: { en: "Animated Manga UI & responsive design", fr: "Interface Manga animée & responsive" } },
      { name: "FastAPI (Async + SSE)", usedIn: { en: "MonLycée Auth Relay (< 50ms RAM cache)", fr: "Broker MonLycée Relay (< 50 ms RAM)" } },
      { name: "Flask REST + Gunicorn", usedIn: { en: "Aubay Innovation anomaly microservices", fr: "Microservices anomalies Aubay" } },
      { name: "Playwright (Headless Chromium)", usedIn: { en: "Remote Keycloak SSO negotiation", fr: "Négociation SSO Keycloak déportée" } },
      { name: "Edge / Chrome Manifest V3", usedIn: { en: "MonLycée Connect browser extension", fr: "Extension navigateur MonLycée Connect" } },
      { name: "Docker & Docker Compose", usedIn: { en: "Epiconcept 8-ch. capsule & Aubay API", fr: "Capsule Epiconcept & API Aubay" } },
      { name: "Scaleway GPU Cloud (A100)", usedIn: { en: "4,500+ LLM runs under €100 budget", fr: "4 500+ runs LLM à < 100 €" } },
      { name: "AWS (S3, EC2) & Oracle Cloud", usedIn: { en: "Aubay S3 storage & remote relays", fr: "Stockage S3 Aubay & relais cloud" } },
      { name: "Vercel (Hobby & Edge)", usedIn: { en: "CI/CD hosting for joshuanancey.com", fr: "Déploiement CI/CD joshuanancey.com" } },
      { name: "PostgreSQL / SQLite / Oracle SQL", usedIn: { en: "NF18 schemas, NF26 DW & Jarvis DB", fr: "Modélisation SQL, Data Warehouse & DB" } },
      { name: "GitHub Actions CI/CD", usedIn: { en: "Time-Lock signed APK release pipelines", fr: "Pipelines APK signés avec Time-Lock" } },
      { name: "Quarto / LaTeX / Conda", usedIn: { en: "Scientific manuals, ATS CVs & isolation", fr: "Manuels Quarto, CVs ATS & Conda" } },
    ],
  },
];
