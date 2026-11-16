"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Award,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import {
  EDUCATION_DATA,
  LANGUAGES_DATA,
  OFF_SCREEN_ITEMS,
  PROFILE_LINKS,
} from "@/lib/portfolio-data";

export function ChapterAbout() {
  const { lang, navigateChapter } = useManga();
  const [speechIdx, setSpeechIdx] = useState(0);
  const copy = UI_COPY.about;

  const speeches = copy.dialogue;
  const cycleSpeech = () => {
    setSpeechIdx((prev) => (prev + 1) % speeches.length);
  };

  return (
    <section className="space-y-6">
      {/* Chapter Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <span className="inline-block px-2.5 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest mb-2">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink uppercase leading-[0.95]">
            Joshua Nancey
          </h1>
          <p className="font-mono text-xs sm:text-sm text-slateink mt-2 font-bold">
            {lang === "en"
              ? "M.ENG. UTC COMPIÈGNE (IAD & MOD'MATH) · AI, LLM SYSTEMS & ANDROID ENGINEER · PARIS, FR"
              : "INGÉNIEUR UTC COMPIÈGNE (IAD & MOD'MATH) · IA, SYSTÈMES LLM & ANDROID · PARIS"}
          </p>
        </div>
        <HankoStamp kanji="主" size="lg" />
      </div>

      {/* Main Manga Panel Grid: Dialogue Left + Physical Photo Pinned Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Panel (7 cols) */}
        <div className="lg:col-span-7 manga-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden speedlines-bg">
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 border-2 border-ink bg-washi">
                SCENE 01 // INTRO
              </span>
              <span className="font-display font-black text-xl text-hanko/80 tracking-wider -rotate-3 select-none">
                DON!!
              </span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight">
              {pick(copy.headline, lang)}
            </h2>

            {/* Interactive Speech Bubble */}
            <div
              onClick={cycleSpeech}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && cycleSpeech()}
              className="speech-bubble p-4 sm:p-5 cursor-pointer group hover:bg-washi/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
                  “{pick(speeches[speechIdx], lang)}”
                </p>
                <MessageSquare className="w-4 h-4 text-hanko shrink-0 mt-1" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slateink">
                <span className="font-bold text-hanko">
                  {lang === "en"
                    ? `PANEL LINE ${speechIdx + 1}/${speeches.length} — CLICK TO READ NEXT`
                    : `RÉPLIQUE ${speechIdx + 1}/${speeches.length} — CLIQUEZ POUR LA SUITE`}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-5 border-t-2 border-ink/15 flex flex-wrap gap-3 relative z-10">
            <button
              onClick={() => navigateChapter("projects")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:-translate-y-0.5 hover:bg-hanko-dark transition-all"
            >
              <span>{pick(copy.ctaQuests, lang)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:-translate-y-0.5 transition-all"
            >
              <span>{pick(copy.ctaMalt, lang)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={PROFILE_LINKS.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-paper text-ink border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-washi transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-hanko" />
              <span>{pick(copy.ctaResumeEn, lang)}</span>
            </a>

            <a
              href={PROFILE_LINKS.resumeFr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-paper text-ink border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-washi transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{pick(copy.ctaResumeFr, lang)}</span>
            </a>
          </div>
        </div>

        {/* Right Portrait Panel (5 cols) — Real Photo physically pinned onto manga page */}
        <div className="lg:col-span-5 manga-panel p-6 sm:p-8 halftone-subtle flex flex-col items-center justify-center relative">
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold">
            FIG. 01 // PROTAGONIST
          </div>

          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative bg-white p-3.5 pb-5 border-[2.5px] border-ink shadow-manga-lg -rotate-2 max-w-[290px] w-full mt-4"
          >
            {/* Washi Masking Tapes holding the real photo onto the manga page */}
            <div className="masking-tape w-20 h-6 -top-3 left-6 -rotate-12 absolute z-20" />
            <div className="masking-tape w-20 h-6 -top-3 right-6 rotate-12 absolute z-20" />

            <div className="aspect-[4/4.3] w-full bg-washi border-2 border-ink overflow-hidden flex items-end justify-center relative">
              {/* Real unmodified portrait photo pinned inside manga frame */}
              <img
                src="/images/avatar/joshua-photo.png"
                alt="Joshua Nancey"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-hanko border-2 border-ink text-white font-jp font-black text-xs flex items-center justify-center shadow-sm">
                済
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[11px] font-bold text-ink">
              <span>{pick(copy.photoCaption, lang)}</span>
              <span className="text-hanko">UTC · GI IAD</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Panels: Education + Sports & Engagements (NO GAUGES!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Education Panel (7 cols) */}
        <div className="lg:col-span-7 manga-panel p-6 space-y-5">
          <div className="flex items-center justify-between border-b-2 border-ink pb-3">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-hanko" />
              <h3 className="font-display font-black text-lg tracking-wide uppercase">
                {pick(copy.eduTitle, lang)}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-slateink">2020 — 2026</span>
          </div>

          <div className="space-y-5">
            {EDUCATION_DATA.map((edu) => (
              <div
                key={edu.id}
                className="p-4 border-2 border-ink bg-washi/60 space-y-2.5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {edu.logo ? (
                      <div className="w-16 h-10 bg-white border-2 border-ink p-1 flex items-center justify-center shrink-0">
                        <img
                          src={edu.logo}
                          alt={edu.school.en}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-ink text-white border-2 border-ink flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        PT
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-bold text-base text-ink">
                        {pick(edu.school, lang)}
                      </h4>
                      <p className="text-xs font-semibold text-hanko">
                        {pick(edu.degree, lang)}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-paper border border-ink font-mono text-[11px] font-bold shrink-0">
                    {edu.period}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-slateink leading-relaxed">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-hanko font-black mt-0.5">▸</span>
                      <span>{pick(h, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sports, Engagements & Languages Panel (5 cols) — NO GAUGES */}
        <div className="lg:col-span-5 manga-panel p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b-2 border-ink pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-hanko" />
                <h3 className="font-display font-black text-lg tracking-wide uppercase">
                  {pick(copy.passionsTitle, lang)}
                </h3>
              </div>
              <p className="text-xs text-slateink mt-1">
                {pick(copy.passionsSubtitle, lang)}
              </p>
            </div>

            <div className="space-y-3">
              {OFF_SCREEN_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 border-2 border-ink bg-paper shadow-manga-sm hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 font-display font-bold text-base text-ink">
                      <span className="text-lg">{item.icon}</span>
                      <span>{pick(item.title, lang)}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-washi border border-ink font-mono text-[10px] font-bold text-hanko">
                      {pick(item.role, lang)}
                    </span>
                  </div>
                  <p className="text-xs text-slateink leading-relaxed">
                    {pick(item.description, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages as clean manga tags (no progress bars) */}
          <div className="pt-4 border-t-2 border-ink">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-hanko" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                {pick(copy.langsTitle, lang)}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {LANGUAGES_DATA.map((l) => (
                <div
                  key={l.code}
                  className="flex items-center justify-between px-3 py-2 border-2 border-ink bg-washi/60 text-xs font-mono"
                >
                  <span className="font-bold text-ink">
                    [{l.code}] {pick(l.name, lang)}
                  </span>
                  <span className="text-slateink font-semibold">
                    {pick(l.level, lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
