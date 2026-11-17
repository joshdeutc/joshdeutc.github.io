"use client";

import React, { useEffect } from "react";
import { MangaCanvasBg } from "@/components/MangaCanvasBg";
import { MangaLoader } from "@/components/MangaLoader";
import { MangaNavbar } from "@/components/MangaNavbar";
import { MangaFooter } from "@/components/MangaFooter";
import { WebtoonHeroAbout } from "@/components/WebtoonHeroAbout";
import { WebtoonProjects } from "@/components/WebtoonProjects";
import { WebtoonExperience } from "@/components/WebtoonExperience";
import { WebtoonStack } from "@/components/WebtoonStack";
import { WebtoonContact } from "@/components/WebtoonContact";
import { CHAPTER_ORDER, ChapterId, useManga } from "@/components/MangaContext";

export default function HomePage() {
  const { setActiveChapter } = useManga();

  // Live Scroll-Spy updating active chapter tab in top navbar while reading top-to-bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as ChapterId;
          if (CHAPTER_ORDER.includes(id)) {
            setActiveChapter(id);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    CHAPTER_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveChapter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C10] text-white relative">
      <MangaCanvasBg />
      <MangaLoader />
      <MangaNavbar />

      {/* Centered Vertical Webtoon Reading Strip over Continuous Interactive Dark Canvas */}
      <main className="relative z-10 flex-1 w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16">
        <WebtoonHeroAbout />

        {/* Vertical Webtoon Ink Gutter Divider */}
        <div
          className="my-12 sm:my-16 flex flex-col items-center gap-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-px h-10 bg-gradient-to-b from-transparent via-hanko/70 to-hanko" />
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/35">
            ///
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-hanko via-white/20 to-transparent" />
        </div>

        <WebtoonProjects />

        <div
          className="my-12 sm:my-16 flex flex-col items-center gap-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-px h-10 bg-gradient-to-b from-transparent via-hanko/70 to-hanko" />
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/35">
            ///
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-hanko via-white/20 to-transparent" />
        </div>

        <WebtoonExperience />

        <div
          className="my-12 sm:my-16 flex flex-col items-center gap-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-px h-10 bg-gradient-to-b from-transparent via-hanko/70 to-hanko" />
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/35">
            ///
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-hanko via-white/20 to-transparent" />
        </div>

        <WebtoonStack />

        <div
          className="my-12 sm:my-16 flex flex-col items-center gap-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-px h-10 bg-gradient-to-b from-transparent via-hanko/70 to-hanko" />
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/35">
            FIN
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-hanko via-white/20 to-transparent" />
        </div>

        <WebtoonContact />
      </main>

      <MangaFooter />
    </div>
  );
}
