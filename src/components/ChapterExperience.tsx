"use client";

import React from "react";
import { motion } from "framer-motion";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { EXPERIENCES_DATA } from "@/lib/portfolio-data";

const YEARS = ["2022", "2023", "2024", "2025", "2026"];

export function ChapterExperience() {
  const { lang } = useManga();
  const copy = UI_COPY.experience;

  return (
    <section className="space-y-8">
      {/* Header inspired by Sharujan Vickneswaran + Japanese Editorial Hanko 歴 */}
      <div className="flex items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <span className="inline-block px-2.5 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest mb-2">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-ink uppercase leading-none">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-xs sm:text-sm text-slateink mt-2 max-w-2xl">
            {pick(copy.subtitle, lang)}
          </p>
        </div>
        <HankoStamp kanji="歴" size="lg" />
      </div>

      {/* Vertical Red Timeline */}
      <div className="relative pl-6 sm:pl-9 space-y-10">
        {/* Continuous vertical vermilion timeline line */}
        <div
          className="absolute left-[11px] sm:left-[15px] top-3 bottom-4 w-[2.5px] bg-hanko/75"
          aria-hidden="true"
        />

        {EXPERIENCES_DATA.map((exp, idx) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className="relative"
          >
            {/* Timeline Marker Dot */}
            <div
              className={`absolute -left-[22px] sm:-left-[28px] top-2 w-5 h-5 rounded-full border-[3px] flex items-center justify-center bg-washi ${
                idx === 0 ? "border-hanko" : "border-ink"
              }`}
              aria-hidden="true"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  idx === 0 || exp.isCurrent ? "bg-hanko" : "bg-ink"
                }`}
              />
            </div>

            {/* Experience Card Row (Left Metadata + Red Year Gauge | Right 2-Col Editorial Grid) */}
            <div className="manga-panel p-5 sm:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                {/* LEFT COLUMN: Logos + Title + Red Graduated Gauge 2022–2026 */}
                <div className="lg:col-span-4 space-y-4 lg:border-r-2 lg:border-ink/15 lg:pr-6">
                  {/* Company Logos + Title */}
                  <div className="flex items-start gap-3">
                    <div className="flex -space-x-2 shrink-0">
                      {exp.logos.map((logoSrc, lIdx) => (
                        <div
                          key={lIdx}
                          className="w-12 h-12 rounded-md border-2 border-ink bg-white p-1.5 flex items-center justify-center shadow-manga-sm"
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
                      <p className="font-mono text-xs font-bold text-slateink mt-1">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>

                  {/* Period & Type */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-ink font-bold">
                      <span>{pick(exp.period, lang)}</span>
                      <span className="text-slateink">·</span>
                      <span className="text-hanko">{pick(exp.duration, lang)}</span>
                    </div>
                    <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-slateink">
                      {pick(exp.type, lang)}
                    </div>
                  </div>

                  {/* Signature Red Chronological Gauge (2022 -> 2026) inspired by Sharujan */}
                  <div className="pt-2">
                    <div className="grid grid-cols-5 text-[10px] font-mono font-bold text-slateink mb-1">
                      {YEARS.map((y) => (
                        <span key={y} className="text-left">
                          {y}
                        </span>
                      ))}
                    </div>
                    <div className="relative h-6 bg-washi border border-ink/20 overflow-hidden">
                      {/* Vertical year grid lines */}
                      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                        {YEARS.map((y) => (
                          <div
                            key={y}
                            className="border-r border-ink/15 last:border-r-0 h-full"
                          />
                        ))}
                      </div>
                      {/* Animated Vermilion Red Period Bar */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        style={{
                          left: `${exp.gaugeLeftPct}%`,
                          width: `${exp.gaugeWidthPct}%`,
                          transformOrigin: "left center",
                        }}
                        className="absolute top-1.5 bottom-1.5 bg-hanko border border-ink/80"
                        title={`${pick(exp.period, lang)} (${exp.company})`}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Organization + 2-Col Projects/Missions + Takeaway + Stack */}
                <div className="lg:col-span-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slateink mb-1">
                      {pick(copy.companyLabel, lang)}
                    </div>
                    <p className="text-sm text-ink leading-relaxed">
                      {pick(exp.companyBio, lang)}
                    </p>
                  </div>

                  {/* 2 Columns: Deliverables | Missions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-hanko mb-2">
                        {pick(copy.projectsLabel, lang)}
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-ink leading-relaxed">
                        {exp.projectsCol.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-hanko font-bold mt-0.5">•</span>
                            <span>{pick(item, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-hanko mb-2">
                        {pick(copy.missionsLabel, lang)}
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slateink leading-relaxed">
                        {exp.missionsCol.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-ink font-bold mt-0.5">•</span>
                            <span>{pick(item, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="pt-3 border-t border-ink/20">
                    <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slateink mb-1">
                      {pick(copy.takeawayLabel, lang)}
                    </div>
                    <p className="text-xs sm:text-sm text-ink italic leading-relaxed">
                      “{pick(exp.takeaway, lang)}”
                    </p>
                  </div>

                  {/* Stack Badges (Clean Underlined Editorial Style) */}
                  <div className="pt-3 border-t border-ink/20">
                    <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-slateink mb-2">
                      {pick(copy.stackLabel, lang)}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {exp.stack.map((tech) => (
                        <div
                          key={tech}
                          className="pb-1 border-b border-ink/30 font-mono text-xs font-bold text-ink truncate"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
