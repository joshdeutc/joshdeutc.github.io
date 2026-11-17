"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
  Smartphone,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROJECTS_DATA, ProjectItem } from "@/lib/portfolio-data";

export function WebtoonProjects() {
  const { lang } = useManga();
  const copy = UI_COPY.projects;
  const [zoomProject, setZoomProject] = useState<ProjectItem | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const openProjectZoom = (proj: ProjectItem) => {
    setZoomProject(proj);
    setSlideIdx(0);
  };

  const custos = PROJECTS_DATA[0];
  const restProjects = PROJECTS_DATA.slice(1);

  const activeScreens = zoomProject?.screens ?? [];
  const safeSlide = Math.min(slideIdx, Math.max(0, activeScreens.length - 1));
  const currentScreen = activeScreens[safeSlide];

  return (
    <section id="projects" className="scroll-mt-20 space-y-6">
      {/* Episode Title Strip over Dark Canvas */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
            <span className="w-6 h-[2px] bg-hanko" />
            <span>EPISODE 02 · {lang === "en" ? "VISUAL QUEST GALLERY" : "GALERIE DES PROJETS"}</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <span className="font-mono text-xs text-hanko font-bold">
          {lang === "en"
            ? "CLICK ANY PANEL TO ZOOM ↑"
            : "CLIQUEZ SUR UNE CASE POUR ZOOMER ↑"}
        </span>
      </div>

      {/* FLAGSHIP FULL-WIDTH COMIC PANEL: CUSTOS */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        onClick={() => openProjectZoom(custos)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openProjectZoom(custos)}
        className="manga-sheet manga-panel manga-panel-interactive p-5 sm:p-6 cursor-pointer group"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left Visual Showcase: Dark Bezel Live Samsung A53 Screenshot + Cybernetic Lock Ink Backdrop */}
          <div className="md:col-span-5 relative h-56 sm:h-64 bg-[#0B0C10] border-2 border-ink overflow-hidden flex items-center justify-center p-3">
            <img
              src="/images/manga/ai-guardian.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20 invert pointer-events-none"
            />
            <img
              src={custos.screens[0].src}
              alt="Custos Samsung A53 Live Capture"
              className="relative z-10 h-full w-auto object-contain rounded-xl border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-hanko text-white font-mono text-[9px] font-black z-20">
              {pick(copy.flagshipTag, lang)}
            </span>
            <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-white/95 text-ink border border-ink font-mono text-[9px] font-black flex items-center gap-1 z-20">
              <Maximize2 className="w-3 h-3 text-hanko" />
              <span>5 SCREENS</span>
            </span>
          </div>

          {/* Right Crisp Headline & Visual Pills (Zero Bloat) */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logos/custos.svg"
                  alt="Custos"
                  className="w-7 h-7 border border-ink bg-white p-0.5"
                />
                <span className="font-mono text-[10px] font-black text-hanko tracking-widest">
                  {custos.rank} · {custos.period}
                </span>
              </div>
              <Maximize2 className="w-4 h-4 text-ink/50 group-hover:text-hanko transition-colors" />
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-ink leading-tight">
              {pick(custos.title, lang)}
            </h3>

            <p className="text-xs sm:text-sm text-slateink leading-snug line-clamp-2">
              {pick(custos.summary, lang)}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {custos.metrics.map((m) => (
                <span
                  key={m}
                  className="px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-ink/15 flex items-center justify-between font-mono text-[10px] font-bold text-hanko">
              <span>
                {lang === "en"
                  ? "CLICK TO OPEN GALLERY & OS ARCHITECTURE →"
                  : "CLIQUEZ POUR VOIR LES CAPTURES & L'ARCHITECTURE →"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VISUAL WEBTOON GALLERY GRID FOR REMAINING 5 PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {restProjects.map((proj, idx) => {
          const thumb = proj.screens[0];
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => openProjectZoom(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openProjectZoom(proj)}
              className="manga-sheet manga-panel manga-panel-interactive p-4 flex flex-col justify-between gap-3 cursor-pointer group"
            >
              {/* Dominant Visual Figure / Render / Screenshot */}
              <div className="relative h-44 sm:h-48 w-full bg-white border border-ink/40 overflow-hidden flex items-center justify-center p-1.5">
                {thumb ? (
                  <img
                    src={thumb.src}
                    alt={pick(proj.title, lang)}
                    className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : null}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-ink text-white font-mono text-[9px] font-bold">
                  {proj.rank}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/95 border border-ink font-mono text-[9px] font-black text-ink flex items-center gap-1 shadow-sm group-hover:bg-hanko group-hover:text-white group-hover:border-hanko transition-colors">
                  <Maximize2 className="w-3 h-3" />
                  <span>ZOOM +</span>
                </span>
              </div>

              {/* Concise Title + Hero Metric Badges Only */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold text-slateink">
                  <span>{proj.org}</span>
                  <span>{proj.period}</span>
                </div>
                <h3 className="font-display font-black text-base sm:text-lg text-ink leading-snug">
                  {pick(proj.title, lang)}
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {proj.metrics.slice(0, 3).map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 bg-hanko/10 border border-hanko text-hanko font-mono text-[10px] font-bold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL MANGA CASE ZOOM LIGHTBOX MODAL */}
      <MangaZoomModal
        open={Boolean(zoomProject)}
        onClose={() => setZoomProject(null)}
        eyebrow={zoomProject ? `${zoomProject.rank} · ${zoomProject.org} · ${zoomProject.period}` : undefined}
        title={zoomProject ? pick(zoomProject.title, lang) : ""}
      >
        {zoomProject && (
          <>
            {/* Interactive Carousel inside Zoom Modal */}
            {currentScreen && (
              <div className="manga-panel p-3 bg-washi/70 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-hanko">
                  <span>
                    {pick(copy.screensLabel, lang)} ({safeSlide + 1}/{activeScreens.length})
                  </span>
                </div>

                <div
                  className={`h-64 sm:h-80 w-full border border-ink flex items-center justify-center p-3 overflow-hidden ${
                    currentScreen.isPhone ? "bg-[#0B0C10]" : "bg-white"
                  }`}
                >
                  <img
                    src={currentScreen.src}
                    alt={pick(currentScreen.caption, lang)}
                    className={`max-h-full max-w-full object-contain ${
                      currentScreen.isPhone
                        ? "rounded-xl border border-white/25 shadow-2xl"
                        : ""
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  {activeScreens.length > 1 ? (
                    <button
                      onClick={() =>
                        setSlideIdx(
                          (p) => (p - 1 + activeScreens.length) % activeScreens.length
                        )
                      }
                      className="p-1.5 bg-white border border-ink hover:bg-ink hover:text-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <span />
                  )}

                  <span className="font-mono text-[10px] sm:text-xs font-bold text-ink text-center">
                    {pick(currentScreen.caption, lang)}
                  </span>

                  {activeScreens.length > 1 ? (
                    <button
                      onClick={() =>
                        setSlideIdx((p) => (p + 1) % activeScreens.length)
                      }
                      className="p-1.5 bg-white border border-ink hover:bg-ink hover:text-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            )}

            {/* Speech Bubble Summary */}
            <div className="manga-bubble p-4 text-xs sm:text-sm font-medium text-ink leading-relaxed">
              “{pick(zoomProject.summary, lang)}”
            </div>

            {/* Key Verified Highlights */}
            <div className="p-4 border-2 border-ink bg-white space-y-2">
              <div className="font-mono text-[10px] font-black text-hanko uppercase">
                {lang === "en" ? "VERIFIED HIGHLIGHTS" : "POINTS CLÉS VÉRIFIÉS"}
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink leading-relaxed">
                {zoomProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-hanko font-black">▸</span>
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack & External Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {zoomProject.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-washi border border-ink font-mono text-[10px] font-bold text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {zoomProject.links?.github && (
                  <a
                    href={zoomProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white font-mono text-[11px] font-bold hover:bg-hanko transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {zoomProject.links?.release && (
                  <a
                    href={zoomProject.links.release}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-ink font-mono text-[11px] font-bold hover:bg-washi transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-hanko" />
                    <span>APK Release</span>
                  </a>
                )}
                {zoomProject.links?.externalLabel && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi border border-dashed border-ink/60 font-mono text-[11px] font-bold text-slateink">
                    <Smartphone className="w-3.5 h-3.5 text-hanko" />
                    <span>{pick(zoomProject.links.externalLabel, lang)}</span>
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </MangaZoomModal>
    </section>
  );
}
