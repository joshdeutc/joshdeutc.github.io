export type Lang = "en" | "fr";

export interface LocalizedText {
  en: string;
  fr: string;
}

export function pick(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

export const UI_COPY = {
  loader: {
    volume: { en: "SHONEN ENGINEERING · VOL. 01", fr: "ÉDITION INGÉNIEUR · TOME 01" },
    title: "JOSHUA NANCEY",
    subtitle: {
      en: "OPENING PORTFOLIO MANGA...",
      fr: "OUVERTURE DU MANGA EN COURS...",
    },
    skip: { en: "OPEN BOOK →", fr: "OUVRIR LE MANGA →" },
  },
  nav: {
    brandSub: {
      en: "VOL. 01 · AI & MOBILE SYSTEMS",
      fr: "TOME 01 · IA & SYSTÈMES MOBILES",
    },
    chapters: [
      { id: "about", num: "01", en: "ABOUT", fr: "À PROPOS" },
      { id: "projects", num: "02", en: "PROJECTS", fr: "PROJETS" },
      { id: "experience", num: "03", en: "EXPERIENCE", fr: "EXPÉRIENCE" },
      { id: "stack", num: "04", en: "STACK", fr: "STACK" },
      { id: "contact", num: "05", en: "CONTACT", fr: "CONTACT" },
    ],
    privacyLink: { en: "Privacy Policy (Custos)", fr: "Confidentialité (Custos)" },
    prevChapter: { en: "Prev Chapter", fr: "Chapitre Précédent" },
    nextChapter: { en: "Next Chapter", fr: "Chapitre Suivant" },
  },
  about: {
    badge: { en: "CHAPTER 01 · THE PROTAGONIST", fr: "CHAPITRE 01 · LE PROTAGONISTE" },
    headline: {
      en: "I turn mathematical proofs and stubborn systems into grounded AI & Android software.",
      fr: "Je transforme les preuves mathématiques et les contraintes système en IA fiable et logiciels Android.",
    },
    dialogue: [
      {
        en: "Graduated from UTC Compiègne (Computer Science — AI & Data Science + Mod'Math Honors), I build reliable systems where every output can be verified.",
        fr: "Diplômé de l'UTC Compiègne (Génie Informatique — Filière IAD & Label Mod'Math), je conçois des systèmes rigoureux dont chaque résultat est vérifiable.",
      },
      {
        en: "From 4D implicit neural surfaces and A100 quantized clinical LLMs to Custos (Android Device Owner), I focus on shipped metrics — never hype.",
        fr: "Des surfaces implicites 4D et LLMs cliniques quantifiés sur A100 jusqu'à Custos (Android Device Owner), je privilégie les métriques réelles à l'effet d'annonce.",
      },
      {
        en: "Available for AI, LLM evaluation, backend or Android missions via Malt — and full-time R&D teams in Paris or remotely.",
        fr: "Disponible pour vos missions Freelance IA, LLM, Backend ou Android sur Malt — et pour les équipes R&D à Paris ou en remote.",
      },
    ],
    photoCaption: { en: "PARIS · REAL PHOTO", fr: "PARIS · PHOTO RÉELLE" },
    eduTitle: { en: "TRAINING ARC · EDUCATION", fr: "ARC ACADÉMIQUE · FORMATION" },
    passionsTitle: { en: "OFF-SCREEN · SPORT & SOLIDARITY", fr: "HORS ÉCRAN · SPORT & ENGAGEMENT" },
    passionsSubtitle: {
      en: "Primary pastime: Sport — discipline on the mat and in the ring.",
      fr: "Passe-temps principal : le Sport — rigueur sur le tapis et sur le ring.",
    },
    langsTitle: { en: "LANGUAGES", fr: "LANGUES" },
  },
  projects: {
    badge: { en: "CHAPTER 02 · QUEST ARCHIVE", fr: "CHAPITRE 02 · ARCHIVE DES QUÊTES" },
    title: { en: "PROJECTS & SHIPPED SYSTEMS", fr: "PROJETS & SYSTÈMES LIVRÉS" },
    subtitle: {
      en: "Pick a manga panel on the left page to inspect its dialogue summary & real captures on the right page.",
      fr: "Sélectionnez une case sur la page de gauche pour lire ses bulles et explorer les captures réelles sur la page de droite.",
    },
    openDetails: { en: "Zoom Screens", fr: "Agrandir Captures" },
    closeModal: { en: "Close", fr: "Fermer" },
    screensLabel: { en: "Live Captures & Figures", fr: "Captures Réelles & Figures" },
    stackLabel: { en: "Equipped Stack", fr: "Stack Utilisée" },
    flagshipTag: { en: "FLAGSHIP · SAMSUNG CAPTURES", fr: "PHARE · CAPTURES SAMSUNG" },
  },
  experience: {
    badge: { en: "CHAPTER 03 · CHRONOLOGICAL ARC", fr: "CHAPITRE 03 · ARC CHRONOLOGIQUE" },
    title: { en: "EXPERIENCE", fr: "EXPÉRIENCE" },
    subtitle: {
      en: "Most recent first — flip between spreads to inspect all 4 chapters of my path.",
      fr: "Du plus récent au plus ancien — tournez la page du manga pour lire les 4 arcs.",
    },
    companyLabel: { en: "ORGANIZATION", fr: "L'ORGANISATION" },
    projectsLabel: { en: "KEY DELIVERABLES", fr: "PROJETS & LIVRABLES" },
    missionsLabel: { en: "MISSIONS", fr: "MISSIONS" },
    takeawayLabel: { en: "KEY TAKEAWAYS", fr: "RETOUR D'EXPÉRIENCE" },
    stackLabel: { en: "STACK", fr: "STACK" },
    spread1Label: { en: "Spread 1/2: Malt & Custos + Epiconcept", fr: "Double-page 1/2 : Malt & Custos + Epiconcept" },
    spread2Label: { en: "Spread 2/2: Aubay Innovation + Complétude", fr: "Double-page 2/2 : Aubay Innovation + Complétude" },
  },
  stack: {
    badge: { en: "CHAPTER 04 · THE ARSENAL", fr: "CHAPITRE 04 · L'INVENTAIRE" },
    title: { en: "FULL TECHNICAL STACK", fr: "ARSENAL TECHNIQUE COMPLET" },
    subtitle: {
      en: "Click or hover any badge to reveal the exact project where it was proven.",
      fr: "Survolez ou cliquez sur une technologie pour voir où elle a été déployée en conditions réelles.",
    },
    deployedIn: { en: "Proven in:", fr: "Éprouvé dans :" },
  },
  contact: {
    badge: { en: "CHAPTER 05 · SUMMON JOSHUA", fr: "CHAPITRE 05 · CONTACTER JOSHUA" },
    title: { en: "LET'S BUILD SOMETHING SOLID", fr: "CONSTRUISONS QUELQUE CHOSE DE SOLIDE" },
    bubble: {
      en: "Need an AI Engineer (LLMs, RAG, Vision), a Backend Architect, or an Android Kotlin specialist? Drop a message in this manga panel or book me directly on Malt!",
      fr: "Besoin d'un Ingénieur IA (LLMs, RAG, Vision), d'un Architecte Backend ou d'un développeur Android Kotlin ? Envoyez-moi un message ici ou passez par Malt !",
    },
    directTitle: { en: "DIRECT CHANNELS & RESUMES", fr: "CANAUX DIRECTS & CVs" },
    formTitle: { en: "SEND A MESSAGE", fr: "ENVOYER UN MESSAGE" },
    ctaMalt: { en: "Hire me on Malt", fr: "M'engager sur Malt" },
    ctaPrivacy: { en: "Custos GDPR Policy (/privacy)", fr: "Politique RGPD Custos (/privacy)" },
  },
  footer: {
    publisher: "Joshua Nancey",
    location: { en: "Paris, France", fr: "Paris, France" },
  },
} as const;
