export type Lang = "en" | "fr";

export interface LocalizedText {
  en: string;
  fr: string;
}

export function pick(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

export const UI_COPY = {
  nav: {
    brandSub: {
      en: "VOL. 01 · AI & SYSTEMS ENGINEER",
      fr: "TOME 01 · INGÉNIEUR IA & SYSTÈMES",
    },
    chapters: [
      { id: "about", num: "01", en: "ABOUT", fr: "À PROPOS", kanji: "主" },
      { id: "projects", num: "02", en: "PROJECTS", fr: "PROJETS", kanji: "挑" },
      { id: "experience", num: "03", en: "EXPERIENCE", fr: "EXPÉRIENCE", kanji: "歴" },
      { id: "stack", num: "04", en: "STACK & MALT", fr: "STACK & MALT", kanji: "技" },
    ],
    privacyLink: { en: "Privacy (Custos)", fr: "Confidentialité (Custos)" },
    hireMalt: { en: "Hire on Malt", fr: "Mission sur Malt" },
    prevChapter: { en: "Prev Chapter", fr: "Chapitre Précédent" },
    nextChapter: { en: "Next Chapter", fr: "Chapitre Suivant" },
  },
  about: {
    badge: { en: "CHAPTER 01 · THE PROTAGONIST", fr: "CHAPITRE 01 · LE PROTAGONISTE" },
    headline: {
      en: "I engineer grounded AI systems and unbreakable mobile software.",
      fr: "Je conçois des systèmes d'IA fiables et des logiciels mobiles bas niveau.",
    },
    dialogue: [
      {
        en: "Graduated from UTC Compiègne (Computer Science — AI & Data Science + Mod'Math Honors), I bridge mathematical rigor with production systems.",
        fr: "Ingénieur diplômé de l'UTC Compiègne (Génie Informatique — Filière IAD & Label Mod'Math), je relie modélisation mathématique rigoureuse et ingénierie logicielle.",
      },
      {
        en: "From 4D implicit neural surfaces and A100 quantized clinical LLMs to Android Device Owner daemons, I ship measurable engineering — never hype.",
        fr: "Des surfaces implicites 4D et LLMs cliniques quantifiés sur A100 aux démons système Android Device Owner, je livre du code vérifiable — jamais de promesses vides.",
      },
      {
        en: "Available for Freelance AI / LLM / Mobile missions on Malt and ambitious engineering teams in Paris or remotely.",
        fr: "Disponible pour vos missions Freelance IA / LLM / Mobile sur Malt ainsi que pour des équipes d'ingénierie exigeantes à Paris ou en remote.",
      },
    ],
    photoCaption: { en: "PARIS, FR · REAL SNAPSHOT", fr: "PARIS · PHOTO ORIGINALE" },
    ctaResumeEn: { en: "ATS Resume (EN)", fr: "CV ATS (EN)" },
    ctaResumeFr: { en: "CV Ingénieur (FR)", fr: "CV Ingénieur (FR)" },
    ctaMalt: { en: "Book on Malt", fr: "Voir profil Malt" },
    ctaQuests: { en: "Open Quests (Ch.02)", fr: "Voir les Projets (Ch.02)" },
    eduTitle: { en: "TRAINING ARC · EDUCATION", fr: "ARC ACADÉMIQUE · FORMATION" },
    passionsTitle: { en: "OFF-SCREEN · SPORTS & ENGAGEMENT", fr: "HORS ÉCRAN · SPORTS & ENGAGEMENTS" },
    passionsSubtitle: {
      en: "Discipline forged on the mat and in the ring — primary pastime: Sport.",
      fr: "La discipline forgée sur le tapis et sur le ring — passe-temps n°1 : le Sport.",
    },
    langsTitle: { en: "COMMUNICATION CHANNELS", fr: "LANGUES PARLÉES" },
  },
  projects: {
    badge: { en: "CHAPTER 02 · THE QUESTS", fr: "CHAPITRE 02 · LES QUÊTES" },
    title: { en: "FIELD QUESTS & SHIPPED SYSTEMS", fr: "PROJETS & SYSTÈMES LIVRÉS" },
    subtitle: {
      en: "Flagship mobile OS work (Custos), Epiconcept R&D benchmarks (CATH-LLM & deep.piste), CNRS BMBI 4D thesis memoir, Aubay & Cloud Edge Relay. Click any panel to inspect screenshots.",
      fr: "Application mobile phare (Custos), projets R&D Epiconcept (CATH-LLM & deep.piste), mémoire de recherche BMBI 4D, Aubay et Relais Edge. Cliquez sur une case pour ouvrir le carrousel complet.",
    },
    filterAll: { en: "All Quests", fr: "Toutes les Quêtes" },
    filterMobile: { en: "Mobile & OS", fr: "Mobile & Système" },
    filterAI: { en: "AI, Vision & LLMs", fr: "IA, Vision & LLMs" },
    filterMath: { en: "Math & Full-Stack", fr: "Maths & Full-Stack" },
    openDetails: { en: "Inspect Panels & Screens", fr: "Ouvrir Captures & Détails" },
    closeModal: { en: "Close Panel", fr: "Fermer" },
    screensLabel: { en: "Captured Screens & Figures", fr: "Captures Réelles & Figures" },
    stackLabel: { en: "Equipped Stack", fr: "Stack Utilisée" },
    flagshipTag: { en: "FLAGSHIP QUEST · LIVE SAMSUNG CAPTURES", fr: "QUÊTE PHARE · CAPTURES SAMSUNG RÉELLES" },
  },
  experience: {
    badge: { en: "CHAPTER 03 · CHRONOLOGICAL ARC", fr: "CHAPITRE 03 · ARC CHRONOLOGIQUE" },
    title: { en: "EXPERIENCE", fr: "EXPÉRIENCE" },
    subtitle: {
      en: "From teaching mathematics to shipping AI research and OS-level Android software — most recent first.",
      fr: "De l'enseignement des mathématiques à la R&D en IA et au développement système — du plus récent au plus ancien.",
    },
    companyLabel: { en: "THE ORGANIZATION", fr: "L'ORGANISATION" },
    projectsLabel: { en: "KEY DELIVERABLES", fr: "PROJETS & LIVRABLES" },
    missionsLabel: { en: "ENGINEERING MISSIONS", fr: "MISSIONS TECHNIQUES" },
    takeawayLabel: { en: "KEY TAKEAWAYS", fr: "RETOUR D'EXPÉRIENCE" },
    stackLabel: { en: "STACK", fr: "STACK" },
  },
  stack: {
    badge: { en: "CHAPTER 04 · THE ARSENAL", fr: "CHAPITRE 04 · L'INVENTAIRE" },
    title: { en: "TECHNICAL ARSENAL & TALENT TREE", fr: "INVENTAIRE & ARBRE DE COMPÉTENCES" },
    subtitle: {
      en: "Every tool below was battle-tested in real internships, research codebases, or shipped production software. Click any skill card to see where it was deployed.",
      fr: "Chaque outil ci-dessous a été réellement déployé en stage, en recherche ou en production. Cliquez sur une carte pour voir son contexte d'usage réel.",
    },
    deployedIn: { en: "Proven in:", fr: "Éprouvé dans :" },
    summonBadge: { en: "FINAL PANEL · SUMMON JOSHUA", fr: "DERNIÈRE PLANCHE · RECRUTER JOSHUA" },
    summonTitle: {
      en: "Need a pragmatic AI, LLM or Android Engineer for your team?",
      fr: "Besoin d'un Ingénieur IA, LLM ou Mobile pragmatique sur votre projet ?",
    },
    summonDesc: {
      en: "Available for freelance missions via Malt (AI agents, RAG evaluation, FastAPI/Next.js backends, Android apps) and full-time R&D engineering roles.",
      fr: "Disponible pour des missions freelance via Malt (agents IA, RAG sans hallucination, backends FastAPI/Next.js, apps Android) ou des postes d'ingénieur R&D / ML.",
    },
    ctaMaltPrimary: { en: "View My Malt Profile", fr: "Voir mon profil Malt" },
    ctaEmail: { en: "Write to contact@joshuanancey.com", fr: "Écrire à contact@joshuanancey.com" },
    ctaPrivacy: { en: "Custos Privacy & Contact Form", fr: "RGPD Custos & Formulaire Contact" },
  },
  footer: {
    publisher: "Custos — Joshua Nancey",
    location: { en: "Paris, France", fr: "Paris, France" },
    rights: {
      en: "Portfolio & Mobile Publisher Hub. Built for Vercel & Google Play compliance.",
      fr: "Portfolio & Espace Éditeur Mobile. Optimisé pour Vercel & conformité Google Play.",
    },
    privacy: { en: "Privacy Policy & Contact (/privacy)", fr: "Politique de confidentialité & Contact (/privacy)" },
  },
} as const;
