"use client";

import React, { createContext, useContext, useState } from "react";
import { Lang } from "@/lib/i18n";

export type ChapterId = "about" | "projects" | "experience" | "stack";

interface MangaContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  activeChapter: ChapterId;
  setActiveChapter: (chapter: ChapterId) => void;
  direction: number;
  navigateChapter: (nextChapter: ChapterId) => void;
}

const CHAPTER_ORDER: ChapterId[] = ["about", "projects", "experience", "stack"];

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export function MangaProvider({ children }: { children: React.ReactNode }) {
  // Always defaults to English as requested ("Le site sera uniquement en bilingue mais affichera toujours l'anglais")
  const [lang, setLang] = useState<Lang>("en");
  const [activeChapter, setActiveChapter] = useState<ChapterId>("about");
  const [direction, setDirection] = useState<number>(1);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  };

  const navigateChapter = (nextChapter: ChapterId) => {
    const currIdx = CHAPTER_ORDER.indexOf(activeChapter);
    const nextIdx = CHAPTER_ORDER.indexOf(nextChapter);
    setDirection(nextIdx >= currIdx ? 1 : -1);
    setActiveChapter(nextChapter);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <MangaContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        activeChapter,
        setActiveChapter,
        direction,
        navigateChapter,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}

export function useManga() {
  const ctx = useContext(MangaContext);
  if (!ctx) {
    throw new Error("useManga must be used within a MangaProvider");
  }
  return ctx;
}
