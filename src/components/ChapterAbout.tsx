"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, GraduationCap, Award, Globe, MessageSquare, Sparkles } from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import {
  EDUCATION_DATA,
  LANGUAGES_DATA,
  OFF_SCREEN_ITEMS,
  PROFILE_LINKS,
} from "@/lib/portfolio-data";

export function useAboutSpread() {
  const { lang } = useManga();
  const [speechIdx, setSpeechIdx] = useState(0);
  const copy = UI_COPY.about;
  const speeches = copy.dialogue;

  const leftPage = (
    <div className="space-y-3">
      {/* Chapter Title Strip */}
      <div className="flex items-start justify-between gap-2 border-b border-ink/15 pb-2.5">
        <div>
          <span className="inline-block px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-ink uppercase leading-none">
            Joshua Nancey
          </h1>
          <p className="font-mono text-[10px] text-hanko font-bold mt-1">
            {lang === "en"
              ? "AI, LLM SYSTEMS & ANDROID ENGINEER · PARIS"
              : "INGÉNIEUR IA, SYSTÈMES LLM & ANDROID · PARIS"}
          </p>
        </div>
        <HankoStamp kanji="主" size="sm" />
      </div>

      {/* Comic Spread Panel: Pinned Real Photo + Manga Speech Bubbles */}
      <div className="manga-panel p-3.5 speedlines-bg relative overflow-hidden">
        <span className="hidden sm:inline-block absolute top-1.5 right-2.5 font-display font-black text-xs text-hanko/80 rotate-3 select-none pointer-events-none">
          DON!!
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
          {/* Real Physical Photo Pinned onto Manga Page */}
          <div className="sm:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative bg-white p-1.5 pb-2.5 border-2 border-ink shadow-manga-sm -rotate-2 max-w-[165px] w-full mt-1"
            >
              <div className="masking-tape w-12 h-3.5 -top-1.5 left-3 -rotate-12 absolute z-20" />
              <div className="masking-tape w-12 h-3.5 -top-1.5 right-3 rotate-12 absolute z-20" />
              <div className="aspect-[4/4.1] w-full bg-washi border border-ink overflow-hidden relative">
                <img
                  src="/images/avatar/joshua-photo.png"
                  alt="Joshua Nancey"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-hanko border border-ink text-white font-jp font-black text-[9px] flex items-center justify-center">
                  済
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[9px] font-bold text-ink">
                <span>{pick(copy.photoCaption, lang)}</span>
                <span className="text-hanko">UTC</span>
              </div>
            </motion.div>
          </div>

          {/* Speech Bubble Dialogue pointing from Joshua */}
          <div className="sm:col-span-7 space-y-2.5">
            <h2 className="font-display font-bold text-sm sm:text-base text-ink leading-snug sm:pr-12">
              {pick(copy.headline, lang)}
            </h2>

            <div
              onClick={() => setSpeechIdx((p) => (p + 1) % speeches.length)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && setSpeechIdx((p) => (p + 1) % speeches.length)
              }
              className="manga-bubble manga-bubble-left p-3 cursor-pointer hover:bg-washi/60 transition-colors"
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-hanko shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-ink leading-relaxed">
                  “{pick(speeches[speechIdx], lang)}”
                </p>
              </div>
              <div className="mt-1.5 pt-1 border-t border-ink/10 flex items-center justify-between font-mono text-[9px] font-bold text-hanko">
                <span>
                  {lang === "en"
                    ? `BUBBLE ${speechIdx + 1}/${speeches.length} · CLICK`
                    : `BULLE ${speechIdx + 1}/${speeches.length} · CLIQUEZ`}
                </span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mini-Panels on Left Page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="manga-panel p-3 halftone-subtle space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-hanko">
            <Sparkles className="w-3 h-3" />
            <span>MOD&apos;MATH + IAD CORE</span>
          </div>
          <p className="text-[11px] text-ink font-medium leading-snug">
            {lang === "en"
              ? "Mathematical modeling, selective risk bounds, clinical NLP & low-level Kotlin systems."
              : "Modélisation mathématique, contrôle du risque, NLP clinique et systèmes Kotlin."}
          </p>
        </div>

        <div className="manga-panel p-3 flex flex-col justify-between gap-1.5">
          <div className="font-mono text-[10px] font-bold text-slateink uppercase">
            {lang === "en" ? "ATS RESUMES (1-PAGE PDF)" : "CVs ATS (PDF 1 PAGE)"}
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={PROFILE_LINKS.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-white font-mono text-[10px] font-bold hover:bg-hanko transition-colors"
            >
              <FileText className="w-3 h-3 text-hanko" />
              <span>CV (EN)</span>
            </a>
            <a
              href={PROFILE_LINKS.resumeFr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-washi text-ink border border-ink font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>CV (FR)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const rightPage = (
    <div className="space-y-3">
      {/* Case 1: Training Arc (Education) */}
      <div className="manga-panel p-3 space-y-2">
        <div className="flex items-center justify-between border-b-2 border-ink pb-1.5">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-hanko" />
            <h3 className="font-display font-black text-sm uppercase">
              {pick(copy.eduTitle, lang)}
            </h3>
          </div>
          <span className="font-mono text-[10px] font-bold text-slateink">2020 — 2026</span>
        </div>

        <div className="space-y-2">
          {EDUCATION_DATA.map((edu) => (
            <div key={edu.id} className="p-2.5 border-2 border-ink bg-washi/60 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {edu.logo ? (
                    <div className="w-10 h-7 bg-white border border-ink p-0.5 flex items-center justify-center shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.school.en}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 bg-ink text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      PT
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-ink leading-tight">
                      {pick(edu.school, lang)}
                    </h4>
                    <p className="text-[10px] font-semibold text-hanko leading-tight">
                      {pick(edu.degree, lang)}
                    </p>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 bg-white border border-ink font-mono text-[9px] font-bold shrink-0">
                  {edu.period}
                </span>
              </div>

              <ul className="space-y-0.5 text-[10px] sm:text-[11px] text-slateink leading-snug">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-hanko font-black">▸</span>
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Case 2: Off-Screen Sport & Solidarity (3 compact manga panels, ZERO GAUGES) */}
      <div className="manga-panel p-3 space-y-2">
        <div className="flex items-center justify-between border-b-2 border-ink pb-1.5">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-hanko" />
            <h3 className="font-display font-black text-sm uppercase">
              {pick(copy.passionsTitle, lang)}
            </h3>
          </div>
          <span className="font-mono text-[9px] font-bold text-slateink">
            {lang === "en" ? "HOBBY: SPORT" : "PASSION : SPORT"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {OFF_SCREEN_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-2 border-2 border-ink bg-white flex flex-col justify-between gap-1"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{item.icon}</span>
                <span className="font-display font-bold text-xs text-ink leading-tight">
                  {pick(item.title, lang)}
                </span>
              </div>
              <p className="text-[10px] text-slateink leading-snug">
                {pick(item.description, lang)}
              </p>
            </div>
          ))}
        </div>

        {/* Languages Badges */}
        <div className="pt-1.5 border-t border-ink/20 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase text-slateink mr-1">
            <Globe className="w-3 h-3 text-hanko" />
            {pick(copy.langsTitle, lang)}:
          </span>
          {LANGUAGES_DATA.map((l) => (
            <span
              key={l.code}
              className="px-2 py-0.5 border border-ink bg-washi font-mono text-[10px] font-bold text-ink"
            >
              [{l.code}] {pick(l.name, lang)} ·{" "}
              <span className="text-hanko">{pick(l.level, lang)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return { leftPage, rightPage };
}
