"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ChapterId, useManga } from "./MangaContext";
import { UI_COPY } from "@/lib/i18n";

export function MangaNavbar() {
  const { lang, toggleLang, activeChapter, navigateChapter } = useManga();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const chapters = UI_COPY.nav.chapters;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-washi/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <div className="h-14 flex items-center justify-between gap-4">
          {/* Editorial Wordmark */}
          <Link
            href="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                navigateChapter("about");
              }
            }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span className="w-2.5 h-2.5 bg-hanko group-hover:rotate-45 transition-transform" />
            <span className="font-mono font-bold text-xs sm:text-sm tracking-[0.2em] text-ink uppercase">
              JOSHUA NANCEY
            </span>
          </Link>

          {/* Primary Smooth Scroll Chapter Nav */}
          {isHome ? (
            <nav
              aria-label="Sections"
              className="hidden md:flex items-center gap-7 lg:gap-9"
            >
              {chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => navigateChapter(ch.id as ChapterId)}
                    className={`relative py-1.5 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                      isActive ? "text-ink font-bold" : "text-slateink hover:text-ink"
                    }`}
                  >
                    <span>{lang === "en" ? ch.en : ch.fr}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeEditorialUnderline"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
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
              className="hidden md:inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-ink hover:text-hanko transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-hanko" />
              <span>{lang === "en" ? "BACK TO PORTFOLIO" : "RETOUR AU PORTFOLIO"}</span>
            </Link>
          )}

          {/* Language Switch */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-ink border border-ink/25 hover:border-hanko transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span className={lang === "en" ? "text-hanko" : "text-slateink/60"}>EN</span>
            <span className="text-ink/25">/</span>
            <span className={lang === "fr" ? "text-hanko" : "text-slateink/60"}>FR</span>
          </button>
        </div>

        {/* Mobile Compact Chapter Bar */}
        {isHome && (
          <nav
            aria-label="Mobile Sections"
            className="flex md:hidden items-center justify-between gap-1 pb-2"
          >
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => navigateChapter(ch.id as ChapterId)}
                  className={`shrink-0 px-1 py-1 font-mono text-[10px] font-semibold tracking-normal uppercase transition-colors ${
                    isActive
                      ? "text-ink border-b-2 border-hanko font-bold"
                      : "text-slateink/70"
                  }`}
                >
                  {lang === "en" ? ch.en : ch.fr}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Subtle Scroll Reading Progress Bar */}
      {isHome && (
        <motion.div
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="h-[2px] w-full bg-hanko"
        />
      )}
    </header>
  );
}
