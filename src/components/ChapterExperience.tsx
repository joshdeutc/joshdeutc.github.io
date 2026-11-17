"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { EXPERIENCES_DATA, ExperienceItem } from "@/lib/portfolio-data";

const YEARS = ["2022", "2023", "2024", "2025", "2026"];

function ExperienceMangaPanel({ exp }: { exp: ExperienceItem }) {
  const { lang } = useManga();
  const copy = UI_COPY.experience;

  return (
    <div className="space-y-2.5">
      {/* Header Row with Company Logo(s), Title & Period */}
      <div className="border-b border-ink/20 pb-2 flex items-start gap-2.5">
        <div className="flex -space-x-2 shrink-0">
          {exp.logos.map((logoSrc, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-sm border border-ink/30 bg-white p-1 flex items-center justify-center shadow-sm"
            >
              <img
                src={logoSrc}
                alt={exp.company}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="min-w-0">
          <h2 className="font-display font-black text-base sm:text-lg text-ink leading-tight">
            {pick(exp.role, lang)}
          </h2>
          <p className="font-mono text-[10px] font-bold text-slateink mt-0.5">
            {exp.company} · {exp.location}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] font-bold text-ink mt-0.5">
            <span>{pick(exp.period, lang)}</span>
            <span className="text-hanko">({pick(exp.duration, lang)})</span>
            <span className="px-1.5 py-0.5 bg-washi border border-ink/25 text-[8px]">
              {pick(exp.type, lang)}
            </span>
          </div>
        </div>
      </div>

      {/* Red Chronological Career Gauge (2022–2026) */}
      <div className="p-2 bg-washi/80 border border-ink/20 rounded-sm">
        <div className="grid grid-cols-5 text-[9px] font-mono font-bold text-slateink mb-0.5">
          {YEARS.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <div className="relative h-3.5 bg-white border border-ink/20 overflow-hidden rounded-sm">
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
            {YEARS.map((y) => (
              <div key={y} className="border-r border-ink/10 last:border-r-0 h-full" />
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
            className="absolute top-0.5 bottom-0.5 bg-hanko"
          />
        </div>
      </div>

      {/* Organization Bio */}
      <div className="manga-panel p-2.5 bg-white">
        <div className="font-mono text-[8px] font-bold tracking-widest uppercase text-slateink mb-0.5">
          {pick(copy.companyLabel, lang)}
        </div>
        <p className="text-[11px] text-ink leading-snug">{pick(exp.companyBio, lang)}</p>
      </div>

      {/* 2-Column Editorial Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="manga-panel p-2.5 bg-white">
          <div className="font-mono text-[8px] font-bold tracking-widest uppercase text-hanko mb-1">
            {pick(copy.projectsLabel, lang)}
          </div>
          <ul className="space-y-1 text-[10px] sm:text-[11px] text-ink leading-snug">
            {exp.projectsCol.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-hanko font-bold">•</span>
                <span>{pick(item, lang)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="manga-panel p-2.5 bg-washi/60">
          <div className="font-mono text-[8px] font-bold tracking-widest uppercase text-hanko mb-1">
            {pick(copy.missionsLabel, lang)}
          </div>
          <ul className="space-y-1 text-[10px] sm:text-[11px] text-slateink leading-snug">
            {exp.missionsCol.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-ink font-bold">•</span>
                <span>{pick(item, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Takeaway in Manga Speech Bubble */}
      <div className="manga-bubble p-2.5 text-[11px] text-ink italic leading-snug">
        <span className="not-italic font-mono text-[8px] font-bold text-hanko uppercase mr-1.5">
          {pick(copy.takeawayLabel, lang)}:
        </span>
        “{pick(exp.takeaway, lang)}”
      </div>

      {/* Underlined Stack */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
        {exp.stack.slice(0, 8).map((tech) => (
          <div
            key={tech}
            className="pb-0.5 border-b border-ink/30 font-mono text-[9px] font-bold text-ink truncate"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

export function useExperienceSpread() {
  const { lang } = useManga();
  const copy = UI_COPY.experience;
  const [spreadIdx, setSpreadIdx] = useState<0 | 1>(0);

  const leftExp = spreadIdx === 0 ? EXPERIENCES_DATA[0] : EXPERIENCES_DATA[2];
  const rightExp = spreadIdx === 0 ? EXPERIENCES_DATA[1] : EXPERIENCES_DATA[3];

  const spreadSwitcher = (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-ink/20">
      <div>
        <span className="inline-block px-2 py-0.5 bg-ink text-white font-mono text-[9px] font-bold tracking-widest mb-1">
          {pick(copy.badge, lang)}
        </span>
        <h1 className="font-display font-black text-lg sm:text-xl uppercase text-ink leading-none">
          {pick(copy.title, lang)}
        </h1>
        <p className="text-[10px] text-slateink mt-0.5">{pick(copy.subtitle, lang)}</p>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => setSpreadIdx(0)}
          className={`px-2 py-0.5 font-mono text-[9px] font-bold border border-ink/40 transition-colors ${
            spreadIdx === 0
              ? "bg-hanko text-white border-hanko"
              : "bg-washi text-ink hover:bg-white"
          }`}
        >
          ARC 1 · 2025–2026
        </button>
        <button
          onClick={() => setSpreadIdx(1)}
          className={`px-2 py-0.5 font-mono text-[9px] font-bold border border-ink/40 transition-colors ${
            spreadIdx === 1
              ? "bg-hanko text-white border-hanko"
              : "bg-washi text-ink hover:bg-white"
          }`}
        >
          ARC 2 · 2022–2025
        </button>
      </div>
    </div>
  );

  const leftPage = (
    <div className="relative">
      {spreadSwitcher}
      <motion.div
        key={`left-arc-${spreadIdx}`}
        initial={{ opacity: 0.35, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ExperienceMangaPanel exp={leftExp} />
      </motion.div>
    </div>
  );

  const rightPage = (
    <motion.div
      key={`right-arc-${spreadIdx}`}
      initial={{ opacity: 0.35, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative"
    >
      <ExperienceMangaPanel exp={rightExp} />
    </motion.div>
  );

  return { leftPage, rightPage, spreadIdx, setSpreadIdx };
}
