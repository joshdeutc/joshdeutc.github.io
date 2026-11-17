"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { pick, UI_COPY } from "@/lib/i18n";
import { EXPERIENCES_DATA, ExperienceItem } from "@/lib/portfolio-data";

export function EditorialExperience() {
  const { lang } = useManga();
  const copy = UI_COPY.experience;
  const [zoomExp, setZoomExp] = useState<ExperienceItem | null>(null);

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-ink/15 pt-14 space-y-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-hanko uppercase">
            <span className="font-jp">経歴</span>
            <span>/</span>
            <span>03 · {lang === "en" ? "Chronological Arc" : "Parcours Chronologique"}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <span className="font-mono text-xs text-slateink">
          2022 — 2026 · {lang === "en" ? "Most Recent First" : "Plus récent au plus ancien"}
        </span>
      </div>

      {/* Architectural Editorial Experience List (Zero line-clamp truncation!) */}
      <div className="divide-y divide-ink/15 border-t border-b border-ink/15">
        {EXPERIENCES_DATA.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="py-7 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
          >
            {/* Left Meta: Company Logo(s), Period, Organization & Subtle Crimson Duration Thread */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  {exp.logos.map((logoSrc, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 border border-ink/20 bg-white p-1.5 flex items-center justify-center"
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
                  <div className="font-display font-bold text-base text-ink leading-snug">
                    {exp.company}
                  </div>
                  <div className="font-mono text-xs text-slateink">{exp.location}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-ink">{pick(exp.period, lang)}</span>
                  <span className="font-bold text-hanko">{pick(exp.duration, lang)}</span>
                </div>
                {/* Clean Slim Crimson Time-Span Bar (2022 -> 2026) */}
                <div className="relative h-[3px] w-full bg-ink/10 overflow-hidden">
                  <div
                    style={{
                      left: `${exp.gaugeLeftPct}%`,
                      width: `${exp.gaugeWidthPct}%`,
                    }}
                    className="absolute inset-y-0 bg-hanko"
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slateink/70">
                  <span>2022</span>
                  <span>2024</span>
                  <span>2026</span>
                </div>
              </div>
            </div>

            {/* Right Impact Column: Full Unclipped Deliverables & Trigger */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight">
                  {pick(exp.role, lang)}
                </h3>
                <button
                  onClick={() => setZoomExp(exp)}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-hanko hover:underline shrink-0"
                >
                  <span>{lang === "en" ? "Full Breakdown" : "Détails"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <ul className="space-y-1.5 text-sm text-ink/90 leading-relaxed">
                {exp.projectsCol.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-hanko font-bold mt-0.5">▸</span>
                    <span>{pick(item, lang)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs sm:text-sm italic text-slateink border-l-2 border-ink/20 pl-3">
                “{pick(exp.takeaway, lang)}”
              </p>

              <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slateink">
                {exp.stack.slice(0, 6).map((tech) => (
                  <span key={tech} className="font-medium text-ink/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Experience Modal */}
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
            <div className="p-4 border border-ink/15 bg-washi/60 space-y-1">
              <div className="font-mono text-xs font-bold text-hanko uppercase">
                {pick(copy.companyLabel, lang)}
              </div>
              <p className="text-sm text-ink leading-relaxed">
                {pick(zoomExp.companyBio, lang)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-ink/15 bg-paper space-y-2">
                <div className="font-mono text-xs font-bold text-hanko uppercase">
                  {pick(copy.projectsLabel, lang)}
                </div>
                <ul className="space-y-2 text-sm text-ink leading-relaxed">
                  {zoomExp.projectsCol.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-hanko font-bold">•</span>
                      <span>{pick(item, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border border-ink/15 bg-washi/40 space-y-2">
                <div className="font-mono text-xs font-bold text-ink uppercase">
                  {pick(copy.missionsLabel, lang)}
                </div>
                <ul className="space-y-2 text-sm text-slateink leading-relaxed">
                  {zoomExp.missionsCol.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-ink font-bold">•</span>
                      <span>{pick(item, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm italic text-ink border-l-2 border-hanko pl-4">
              <strong className="not-italic font-mono text-xs text-hanko uppercase mr-2">
                {pick(copy.takeawayLabel, lang)}:
              </strong>
              “{pick(zoomExp.takeaway, lang)}”
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {zoomExp.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-ink text-paper">
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
