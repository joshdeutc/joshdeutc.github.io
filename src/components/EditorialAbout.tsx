"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, FileText, GraduationCap, Plus } from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { pick, UI_COPY } from "@/lib/i18n";
import {
  EDUCATION_DATA,
  LANGUAGES_DATA,
  OFF_SCREEN_ITEMS,
  PROFILE_LINKS,
} from "@/lib/portfolio-data";

export function EditorialAbout() {
  const { lang, navigateChapter } = useManga();
  const copy = UI_COPY.about;
  const [eduModalOpen, setEduModalOpen] = useState(false);

  return (
    <section id="about" className="scroll-mt-20 space-y-16 sm:space-y-20">
      {/* 50 / 50 ASYMMETRIC EDITORIAL HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
        {/* Left: Crisp Value Proposition readable in 3 seconds */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.16em] text-slateink uppercase">
            <span className="font-jp font-bold text-hanko text-sm shrink-0 whitespace-nowrap">
              序章
            </span>
            <span className="shrink-0">/</span>
            <span>
              {lang === "en"
                ? "AI, LLM Systems & Android OS Engineer · Paris"
                : "Ingénieur IA, Systèmes LLM & Android OS · Paris"}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[64px] tracking-tight text-ink leading-[0.98] uppercase">
              Joshua Nancey
            </h1>
            <p className="text-base sm:text-xl text-ink/85 leading-relaxed max-w-2xl font-normal">
              {pick(copy.headline, lang)}{" "}
              <span className="text-slateink">{pick(copy.dialogue[0], lang)}</span>
            </p>
          </div>

          {/* 3 Clean Anchor Proof Columns separated by hairlines */}
          <div className="border-t border-ink/15 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-mono text-[11px] font-bold text-hanko uppercase tracking-wider">
                {lang === "en" ? "Education" : "Formation"}
              </div>
              <div className="font-semibold text-ink mt-0.5">
                UTC Compiègne · IAD &amp; Mod&apos;Math
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold text-hanko uppercase tracking-wider">
                {lang === "en" ? "Track Record" : "Terrain R&D"}
              </div>
              <div className="font-semibold text-ink mt-0.5">
                Epiconcept · Aubay · CNRS
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold text-hanko uppercase tracking-wider">
                {lang === "en" ? "Publisher" : "Éditeur"}
              </div>
              <div className="font-semibold text-ink mt-0.5">
                Custos OS v1.4 · Malt Freelance
              </div>
            </div>
          </div>

          {/* Primary Actions (clean typography, zero clutter) */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => navigateChapter("projects")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-hanko text-paper font-mono text-xs font-bold tracking-wider uppercase hover:bg-hanko-dark transition-colors"
            >
              <span>
                {lang === "en" ? "Explore Case Studies" : "Voir les Études de Cas"}
              </span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-ink text-ink font-mono text-xs font-bold tracking-wider uppercase hover:bg-ink hover:text-paper transition-colors"
            >
              <span>{lang === "en" ? "Hire on Malt" : "Mission via Malt"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-hanko" />
            </a>

            <div className="flex items-center gap-3 ml-1 font-mono text-xs font-semibold text-slateink">
              <a
                href={PROFILE_LINKS.resumeEn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-ink underline underline-offset-4"
              >
                <FileText className="w-3.5 h-3.5 text-hanko" />
                <span>CV EN</span>
              </a>
              <span className="text-ink/25">/</span>
              <a
                href={PROFILE_LINKS.resumeFr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-ink underline underline-offset-4"
              >
                <span>CV FR</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Bespoke Manga Ink Artwork melted natively onto Washi + Clean Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[400px] aspect-[3/3.6]">
            <img
              src="/images/manga/cover-hero.jpg"
              alt="AI & Differential Geometry Manga Ink Artwork"
              className="w-full h-full object-contain ink-blend select-none"
            />

            {/* Clean Architectural Human Portrait Cartouche bottom-left */}
            <div className="absolute bottom-3 -left-2 sm:-left-5 bg-paper border border-ink/25 p-1.5 shadow-xl w-28 sm:w-32">
              <div className="aspect-square overflow-hidden bg-washi-alt">
                <img
                  src="/images/avatar/joshua-photo.png"
                  alt="Joshua Nancey"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] font-semibold text-ink px-0.5">
                <span>PARIS</span>
                <span className="text-hanko font-jp font-bold">本人</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EDITORIAL EDUCATION & LANGUAGES ROW */}
      <div className="border-t border-ink/15 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-hanko font-bold uppercase">
            <span className="font-jp">学歴</span>
            <span>/</span>
            <span>{lang === "en" ? "Background & Languages" : "Formation & Langues"}</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight">
            {pick(copy.eduTitle, lang)}
          </h2>

          <div className="space-y-1.5 pt-2">
            {LANGUAGES_DATA.map((l) => (
              <div
                key={l.code}
                className="flex items-center justify-between py-1.5 border-b border-ink/10 text-xs sm:text-sm"
              >
                <span className="font-semibold text-ink">
                  <span className="font-mono text-xs text-hanko mr-2">[{l.code}]</span>
                  {pick(l.name, lang)}
                </span>
                <span className="font-mono text-xs text-slateink">{pick(l.level, lang)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="p-5 border border-ink/15 bg-paper/70 space-y-2.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {edu.logo ? (
                    <div className="w-12 h-9 bg-white border border-ink/15 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.school.en}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-ink text-paper font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      PT
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink leading-snug">
                      {pick(edu.school, lang)}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-hanko">
                      {pick(edu.degree, lang)}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-slateink shrink-0">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slateink leading-relaxed">
                {pick(edu.highlights[0], lang)}
              </p>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={() => setEduModalOpen(true)}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ink hover:text-hanko transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-hanko" />
              <span>
                {lang === "en"
                  ? "Inspect full UTC & Mod'Math syllabus"
                  : "Consulter le programme UTC & Mod'Math complet"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* FULL-DIGNITY OFF-SCREEN SPORT & SOLIDARITY ILLUSTRATION */}
      <div className="border-t border-ink/15 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left: Full Uncropped High-Resolution Ink Illustration blended natively on Washi */}
        <div className="lg:col-span-6">
          <img
            src="/images/manga/sport-arena.jpg"
            alt="Boxing gloves and wrestling martial grip ink illustration"
            className="w-full aspect-[16/9] object-contain ink-blend select-none"
          />
        </div>

        {/* Right: Clean Editorial Narrative */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-hanko font-bold uppercase mb-1">
              <span className="font-jp">武道</span>
              <span>/</span>
              <span>{lang === "en" ? "Off-Screen Discipline" : "Hors Écran"}</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              {pick(copy.passionsTitle, lang)}
            </h2>
            <p className="text-xs sm:text-sm text-slateink mt-1">
              {pick(copy.passionsSubtitle, lang)}
            </p>
          </div>

          <div className="space-y-3">
            {OFF_SCREEN_ITEMS.map((item) => (
              <div
                key={item.id}
                className="border-l-2 border-hanko/70 pl-4 py-0.5 space-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-bold text-sm sm:text-base text-ink">
                    {pick(item.title, lang)}
                  </h3>
                  <span className="font-mono text-[11px] font-semibold text-slateink uppercase">
                    {pick(item.role, lang)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slateink leading-relaxed">
                  {pick(item.description, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Syllabus Modal */}
      <MangaZoomModal
        open={eduModalOpen}
        onClose={() => setEduModalOpen(false)}
        eyebrow="2020 — 2026 · ACADEMIC CURRICULUM"
        title={pick(copy.eduTitle, lang)}
      >
        <div className="space-y-4">
          {EDUCATION_DATA.map((edu) => (
            <div key={edu.id} className="p-4 border border-ink/15 bg-washi/60 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-base text-ink">
                    {pick(edu.school, lang)}
                  </h3>
                  <p className="text-xs font-semibold text-hanko">{pick(edu.degree, lang)}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-slateink shrink-0">
                  {edu.period}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-ink leading-relaxed">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-hanko shrink-0 mt-0.5" />
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MangaZoomModal>
    </section>
  );
}
