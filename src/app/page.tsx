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
import { WebtoonStoryBeat } from "@/components/WebtoonStoryBeat";
import { CHAPTER_ORDER, ChapterId, useManga } from "@/components/MangaContext";

export default function HomePage() {
  const { setActiveChapter } = useManga();

  // Live Scroll-Spy updating active chapter tab in fixed top navbar
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
    <div className="min-h-screen flex flex-col bg-[#0B0C10] text-white relative">
      <MangaCanvasBg />
      <MangaLoader />
      <MangaNavbar />

      {/* Padded cleanly for fixed top bar; vertical Webtoon strip with dynamic story adventure beats */}
      <main className="relative z-10 flex-1 w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-20 sm:pt-20 pb-14">
        <WebtoonHeroAbout />

        <WebtoonStoryBeat
          sceneTag="SCENE 01"
          narrator={{
            en: "FROM MATHEMATICAL PROOFS TO SHIPPED SYSTEMS",
            fr: "DES PREUVES MATHÉMATIQUES AUX SYSTÈMES DÉPLOYÉS",
          }}
          dialogue={{
            en: "Mathematical training complete at UTC. Now entering the forge where research theorems meet Android OS & real clinical wards.",
            fr: "Formation mathématique accomplie à l'UTC. Place au terrain : là où théorèmes, noyau Android et hôpitaux réels s'affrontent.",
          }}
          sfx="SHING!!"
          artSrc="/images/manga/ai-guardian.jpg"
          align="left"
        />

        <WebtoonProjects />

        <WebtoonStoryBeat
          sceneTag="SCENE 02"
          narrator={{
            en: "FIELD MISSIONS ACROSS PRODUCTION & R&D",
            fr: "MISSIONS DE TERRAIN EN PRODUCTION & R&D",
          }}
          dialogue={{
            en: "Prototypes aren't enough — every deployment forged stronger engineering instincts across French clinics, fintech & consulting teams.",
            fr: "Un prototype ne suffit pas : chaque mission a forgé la rigueur de mise en production, du terrain médical aux architectures distribuées.",
          }}
          sfx="WHOOSH!!"
          artSrc="/images/manga/flip-verso.jpg"
          align="right"
        />

        <WebtoonExperience />

        <WebtoonStoryBeat
          sceneTag="SCENE 03"
          narrator={{
            en: "OPENING THE FULL ENGINEERING ARSENAL",
            fr: "OUVERTURE DE L'ARSENAL TECHNIQUE",
          }}
          dialogue={{
            en: "Behind every metric lies the exact tooling chosen for the job — zero bloat, every stack battle-tested.",
            fr: "Derrière chaque métrique se cache l'outil exact éprouvé sur le terrain : zéro gadget, uniquement du concret.",
          }}
          sfx="CLANK!!"
          artSrc="/images/manga/flip-action.jpg"
          align="left"
        />

        <WebtoonStack />

        <WebtoonStoryBeat
          sceneTag="FINAL BEAT"
          narrator={{
            en: "READY FOR THE NEXT QUEST",
            fr: "PRÊT POUR LA PROCHAINE QUÊTE",
          }}
          dialogue={{
            en: "Need someone who bridges rigorous math, grounded AI, and rugged systems engineering? Let's build.",
            fr: "Besoin d'un ingénieur qui relie mathématiques rigoureuses, IA vérifiable et systèmes robustes ? Passons à l'action.",
          }}
          sfx="DON!!"
          artSrc="/images/manga/cover-hero.jpg"
          align="right"
        />

        <WebtoonContact />
      </main>

      <MangaFooter />
    </div>
  );
}
