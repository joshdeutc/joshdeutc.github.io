"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ChapterId, useManga } from "./MangaContext";
import { UI_COPY } from "@/lib/i18n";

export function MangaNavbar() {
  const { lang, toggleLang, activeChapter, navigateChapter, closeToCover } = useManga();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const chapters = UI_COPY.nav.chapters;

  return (
    /* Transparent floating top menu directly over the unified dark canvas — ZERO black dividing line or opaque bar */
    <header className="relative z-40 shrink-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="h-12 sm:h-14 flex items-center justify-between gap-4">
          {/* Minimal Typographic Identity Left (inspired by Aahana Surya floating nav) */}
          <Link
            href="/"
            onClick={() => isHome && navigateChapter("about")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-hanko group-hover:scale-125 transition-transform" />
            <span className="font-mono font-bold text-xs sm:text-sm tracking-[0.22em] text-white uppercase">
              JOSHUA NANCEY
            </span>
          </Link>

          {/* Top Navigation Links: Floating transparent links with sleek active underline */}
          {isHome ? (
            <nav
              aria-label="Manga Chapters"
              className="hidden md:flex items-center gap-6 lg:gap-8"
            >
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => navigateChapter(ch.id as ChapterId)}
                    className={`relative py-1.5 font-mono text-[11px] lg:text-xs font-bold tracking-[0.18em] uppercase transition-colors ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span>{lang === "en" ? ch.en : ch.fr}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-hanko"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          ) : (
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-white/80 hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-hanko" />
              <span>{lang === "en" ? "← BACK TO MANGA" : "← RETOUR AU MANGA"}</span>
            </Link>
          )}

          {/* Cover Replay + Language Switch EN | FR Right */}
          <div className="flex items-center gap-2 shrink-0">
            {isHome && (
              <button
                onClick={closeToCover}
                title={lang === "en" ? "Close to Volume Cover" : "Fermer vers la Couverture"}
                className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white/75 hover:text-white border border-white/20 rounded-sm hover:border-hanko transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3 h-3 text-hanko" />
                <span className="hidden sm:inline">
                  {lang === "en" ? "COVER" : "TOME 01"}
                </span>
              </button>
            )}

            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest text-white/80 hover:text-white border border-white/25 rounded-sm hover:border-hanko transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span className={lang === "en" ? "text-hanko font-black" : "opacity-50"}>
                EN
              </span>
              <span className="opacity-30">/</span>
              <span className={lang === "fr" ? "text-hanko font-black" : "opacity-50"}>
                FR
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Chapter Bar */}
        {isHome && (
          <nav
            aria-label="Mobile Chapters"
            className="flex md:hidden items-center justify-between gap-2 pb-2 overflow-x-auto"
          >
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => navigateChapter(ch.id as ChapterId)}
                  className={`shrink-0 px-2 py-1 font-mono text-[10px] font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-white border-b-2 border-hanko"
                      : "text-white/55"
                  }`}
                >
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
