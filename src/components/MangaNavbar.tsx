"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChapterId, useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";

export function MangaNavbar() {
  const { lang, toggleLang, activeChapter, navigateChapter } = useManga();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const chapters = UI_COPY.nav.chapters;

  return (
    <header className="sticky top-0 z-40 unified-manga-bg border-b-[2.5px] border-ink shrink-0">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="h-12 sm:h-14 flex items-center justify-between gap-3">
          {/* Volume Title Left */}
          <Link
            href="/"
            onClick={() => isHome && navigateChapter("about")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 bg-hanko border-2 border-ink shadow-manga-sm flex items-center justify-center font-jp font-black text-white text-lg group-hover:-rotate-6 transition-transform">
              創
            </div>
            <div className="leading-tight">
              <div className="font-display font-black text-base sm:text-lg tracking-tight text-ink uppercase">
                Joshua Nancey
              </div>
              <div className="font-mono text-[10px] tracking-widest text-slateink hidden xl:block">
                {pick(UI_COPY.nav.brandSub, lang)}
              </div>
            </div>
          </Link>

          {/* Top Menu: 5 Chapter Tabs (ABOUT, PROJECTS, EXPERIENCE, STACK, CONTACT) */}
          {isHome ? (
            <nav
              aria-label="Manga Chapters"
              className="hidden md:flex items-center gap-1 bg-washi border-2 border-ink p-1 shadow-manga-sm"
            >
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => navigateChapter(ch.id as ChapterId)}
                    className={`relative px-3 lg:px-4 py-1.5 font-mono text-xs font-bold tracking-wider transition-colors flex items-center gap-1.5 ${
                      isActive ? "text-white" : "text-ink hover:bg-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeChapterPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-ink z-0"
                      />
                    )}
                    <span className="relative z-10 text-hanko font-black">
                      {isActive ? ch.kanji : ch.num}
                    </span>
                    <span className="relative z-10">{lang === "en" ? ch.en : ch.fr}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 bg-ink text-white font-mono text-xs font-bold border-2 border-ink hover:bg-hanko transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "← OPEN MANGA BOOK" : "← OUVRIR LE MANGA"}</span>
            </Link>
          )}

          {/* Language Switch EN / FR Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="px-3 py-1.5 bg-washi border-2 border-ink font-mono text-xs font-bold shadow-manga-sm hover:bg-ink hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className={lang === "en" ? "text-hanko font-black" : "opacity-50"}>
                EN
              </span>
              <span className="opacity-40">/</span>
              <span className={lang === "fr" ? "text-hanko font-black" : "opacity-50"}>
                FR
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Chapter Bar (Clean horizontal strip) */}
        {isHome && (
          <nav
            aria-label="Mobile Chapters"
            className="flex md:hidden items-center gap-1.5 pb-2.5 overflow-x-auto"
          >
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => navigateChapter(ch.id as ChapterId)}
                  className={`shrink-0 px-2.5 py-1.5 font-mono text-[10px] font-bold border-2 border-ink transition-colors ${
                    isActive
                      ? "bg-ink text-white shadow-manga-sm"
                      : "bg-washi text-ink"
                  }`}
                >
                  <span className={isActive ? "text-hanko" : "text-slateink"}>
                    {ch.num}.{" "}
                  </span>
                  {lang === "en" ? ch.en : ch.fr}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
