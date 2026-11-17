"use client";

import React, { useEffect } from "react";
import { MangaNavbar } from "@/components/MangaNavbar";
import { MangaFooter } from "@/components/MangaFooter";
import { EditorialAbout } from "@/components/EditorialAbout";
import { EditorialProjects } from "@/components/EditorialProjects";
import { EditorialExperience } from "@/components/EditorialExperience";
import { EditorialStack } from "@/components/EditorialStack";
import { EditorialContact } from "@/components/EditorialContact";
import { CHAPTER_ORDER, ChapterId, useManga } from "@/components/MangaContext";

export default function HomePage() {
  const { setActiveChapter } = useManga();

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
        rootMargin: "-20% 0px -45% 0px",
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
    <div className="min-h-screen flex flex-col bg-washi text-ink">
      <MangaNavbar />

      <main className="flex-1 w-full max-w-[1160px] mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-16 space-y-16 sm:space-y-24">
        <EditorialAbout />
        <EditorialProjects />
        <EditorialExperience />
        <EditorialStack />
        <EditorialContact />
      </main>

      <MangaFooter />
    </div>
  );
}
