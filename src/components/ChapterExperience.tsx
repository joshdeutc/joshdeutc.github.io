"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { EXPERIENCES_DATA, ExperienceItem } from "@/lib/portfolio-data";

const YEARS = ["2022", "2023", "2024", "2025", "2026"];

function ExperienceMangaPanel({ exp }: { exp: ExperienceItem }) {
  const { lang } = useManga();
  const copy = UI_COPY.experience;

  return (
    <div className="space-y-4">
      {/* Header Row with Company Logo(s), Title & Period */}
      <div className="border-b-2 border-ink pb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex -space-x-2 shrink-0">
            {exp.logos.map((logoSrc, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-md border-2 border-ink bg-white p-1 flex items-center justify-center shadow-manga-sm"
              >
                <img
                  src={logoSrc}
                  alt={exp.company}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
              {pick(exp.role, lang)}
            </h2>
            <p className="font-mono text-[11px] font-bold text-slateink mt-0.5">
              {exp.company} · {exp.location}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-ink mt-1">
              <span>{pick(exp.period, lang)}</span>
              <span className="text-slateink">·</span>
              <span className="text-hanko">{pick(exp.duration, lang)}</span>
              <span className="px-1.5 py-0.5 bg-washi border border-ink text-[9px]">
                {pick(exp.type, lang)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Red Chronological Gauge (2022–2026) */}
      <div className="p-2.5 bg-washi border-2 border-ink">
        <div className="grid grid-cols-5 text-[10px] font-mono font-bold text-slateink mb-1">
          {YEARS.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <div className="relative h-5 bg-white border border-ink/25 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
            {YEARS.map((y) => (
              <div key={y} className="border-r border-ink/15 last:border-r-0 h-full" />
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              left: `${exp.gaugeLeftPct}%`,
              width: `${exp.gaugeWidthPct}%`,
              transformOrigin: "left center",
            }}
            className="absolute top-1 bottom-1 bg-hanko border border-ink"
          />
        </div>
      </div>

      {/* Organization Bio */}
      <div className="manga-panel p-3 bg-white">
        <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-slateink mb-1">
          {pick(copy.companyLabel, lang)}
        </div>
        <p className="text-xs text-ink leading-relaxed">{pick(exp.companyBio, lang)}</p>
      </div>

      {/* 2-Column Editorial Breakdown inside Manga Cases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="manga-panel p-3 bg-white">
          <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-hanko mb-1.5">
            {pick(copy.projectsLabel, lang)}
          </div>
          <ul className="space-y-1.5 text-[11px] sm:text-xs text-ink leading-snug">
            {exp.projectsCol.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-hanko font-bold">•</span>
                <span>{pick(item, lang)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="manga-panel p-3 bg-washi/60">
          <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-hanko mb-1.5">
            {pick(copy.missionsLabel, lang)}
          </div>
          <ul className="space-y-1.5 text-[11px] sm:text-xs text-slateink leading-snug">
            {exp.missionsCol.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-ink font-bold">•</span>
                <span>{pick(item, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Takeaway in Manga Speech Bubble */}
      <div className="manga-bubble p-3 text-xs text-ink italic leading-relaxed">
        <span className="not-italic font-mono text-[9px] font-bold text-hanko uppercase block mb-0.5">
          {pick(copy.takeawayLabel, lang)}
        </span>
        “{pick(exp.takeaway, lang)}”
      </div>

      {/* Clean Underlined Stack */}
      <div className="pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {exp.stack.map((tech) => (
            <div
              key={tech}
              className="pb-0.5 border-b border-ink/30 font-mono text-[10px] font-bold text-ink truncate"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function useExperienceSpread() {
  const { lang } = useManga();
  const copy = UI_COPY.experience;
  const [spreadIdx, setSpreadIdx] = useState<0 | 1>(0);

  // Order: Freelance/Custos (0), Epiconcept (1), Aubay (2), Complétude (3)
  const leftExp = spreadIdx === 0 ? EXPERIENCES_DATA[0] : EXPERIENCES_DATA[2];
  const rightExp = spreadIdx === 0 ? EXPERIENCES_DATA[1] : EXPERIENCES_DATA[3];

  const spreadSwitcher = (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-ink">
      <div className="flex items-center gap-2">
        <HankoStamp kanji="歴" size="sm" />
        <div>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-[11px] text-slateink">{pick(copy.subtitle, lang)}</p>
        </div>
      </div>

      <div className="flex gap-1.5">
        <button
          onClick={() => setSpreadIdx(0)}
          className={`px-2.5 py-1 font-mono text-[10px] font-bold border-2 border-ink transition-colors ${
            spreadIdx === 0 ? "bg-hanko text-white" : "bg-washi text-ink hover:bg-white"
          }`}
        >
          1/2 · 2025–2026
        </button>
        <button
          onClick={() => setSpreadIdx(1)}
          className={`px-2.5 py-1 font-mono text-[10px] font-bold border-2 border-ink transition-colors ${
            spreadIdx === 1 ? "bg-hanko text-white" : "bg-washi text-ink hover:bg-white"
          }`}
        >
          2/2 · 2022–2025
        </button>
      </div>
    </div>
  );

  const leftPage = (
    <div>
      {spreadSwitcher}
      <ExperienceMangaPanel exp={leftExp} />
    </div>
  );

  const rightPage = (
    <div className="pt-1">
      <ExperienceMangaPanel exp={rightExp} />
    </div>
  );

  return { leftPage, rightPage, spreadIdx, setSpreadIdx };
}
