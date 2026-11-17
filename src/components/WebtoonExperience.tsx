"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { pick, UI_COPY } from "@/lib/i18n";
import { EXPERIENCES_DATA, ExperienceItem } from "@/lib/portfolio-data";

const YEARS = ["2022", "2023", "2024", "2025", "2026"];

export function WebtoonExperience() {
  const { lang } = useManga();
  const copy = UI_COPY.experience;
  const [zoomExp, setZoomExp] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="scroll-mt-20 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
            <span className="w-6 h-[2px] bg-hanko" />
            <span>EPISODE 03 · {lang === "en" ? "CHRONOLOGICAL ARC" : "ARC CHRONOLOGIQUE"}</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <span className="font-mono text-xs text-hanko font-bold">
          {lang === "en" ? "RECENT → OLDEST · CLICK TO ZOOM" : "RÉCENT → ANCIEN · CLIQUEZ POUR ZOOMER"}
        </span>
      </div>

      {/* Vertical Webtoon Timeline Strip */}
      <div className="relative pl-5 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-hanko/50">
        {EXPERIENCES_DATA.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -28 : 28, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="relative"
          >
            {/* Timeline Red Node Dot */}
            <span className="absolute -left-[22px] sm:-left-[27px] top-6 w-3.5 h-3.5 rounded-full bg-hanko border-2 border-[#0B0C10] shadow" />

            <button
              onClick={() => setZoomExp(exp)}
              className="w-full text-left manga-sheet manga-panel manga-panel-interactive p-4 sm:p-5 space-y-3 cursor-pointer group"
            >
              {/* Top Row: Company Logos + Role + Period */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    {exp.logos.map((logoSrc, i) => (
                      <div
                        key={i}
                        className="w-11 h-11 rounded-sm border border-ink/35 bg-white p-1.5 flex items-center justify-center shadow-sm"
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
                    <h3 className="font-display font-black text-base sm:text-xl text-ink leading-tight">
                      {pick(exp.role, lang)}
                    </h3>
                    <p className="font-mono text-xs font-bold text-slateink mt-0.5">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right font-mono text-[11px] font-bold">
                    <div className="text-ink">{pick(exp.period, lang)}</div>
                    <div className="text-hanko">{pick(exp.duration, lang)}</div>
                  </div>
                  <span className="p-1.5 border border-ink/30 bg-washi group-hover:bg-hanko group-hover:text-white group-hover:border-hanko transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Clean Signature Red Chronological Gauge (2022–2026) */}
              <div className="p-2 bg-washi/80 border border-ink/20 rounded-sm">
                <div className="grid grid-cols-5 text-[9px] font-mono font-bold text-slateink mb-0.5">
                  {YEARS.map((y) => (
                    <span key={y}>{y}</span>
                  ))}
                </div>
                <div className="relative h-3 bg-white border border-ink/20 overflow-hidden rounded-sm">
                  <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                    {YEARS.map((y) => (
                      <div key={y} className="border-r border-ink/10 last:border-r-0 h-full" />
                    ))}
                  </div>
                  <div
                    style={{
                      left: `${exp.gaugeLeftPct}%`,
                      width: `${exp.gaugeWidthPct}%`,
                    }}
                    className="absolute top-0.5 bottom-0.5 bg-hanko"
                  />
                </div>
              </div>

              {/* Single Crisp One-Line Takeaway Preview + Stack */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <p className="text-xs sm:text-sm text-ink/85 italic line-clamp-1 max-w-2xl">
                  “{pick(exp.takeaway, lang)}”
                </p>
                <span className="font-mono text-[10px] font-black text-hanko shrink-0">
                  {lang === "en" ? "OPEN ARC DETAILS +" : "VOIR DÉTAILS +"}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Experience Arc Zoom Modal */}
      <MangaZoomModal
        open={Boolean(zoomExp)}
        onClose={() => setZoomExp(null)}
        eyebrow={
          zoomExp
            ? `${zoomExp.company} · ${pick(zoomExp.period, lang)} (${pick(zoomExp.duration, lang)})`
            : undefined
        }
        title={zoomExp ? pick(zoomExp.role, lang) : ""}
      >
        {zoomExp && (
          <>
            <div className="p-3.5 border-2 border-ink bg-washi/60 space-y-1">
              <div className="font-mono text-[9px] font-black text-hanko uppercase">
                {pick(copy.companyLabel, lang)}
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {pick(zoomExp.companyBio, lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 border-2 border-ink bg-white space-y-2">
                <div className="font-mono text-[9px] font-black text-hanko uppercase">
                  {pick(copy.projectsLabel, lang)}
                </div>
                <ul className="space-y-1.5 text-xs text-ink leading-relaxed">
                  {zoomExp.projectsCol.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-hanko font-bold">•</span>
                      <span>{pick(item, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 border-2 border-ink bg-washi/50 space-y-2">
                <div className="font-mono text-[9px] font-black text-hanko uppercase">
                  {pick(copy.missionsLabel, lang)}
                </div>
                <ul className="space-y-1.5 text-xs text-slateink leading-relaxed">
                  {zoomExp.missionsCol.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-ink font-bold">•</span>
                      <span>{pick(item, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="manga-bubble p-3.5 text-xs sm:text-sm italic text-ink">
              <span className="not-italic font-mono text-[9px] font-black text-hanko uppercase mr-2">
                {pick(copy.takeawayLabel, lang)}:
              </span>
              “{pick(zoomExp.takeaway, lang)}”
            </div>

            <div className="flex flex-wrap gap-1.5">
              {zoomExp.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
      </MangaZoomModal>
    </section>
  );
}
