"use client";

import React, { createContext, useContext, useState } from "react";
import { Lang } from "@/lib/i18n";

export type ChapterId = "about" | "projects" | "experience" | "stack" | "contact";

interface MangaContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  activeChapter: ChapterId;
  setActiveChapter: (chapter: ChapterId) => void;
  direction: number;
  navigateChapter: (nextChapter: ChapterId) => void;
}

export const CHAPTER_ORDER: ChapterId[] = [
  "about",
  "projects",
  "experience",
  "stack",
  "contact",
];

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export function MangaProvider({ children }: { children: React.ReactNode }) {
  // Always defaults to English on initial load
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
