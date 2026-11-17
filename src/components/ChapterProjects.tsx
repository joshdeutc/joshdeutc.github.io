"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
  Smartphone,
  X,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROJECTS_DATA, ProjectItem } from "@/lib/portfolio-data";

export function useProjectsSpread() {
  const { lang } = useManga();
  const copy = UI_COPY.projects;
  const [selectedId, setSelectedId] = useState<string>(PROJECTS_DATA[0].id);
  const [slideIdx, setSlideIdx] = useState(0);
  const [zoomModal, setZoomModal] = useState(false);

  const selectedProject: ProjectItem =
    PROJECTS_DATA.find((p) => p.id === selectedId) ?? PROJECTS_DATA[0];

  const handleSelectProject = (id: string) => {
    setSelectedId(id);
    setSlideIdx(0);
  };

  // LEFT PAGE: Compact Manga Grid of Selectable Quests
  const leftPage = (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2 border-b border-ink/15 pb-2">
        <div>
          <span className="inline-block px-2 py-0.5 bg-ink text-white font-mono text-[9px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-[11px] text-slateink mt-1">{pick(copy.subtitle, lang)}</p>
        </div>
        <div className="w-12 h-12 border-2 border-ink bg-white overflow-hidden shadow-manga-sm shrink-0">
          <img
            src="/images/manga/ai-guardian.jpg"
            alt="AI & Cybernetic Guardian Manga Art"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Flagship Custos Panel */}
      {(() => {
        const custos = PROJECTS_DATA[0];
        const isActive = selectedProject.id === custos.id;
        return (
          <button
            onClick={() => handleSelectProject(custos.id)}
            className={`w-full text-left p-2.5 border-[2.5px] border-ink transition-all ${
              isActive
                ? "bg-white shadow-manga-sm ring-2 ring-hanko ring-offset-1"
                : "bg-washi/80 hover:bg-white shadow-manga-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <img
                  src="/images/logos/custos.svg"
                  alt="Custos"
                  className="w-5 h-5 border border-ink bg-white p-0.5"
                />
                <span className="px-1.5 py-0.5 bg-hanko text-white font-mono text-[9px] font-bold">
                  {pick(copy.flagshipTag, lang)}
                </span>
              </div>
              <span className="font-mono text-[9px] font-bold text-ink">
                {isActive ? "OPEN ●" : "INSPECT →"}
              </span>
            </div>
            <h2 className="font-display font-black text-sm sm:text-base text-ink leading-tight">
              {pick(custos.title, lang)}
            </h2>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {custos.metrics.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="px-1.5 py-0.5 bg-ink text-white font-mono text-[9px] font-bold"
                >
                  {m}
                </span>
              ))}
            </div>
          </button>
        );
      })()}

      {/* Grid of Remaining Manga Quest Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PROJECTS_DATA.slice(1).map((proj) => {
          const isActive = selectedProject.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(proj.id)}
              className={`text-left p-2.5 border-2 border-ink transition-all flex flex-col justify-between gap-1.5 ${
                isActive
                  ? "bg-white shadow-manga-sm ring-2 ring-hanko"
                  : "bg-white/85 hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="px-1.5 py-0.5 bg-ink text-white font-mono text-[8px] font-bold">
                    {proj.rank}
                  </span>
                  {isActive && (
                    <span className="font-mono text-[8px] font-black text-hanko">
                      SHING!
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-xs text-ink leading-snug">
                  {pick(proj.title, lang)}
                </h3>
                <p className="font-mono text-[9px] text-slateink font-bold mt-0.5">
                  {proj.org}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {proj.metrics.slice(0, 2).map((m) => (
                  <span
                    key={m}
                    className="px-1 py-0.5 bg-hanko/10 border border-hanko text-hanko font-mono text-[8px] font-bold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // RIGHT PAGE: Zoomed Manga Quest Detail with Speech Bubbles & Live Screenshot Carousel
  const safeIdx = Math.min(slideIdx, Math.max(0, selectedProject.screens.length - 1));
  const currentScreen = selectedProject.screens[safeIdx];

  const rightPage = (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedProject.id}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -14 }}
        transition={{ duration: 0.2 }}
        className="space-y-2.5"
      >
        <div className="border-b-2 border-ink pb-2 flex items-start justify-between gap-2">
          <div>
            <span className="px-1.5 py-0.5 bg-hanko text-white font-mono text-[9px] font-bold">
              {selectedProject.rank} · {selectedProject.org}
            </span>
            <h2 className="font-display font-black text-lg sm:text-xl text-ink mt-1 leading-tight">
              {pick(selectedProject.title, lang)}
            </h2>
          </div>
          <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-washi border border-ink shrink-0">
            {selectedProject.period}
          </span>
        </div>

        {/* Manga Speech Bubble Summary */}
        <div className="manga-bubble p-2.5 text-[11px] sm:text-xs text-ink leading-snug font-medium">
          “{pick(selectedProject.summary, lang)}”
        </div>

        {/* Live Carousel Case */}
        {selectedProject.screens.length > 0 && currentScreen && (
          <div className="manga-panel p-2.5 bg-washi/80 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[9px] font-bold">
              <span className="text-hanko">
                {pick(copy.screensLabel, lang)} ({safeIdx + 1}/
                {selectedProject.screens.length})
              </span>
              <button
                onClick={() => setZoomModal(true)}
                className="inline-flex items-center gap-1 hover:text-hanko"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{pick(copy.openDetails, lang)}</span>
              </button>
            </div>

            <div
              onClick={() => setZoomModal(true)}
              className={`h-[165px] sm:h-[190px] w-full border border-ink/40 flex items-center justify-center overflow-hidden cursor-pointer p-1.5 ${
                currentScreen.isPhone ? "bg-[#0B0C10]" : "bg-white"
              }`}
            >
              <img
                src={currentScreen.src}
                alt={pick(currentScreen.caption, lang)}
                className={`max-h-full max-w-full object-contain ${
                  currentScreen.isPhone
                    ? "rounded-lg border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.65)]"
                    : ""
                }`}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              {selectedProject.screens.length > 1 ? (
                <button
                  onClick={() =>
                    setSlideIdx(
                      (p) =>
                        (p - 1 + selectedProject.screens.length) %
                        selectedProject.screens.length
                    )
                  }
                  className="p-1 bg-white border border-ink hover:bg-ink hover:text-white"
                  aria-label="Previous visual"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
              ) : (
                <span />
              )}

              <span className="font-mono text-[9px] font-bold text-ink text-center truncate">
                {pick(currentScreen.caption, lang)}
              </span>

              {selectedProject.screens.length > 1 ? (
                <button
                  onClick={() =>
                    setSlideIdx((p) => (p + 1) % selectedProject.screens.length)
                  }
                  className="p-1 bg-white border border-ink hover:bg-ink hover:text-white"
                  aria-label="Next visual"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        )}

        {/* Key Highlights inside Comic Panel */}
        <ul className="space-y-1 text-[11px] text-ink leading-snug bg-white border-2 border-ink p-2.5">
          {selectedProject.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-hanko font-black">▸</span>
              <span>{pick(h, lang)}</span>
            </li>
          ))}
        </ul>

        {/* Stack + Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex flex-wrap gap-1">
            {selectedProject.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="px-1.5 py-0.5 bg-washi border border-ink font-mono text-[9px] font-bold"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {selectedProject.links.github && (
              <a
                href={selectedProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-white border border-ink font-mono text-[10px] font-bold hover:bg-hanko"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}
            {selectedProject.links.release && (
              <a
                href={selectedProject.links.release}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-ink border border-ink font-mono text-[10px] font-bold hover:bg-washi"
              >
                <Smartphone className="w-3 h-3 text-hanko" />
                <span>APK</span>
              </a>
            )}
            {selectedProject.links.external && (
              <a
                href={selectedProject.links.external}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-ink border border-ink font-mono text-[10px] font-bold hover:bg-washi"
              >
                <span>{pick(selectedProject.links.externalLabel!, lang)}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
            {selectedProject.links.externalLabel && !selectedProject.links.external && (
              <span className="inline-flex items-center px-2 py-1 bg-washi border border-dashed border-ink font-mono text-[9px] font-bold text-slateink">
                {pick(selectedProject.links.externalLabel, lang)}
              </span>
            )}
          </div>
        </div>

        {/* Fullscreen Zoom Modal */}
        {zoomModal && currentScreen && (
          <div
            onClick={() => setZoomModal(false)}
            className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm p-4 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-paper border-[3px] border-ink shadow-manga-lg max-w-3xl w-full p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                <span className="font-mono text-xs font-bold text-ink">
                  {pick(currentScreen.caption, lang)}
                </span>
                <button
                  onClick={() => setZoomModal(false)}
                  className="p-1.5 bg-washi border-2 border-ink hover:bg-hanko hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="h-[65vh] bg-white border-2 border-ink flex items-center justify-center p-2">
                <img
                  src={currentScreen.src}
                  alt={pick(currentScreen.caption, lang)}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return { leftPage, rightPage };
}
