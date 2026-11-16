"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ShieldCheck,
  Smartphone,
  X,
  Maximize2,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROJECTS_DATA, ProjectItem } from "@/lib/portfolio-data";

export function ChapterProjects() {
  const { lang } = useManga();
  const copy = UI_COPY.projects;

  const [filter, setFilter] = useState<"all" | "mobile" | "ai" | "math">("all");
  const [custosSlide, setCustosSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalSlide, setModalSlide] = useState(0);

  const custos = PROJECTS_DATA[0];
  const otherProjects = PROJECTS_DATA.slice(1).filter(
    (p) => filter === "all" || p.category === filter
  );

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalSlide(0);
  };

  return (
    <section className="space-y-6">
      {/* Chapter Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div className="max-w-3xl">
          <span className="inline-block px-2.5 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest mb-2">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-sm text-slateink mt-2 leading-relaxed">
            {pick(copy.subtitle, lang)}
          </p>
        </div>
        <HankoStamp kanji="挑" size="lg" />
      </div>

      {/* Category Filter Strip */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", copy.filterAll],
            ["mobile", copy.filterMobile],
            ["ai", copy.filterAI],
            ["math", copy.filterMath],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3.5 py-1.5 font-mono text-xs font-bold border-2 border-ink transition-all ${
              filter === key
                ? "bg-hanko text-white shadow-manga-sm"
                : "bg-paper text-ink hover:bg-washi"
            }`}
          >
            {pick(label, lang)}
          </button>
        ))}
      </div>

      {/* Flagship Quest Panel: CUSTOS (Visible on All or Mobile filter) */}
      {(filter === "all" || filter === "mobile") && (
        <div className="manga-panel p-5 sm:p-7 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Custos Info Left */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="w-10 h-10 bg-paper border-2 border-ink p-1.5 flex items-center justify-center">
                  <img
                    src="/images/logos/custos.svg"
                    alt="Custos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 bg-hanko text-white font-mono text-[11px] font-bold border-2 border-ink">
                  {pick(copy.flagshipTag, lang)}
                </span>
                <span className="px-2 py-0.5 bg-washi border border-ink font-mono text-[11px] font-bold">
                  {custos.period}
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-ink leading-tight">
                {pick(custos.title, lang)}
              </h2>

              <p className="text-sm text-slateink leading-relaxed">
                {pick(custos.summary, lang)}
              </p>

              <div className="flex flex-wrap gap-2">
                {custos.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 bg-ink text-white font-mono text-xs font-bold"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm text-ink">
                {custos.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-hanko font-black">▸</span>
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {custos.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-washi border border-ink font-mono text-[11px] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={custos.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-hanko transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={custos.links.release}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-paper text-ink border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-washi transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-hanko" />
                  <span>APK v1.4</span>
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-paper text-ink border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-washi transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-hanko" />
                  <span>/privacy</span>
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-washi border-2 border-dashed border-ink font-mono text-[11px] font-bold text-slateink">
                  {pick(custos.links.externalLabel!, lang)}
                </span>
              </div>
            </div>

            {/* Custos Live Samsung Screenshot Carousel Right */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="bg-washi border-[2.5px] border-ink shadow-manga p-3 w-full max-w-[310px]">
                <div className="flex items-center justify-between mb-2 font-mono text-[10px] font-bold">
                  <span className="text-hanko">
                    SAMSUNG A53 · {custosSlide + 1}/{custos.screens.length}
                  </span>
                  <button
                    onClick={() => openModal(custos)}
                    className="inline-flex items-center gap-1 hover:text-hanko"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>ZOOM</span>
                  </button>
                </div>

                <div className="relative aspect-[9/17] w-full bg-white border-2 border-ink overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={custos.screens[custosSlide].src}
                      src={custos.screens[custosSlide].src}
                      alt={pick(custos.screens[custosSlide].caption, lang)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => openModal(custos)}
                      className="w-full h-full object-contain cursor-pointer"
                    />
                  </AnimatePresence>
                </div>

                <p className="mt-2.5 text-center font-mono text-[11px] font-bold text-ink min-h-[32px]">
                  {pick(custos.screens[custosSlide].caption, lang)}
                </p>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      setCustosSlide(
                        (prev) => (prev - 1 + custos.screens.length) % custos.screens.length
                      )
                    }
                    className="p-1.5 bg-paper border-2 border-ink hover:bg-ink hover:text-white transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    {custos.screens.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCustosSlide(idx)}
                        className={`h-2.5 transition-all border border-ink ${
                          custosSlide === idx ? "w-6 bg-hanko" : "w-2.5 bg-paper"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCustosSlide((prev) => (prev + 1) % custos.screens.length)
                    }
                    className="p-1.5 bg-paper border-2 border-ink hover:bg-ink hover:text-white transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Quest Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((proj) => (
          <motion.article
            key={proj.id}
            whileHover={{ y: -3 }}
            className="manga-panel-interactive p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer group"
            onClick={() => openModal(proj)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold">
                  {proj.rank}
                </span>
                <span className="font-mono text-[11px] font-bold text-slateink">
                  {proj.org} · {proj.period}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-ink group-hover:text-hanko transition-colors leading-snug">
                {pick(proj.title, lang)}
              </h3>

              {/* Preview Thumbnail */}
              {proj.screens.length > 0 && (
                <div className="aspect-[16/9] w-full bg-white border-2 border-ink overflow-hidden relative">
                  <img
                    src={proj.screens[0].src}
                    alt={pick(proj.screens[0].caption, lang)}
                    className="w-full h-full object-contain p-1 group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-ink/90 text-white font-mono text-[10px] font-bold">
                    {proj.screens.length}{" "}
                    {lang === "en" ? "VISUALS" : "VISUELS"} · SHING!
                  </span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slateink leading-relaxed">
                {pick(proj.summary, lang)}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {proj.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-0.5 bg-hanko/10 text-hanko border border-hanko font-mono text-[11px] font-bold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-ink/15 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ink group-hover:text-hanko">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{pick(copy.openDetails, lang)}</span>
              </span>
              {proj.links.github && (
                <a
                  href={proj.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-washi border-2 border-ink font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Detailed Quest Modal with Interactive Screenshot Carousel */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="manga-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative"
            >
              <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-4">
                <div>
                  <span className="px-2 py-0.5 bg-hanko text-white font-mono text-[11px] font-bold">
                    {selectedProject.rank} · {selectedProject.org}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-ink mt-2">
                    {pick(selectedProject.title, lang)}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-washi border-2 border-ink hover:bg-hanko hover:text-white transition-colors"
                  aria-label={pick(copy.closeModal, lang)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel in Modal */}
              {selectedProject.screens.length > 0 && (
                <div className="border-2 border-ink bg-washi p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2 font-mono text-xs font-bold">
                    <span>
                      {pick(copy.screensLabel, lang)} ({modalSlide + 1}/
                      {selectedProject.screens.length})
                    </span>
                    <span className="text-hanko">
                      {pick(selectedProject.screens[modalSlide].caption, lang)}
                    </span>
                  </div>
                  <div className="h-[320px] sm:h-[420px] w-full bg-white border-2 border-ink flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={selectedProject.screens[modalSlide].src}
                      alt={pick(selectedProject.screens[modalSlide].caption, lang)}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  {selectedProject.screens.length > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          setModalSlide(
                            (prev) =>
                              (prev - 1 + selectedProject.screens.length) %
                              selectedProject.screens.length
                          )
                        }
                        className="px-3 py-1.5 bg-paper border-2 border-ink font-mono text-xs font-bold hover:bg-ink hover:text-white"
                      >
                        ← Prev
                      </button>
                      <button
                        onClick={() =>
                          setModalSlide(
                            (prev) => (prev + 1) % selectedProject.screens.length
                          )
                        }
                        className="px-3 py-1.5 bg-paper border-2 border-ink font-mono text-xs font-bold hover:bg-ink hover:text-white"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {pick(selectedProject.summary, lang)}
              </p>

              <ul className="space-y-2 text-sm text-slateink">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-hanko font-black">▸</span>
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase text-slateink">
                  {pick(copy.stackLabel, lang)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-washi border border-ink font-mono text-xs font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-ink flex flex-wrap gap-3">
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white border-2 border-ink font-mono text-xs font-bold hover:bg-hanko"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {selectedProject.links.external && (
                  <a
                    href={selectedProject.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-paper text-ink border-2 border-ink font-mono text-xs font-bold hover:bg-washi"
                  >
                    <span>
                      {selectedProject.links.externalLabel
                        ? pick(selectedProject.links.externalLabel, lang)
                        : "External Link"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.links.privacy && (
                  <a
                    href={selectedProject.links.privacy}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-hanko text-white border-2 border-ink font-mono text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Privacy Policy (/privacy)</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
