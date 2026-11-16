"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MangaNavbar } from "@/components/MangaNavbar";
import { MangaFooter } from "@/components/MangaFooter";
import { ChapterAbout } from "@/components/ChapterAbout";
import { ChapterProjects } from "@/components/ChapterProjects";
import { ChapterExperience } from "@/components/ChapterExperience";
import { ChapterStack } from "@/components/ChapterStack";
import { ChapterId, useManga } from "@/components/MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";

const ORDER: ChapterId[] = ["about", "projects", "experience", "stack"];

export default function HomePage() {
  const { activeChapter, direction, navigateChapter, lang } = useManga();
  const currentIdx = ORDER.indexOf(activeChapter);
  const prevChapter = currentIdx > 0 ? ORDER[currentIdx - 1] : null;
  const nextChapter = currentIdx < ORDER.length - 1 ? ORDER[currentIdx + 1] : null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "ArrowRight" && nextChapter) {
        navigateChapter(nextChapter);
      } else if (e.key === "ArrowLeft" && prevChapter) {
        navigateChapter(prevChapter);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prevChapter, nextChapter, navigateChapter]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 48 : -48,
      opacity: 0,
      rotateY: dir > 0 ? 4 : -4,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -48 : 48,
      opacity: 0,
      rotateY: dir > 0 ? -4 : 4,
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MangaNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeChapter}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeChapter === "about" && <ChapterAbout />}
            {activeChapter === "projects" && <ChapterProjects />}
            {activeChapter === "experience" && <ChapterExperience />}
            {activeChapter === "stack" && <ChapterStack />}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Chapter Pagination (Manga Page-Turn Controls) */}
        <div className="mt-10 pt-6 border-t-[2.5px] border-ink flex flex-wrap items-center justify-between gap-4">
          {prevChapter ? (
            <button
              onClick={() => navigateChapter(prevChapter)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-paper border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-ink hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-hanko" />
              <span>
                {pick(UI_COPY.nav.prevChapter, lang)}: CH.0{ORDER.indexOf(prevChapter) + 1}
              </span>
            </button>
          ) : (
            <div className="font-mono text-xs font-bold text-slateink">
              PAGE 01 / 04 · COVER
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] font-bold text-slateink">
            <span>{lang === "en" ? "TIP: USE ← / → KEYS" : "ASTUCE : FLÈCHES ← / →"}</span>
          </div>

          {nextChapter ? (
            <button
              onClick={() => navigateChapter(nextChapter)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-hanko-dark transition-colors ml-auto"
            >
              <span>
                {pick(UI_COPY.nav.nextChapter, lang)}: CH.0{ORDER.indexOf(nextChapter) + 1}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateChapter("about")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-hanko transition-colors ml-auto"
            >
              <span>{lang === "en" ? "BACK TO CH.01" : "RETOUR AU CH.01"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>

      <MangaFooter />
    </div>
  );
}
