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
  navigateChapter: (nextChapter: ChapterId) => void;
  coverMode: "auto-opening" | "manual-closed" | "open";
  setCoverMode: (mode: "auto-opening" | "manual-closed" | "open") => void;
  closeToCover: () => void;
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
  const [coverMode, setCoverMode] = useState<"auto-opening" | "manual-closed" | "open">(
    "auto-opening"
  );

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  };

  const navigateChapter = (nextChapter: ChapterId) => {
    setActiveChapter(nextChapter);
    if (typeof document !== "undefined") {
      const target = document.getElementById(nextChapter);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const closeToCover = () => {
    setCoverMode("manual-closed");
  };

  return (
    <MangaContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        activeChapter,
        setActiveChapter,
        navigateChapter,
        coverMode,
        setCoverMode,
        closeToCover,
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
