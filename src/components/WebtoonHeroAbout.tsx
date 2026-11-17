"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  Maximize2,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { pick, UI_COPY } from "@/lib/i18n";
import {
  EDUCATION_DATA,
  LANGUAGES_DATA,
  OFF_SCREEN_ITEMS,
  PROFILE_LINKS,
} from "@/lib/portfolio-data";

export function WebtoonHeroAbout() {
  const { lang, navigateChapter } = useManga();
  const copy = UI_COPY.about;
  const speeches = copy.dialogue;
  const [speechIdx, setSpeechIdx] = useState(0);
  const [zoomPanel, setZoomPanel] = useState<"education" | "sports" | null>(null);

  return (
    <section id="about" className="scroll-mt-20 space-y-6">
      {/* Episode Tag */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
          <span className="w-6 h-[2px] bg-hanko" />
          <span>EPISODE 01 · {lang === "en" ? "THE PROTAGONIST" : "LE PROTAGONISTE"}</span>
        </span>
        <span className="font-mono text-[11px] text-white/40 hidden sm:inline">
          VOL. 01 · PARIS
        </span>
      </div>

      {/* HERO COMIC SPLASH PANEL: Large Visual Intro + Pinned Physical Photo over Ink Art */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="manga-sheet manga-panel p-5 sm:p-8 relative overflow-hidden"
      >
        {/* Crisp Manga Action Artwork Layer behind Hero */}
        <img
          src="/images/manga/flip-action.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.09] mix-blend-multiply pointer-events-none select-none"
        />
        <span className="hidden sm:inline-block absolute top-3 right-5 font-display font-black text-2xl text-hanko/80 rotate-3 select-none pointer-events-none">
          DON!!
        </span>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: Real Physical Photo Pinned onto Manga Sheet */}
          <div className="md:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white p-2 pb-3 border-2 border-ink shadow-manga -rotate-2 max-w-[225px] w-full"
            >
              <div className="masking-tape w-14 h-4 -top-2 left-4 -rotate-12 absolute z-20" />
              <div className="masking-tape w-14 h-4 -top-2 right-4 rotate-12 absolute z-20" />
              <div className="aspect-[4/4.2] w-full bg-washi border border-ink overflow-hidden relative">
                <img
                  src="/images/avatar/joshua-photo.png"
                  alt="Joshua Nancey"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-hanko border border-ink text-white font-mono font-black text-[9px]">
                  01
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] font-bold text-ink">
                <span>{pick(copy.photoCaption, lang)}</span>
                <span className="text-hanko">UTC · IAD</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Crisp Name, Punchline & Single Interactive Speech Bubble */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-ink text-white font-mono text-[10px] font-bold tracking-widest mb-2">
                {lang === "en"
                  ? "AI, LLM SYSTEMS & ANDROID ENGINEER"
                  : "INGÉNIEUR IA, SYSTÈMES LLM & ANDROID"}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase leading-none">
                Joshua Nancey
              </h1>
              <p className="mt-2 font-display font-bold text-base sm:text-lg text-ink/90 leading-snug sm:pr-14">
                {pick(copy.headline, lang)}
              </p>
            </div>

            {/* Interactive Manga Dialogue Bubble */}
            <div
              onClick={() => setSpeechIdx((p) => (p + 1) % speeches.length)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && setSpeechIdx((p) => (p + 1) % speeches.length)
              }
              className="manga-bubble md:manga-bubble-left p-3.5 sm:p-4 cursor-pointer hover:bg-washi/60 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-hanko shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                  “{pick(speeches[speechIdx], lang)}”
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-ink/10 flex items-center justify-between font-mono text-[10px] font-bold text-hanko">
                <span>
                  {lang === "en"
                    ? `BUBBLE ${speechIdx + 1}/${speeches.length} · CLICK TO CYCLE`
                    : `BULLE ${speechIdx + 1}/${speeches.length} · CLIQUEZ POUR LIRE`}
                </span>
                <span>→</span>
              </div>
            </div>

            {/* Clean Action Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => navigateChapter("projects")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-black hover:bg-hanko-dark transition-colors"
              >
                <span>{lang === "en" ? "EXPLORE PROJECTS" : "VOIR LES PROJETS"}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <a
                href={PROFILE_LINKS.resumeEn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-ink text-white border-2 border-ink font-mono text-xs font-bold hover:bg-hanko transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-hanko" />
                <span>CV (EN)</span>
              </a>
              <a
                href={PROFILE_LINKS.resumeFr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-ink border-2 border-ink font-mono text-xs font-bold hover:bg-washi transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>CV (FR)</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VISUAL SECONDARY CASES: Compact Cards with Click-to-Zoom (Zero Text Bloat) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Case 1: Education Visual Card (Zoom for full UTC Mod'Math & CPGE syllabus) */}
        <button
          onClick={() => setZoomPanel("education")}
          className="md:col-span-5 text-left manga-sheet manga-panel manga-panel-interactive p-4 flex flex-col justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-8 bg-white border border-ink p-0.5 flex items-center justify-center shrink-0">
                <img
                  src="/images/logos/utc.jpg"
                  alt="UTC Compiègne"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="font-mono text-[9px] font-bold text-hanko uppercase">
                  {pick(copy.eduTitle, lang)}
                </div>
                <h2 className="font-display font-black text-base text-ink leading-tight">
                  UTC Compiègne · Label Mod&apos;Math
                </h2>
              </div>
            </div>
            <Maximize2 className="w-4 h-4 text-hanko shrink-0" />
          </div>

          <p className="text-xs text-slateink leading-snug">
            {lang === "en"
              ? "M.Eng. Computer Science (AI & Data Science + Mathematical Modeling) · CPGE PTSI/PT Lycée Raspail."
              : "Diplôme d'Ingénieur Informatique (IAD + Label Mod'Math) · CPGE PTSI/PT Lycée Raspail."}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-ink/15 font-mono text-[10px] font-bold text-ink">
            <span>2020 — 2026</span>
            <span className="text-hanko">
              {lang === "en" ? "CLICK TO ZOOM DETAILS +" : "CLIQUER POUR ZOOMER +"}
            </span>
          </div>
        </button>

        {/* Case 2: Sport & Solidarity Manga Panel (Full Illustrated Visual Banner + Zoom) */}
        <button
          onClick={() => setZoomPanel("sports")}
          className="md:col-span-7 text-left manga-sheet manga-panel manga-panel-interactive p-4 flex flex-col justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-hanko uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>{pick(copy.passionsTitle, lang)}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-ink">
              <span>{lang === "en" ? "HOBBY: SPORT" : "PASSION : SPORT"}</span>
              <Maximize2 className="w-3.5 h-3.5 text-hanko" />
            </div>
          </div>

          {/* Large Custom Sports Manga Illustration */}
          <div className="relative h-24 sm:h-28 w-full border border-ink overflow-hidden bg-white">
            <img
              src="/images/manga/sport-arena.jpg"
              alt="Wrestling & Boxing Manga Artwork"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-center justify-between text-white font-mono text-[10px] font-bold">
              <span>
                {lang === "en"
                  ? "WRESTLING · ENGLISH BOXING · SOLIDARITY"
                  : "LUTTE LIBRE · BOXE ANGLAISE · ÉPICERIE SOLIDAIRE"}
              </span>
              <span className="px-1.5 py-0.5 bg-hanko text-white font-black text-[9px]">
                + ZOOM
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] font-bold text-ink">
            <div className="flex flex-wrap items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-hanko" />
              {LANGUAGES_DATA.map((l) => (
                <span key={l.code} className="px-1.5 py-0.5 bg-washi border border-ink/30">
                  {l.code} · {pick(l.level, lang)}
                </span>
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Education Zoom Modal */}
      <MangaZoomModal
        open={zoomPanel === "education"}
        onClose={() => setZoomPanel(null)}
        eyebrow="TRAINING ARC · 2020 — 2026"
        title={pick(copy.eduTitle, lang)}
      >
        <div className="space-y-4">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="p-4 border-2 border-ink bg-washi/60 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {edu.logo ? (
                    <div className="w-12 h-9 bg-white border border-ink p-1 flex items-center justify-center shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.school.en}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-ink text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      PT
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-black text-base text-ink">
                      {pick(edu.school, lang)}
                    </h3>
                    <p className="text-xs font-bold text-hanko">{pick(edu.degree, lang)}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-white border border-ink font-mono text-[10px] font-bold shrink-0">
                  {edu.period}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink leading-relaxed">
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

      {/* Sports & Solidarity Zoom Modal */}
      <MangaZoomModal
        open={zoomPanel === "sports"}
        onClose={() => setZoomPanel(null)}
        eyebrow={pick(copy.passionsSubtitle, lang)}
        title={pick(copy.passionsTitle, lang)}
      >
        <div className="space-y-4">
          <div className="border-2 border-ink overflow-hidden bg-white">
            <img
              src="/images/manga/sport-arena.jpg"
              alt="Combat Sports Manga Art"
              className="w-full h-44 sm:h-52 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OFF_SCREEN_ITEMS.map((item) => {
              const IconComp =
                item.id === "wrestling"
                  ? Flame
                  : item.id === "boxing"
                  ? Shield
                  : Users;
              return (
                <div
                  key={item.id}
                  className="p-3.5 border-2 border-ink bg-white space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <IconComp className="w-4 h-4 text-hanko shrink-0" />
                    <h3 className="font-display font-black text-sm text-ink">
                      {pick(item.title, lang)}
                    </h3>
                  </div>
                  <div className="font-mono text-[9px] font-bold text-hanko">
                    {pick(item.role, lang)}
                  </div>
                  <p className="text-xs text-slateink leading-relaxed">
                    {pick(item.description, lang)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </MangaZoomModal>
    </section>
  );
}
