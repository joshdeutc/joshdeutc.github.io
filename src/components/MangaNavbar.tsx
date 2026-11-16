"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, BookOpen } from "lucide-react";
import { ChapterId, useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function MangaNavbar() {
  const { lang, toggleLang, activeChapter, navigateChapter } = useManga();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const chapters = UI_COPY.nav.chapters;
  const activeIndex = chapters.findIndex((c) => c.id === activeChapter);
  const progressPct = isHome ? ((activeIndex + 1) / chapters.length) * 100 : 100;

  return (
    <header className="sticky top-0 z-50 bg-washi/95 backdrop-blur-md border-b-[3px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Manga Title / Cover Stamp */}
          <Link
            href="/"
            onClick={() => isHome && navigateChapter("about")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 bg-hanko border-2 border-ink shadow-manga-sm flex items-center justify-center font-jp font-black text-white text-lg group-hover:-rotate-6 transition-transform">
              創
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base sm:text-lg tracking-tight text-ink uppercase">
                Joshua Nancey
              </div>
              <div className="font-mono text-[10px] tracking-widest text-slateink hidden sm:block">
                {pick(UI_COPY.nav.brandSub, lang)}
              </div>
            </div>
          </Link>

          {/* 4 Manga Chapter Tabs */}
          {isHome ? (
            <nav
              aria-label="Manga Chapters"
              className="hidden md:flex items-center gap-1.5 bg-paper border-2 border-ink p-1 shadow-manga-sm"
            >
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => navigateChapter(ch.id as ChapterId)}
                    className={`relative px-3.5 py-1.5 font-mono text-xs font-bold tracking-wider transition-colors flex items-center gap-1.5 ${
                      isActive ? "text-white" : "text-ink hover:bg-washi"
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
                      {isActive ? ch.kanji : `${ch.num}`}
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
              <span>{lang === "en" ? "← BACK TO PORTFOLIO" : "← RETOUR AU PORTFOLIO"}</span>
            </Link>
          )}

          {/* Right Controls: EN|FR Switch + Malt + Privacy */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="px-2.5 py-1.5 bg-paper border-2 border-ink font-mono text-xs font-bold shadow-manga-sm hover:bg-ink hover:text-white transition-colors flex items-center gap-1"
            >
              <span className={lang === "en" ? "text-hanko font-black" : "opacity-50"}>EN</span>
              <span className="opacity-40">/</span>
              <span className={lang === "fr" ? "text-hanko font-black" : "opacity-50"}>FR</span>
            </button>

            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-hanko-dark transition-colors"
            >
              <span>{pick(UI_COPY.nav.hireMalt, lang)}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/privacy"
              title={pick(UI_COPY.nav.privacyLink, lang)}
              className={`p-1.5 border-2 border-ink shadow-manga-sm transition-colors ${
                pathname === "/privacy"
                  ? "bg-ink text-white"
                  : "bg-paper text-ink hover:bg-washi"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Chapter Switcher */}
        {isHome && (
          <nav
            aria-label="Mobile Chapters"
            className="flex md:hidden items-center justify-between gap-1 pb-2.5 overflow-x-auto"
          >
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => navigateChapter(ch.id as ChapterId)}
                  className={`flex-1 min-w-[78px] px-2 py-1.5 font-mono text-[10px] font-bold border-2 border-ink text-center transition-colors ${
                    isActive
                      ? "bg-ink text-white shadow-manga-sm"
                      : "bg-paper text-ink"
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

      {/* Volume Reading Progress Bar */}
      <div className="h-[3px] w-full bg-ink/10">
        <motion.div
          className="h-full bg-hanko"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </header>
  );
}
