"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Smartphone,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { MangaZoomModal } from "./MangaZoomModal";
import { Lang, pick, UI_COPY } from "@/lib/i18n";
import { PROJECTS_DATA, ProjectItem } from "@/lib/portfolio-data";

/**
 * Clean bilingual vector editorial previews so project thumbnails share one unified
 * architectural Washi + Ink + Crimson grammar (no raw French Matplotlib screenshots in EN mode).
 */
function CaseVisualPreview({ id, lang }: { id: string; lang: Lang }) {
  if (id === "cath-llm") {
    return (
      <div className="w-full h-full bg-paper p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slateink">
          <span>
            {lang === "en" ? "F1 vs Valid JSON Parse Rate" : "Score F1 vs Parsing JSON Exploitable"}
          </span>
          <span className="text-hanko">verify.csv</span>
        </div>
        <svg viewBox="0 0 320 115" className="w-full h-auto my-1" role="img" aria-label="CATH-LLM benchmark">
          {/* MedGemma 27B */}
          <text x="0" y="20" className="fill-[#111111]" fontSize="10" fontWeight="700" fontFamily="monospace">
            MedGemma 27B (EN / HR)
          </text>
          <rect x="0" y="26" width="246" height="12" fill="#D62828" />
          <text x="252" y="36" fill="#D62828" fontSize="10" fontWeight="700" fontFamily="monospace">
            F1 0.91
          </text>
          <rect x="0" y="40" width="270" height="8" fill="#111111" opacity="0.22" />
          <text x="275" y="48" fill="#4D4B46" fontSize="9" fontFamily="monospace">
            100% JSON
          </text>

          {/* 31B Deceptive Model */}
          <text x="0" y="76" className="fill-[#111111]" fontSize="10" fontWeight="700" fontFamily="monospace">
            31B Baseline (Abstention Illusion)
          </text>
          <rect x="0" y="82" width="121" height="12" fill="#111111" />
          <text x="128" y="92" fill="#111111" fontSize="10" fontWeight="700" fontFamily="monospace">
            55% Parse Fail
          </text>
        </svg>
        <div className="font-mono text-[10px] text-slateink border-t border-ink/10 pt-1.5 flex justify-between">
          <span>16,384-token context</span>
          <span>1× NVIDIA A100 40GB</span>
        </div>
      </div>
    );
  }

  if (id === "deep-piste") {
    return (
      <div className="w-full h-full bg-paper p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slateink">
          <span>GMIC Dual-Branch + SGR</span>
          <span className="text-hanko">AUC = 0.889</span>
        </div>
        <svg viewBox="0 0 320 112" className="w-full h-auto my-1" role="img" aria-label="deep.piste pipeline">
          <rect x="2" y="20" width="76" height="58" fill="none" stroke="#111111" strokeWidth="1.5" />
          <text x="40" y="45" textAnchor="middle" fill="#111111" fontSize="9" fontWeight="700" fontFamily="monospace">
            16-bit
          </text>
          <text x="40" y="58" textAnchor="middle" fill="#4D4B46" fontSize="8" fontFamily="monospace">
            300+ GB
          </text>

          <line x1="78" y1="49" x2="104" y2="49" stroke="#111111" strokeWidth="1.5" />
          <rect x="104" y="14" width="102" height="30" fill="#111111" />
          <text x="155" y="33" textAnchor="middle" fill="#FAF8F4" fontSize="9" fontWeight="700" fontFamily="monospace">
            ResNet-22 Global
          </text>
          <rect x="104" y="54" width="102" height="30" fill="none" stroke="#111111" strokeWidth="1.5" />
          <text x="155" y="73" textAnchor="middle" fill="#111111" fontSize="9" fontWeight="700" fontFamily="monospace">
            ResNet-18 ROIs
          </text>

          <line x1="206" y1="49" x2="230" y2="49" stroke="#D62828" strokeWidth="1.5" />
          <rect x="230" y="20" width="88" height="58" fill="#D62828" />
          <text x="274" y="44" textAnchor="middle" fill="#FAF8F4" fontSize="10" fontWeight="700" fontFamily="monospace">
            SGR Bounds
          </text>
          <text x="274" y="59" textAnchor="middle" fill="#FAF8F4" fontSize="9" fontFamily="monospace">
            FNR/FPR ≤ 5%
          </text>
        </svg>
        <div className="font-mono text-[10px] text-slateink border-t border-ink/10 pt-1.5 flex justify-between">
          <span>5-Model Deep Ensemble</span>
          <span>8-Ch. Docker Capsule</span>
        </div>
      </div>
    );
  }

  if (id === "tz2-surfaces") {
    return (
      <div className="w-full h-full bg-[#B4B4B4] relative overflow-hidden flex items-center justify-center">
        <img
          src="/images/projects/tz2/rendu_globule_rouge.png"
          alt="4D Implicit Surface Red Blood Cell Mesh F(x,y,z)=0"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (id === "aubay-anomaly") {
    return (
      <div className="w-full h-full bg-paper p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slateink">
          <span>GANDALF · Contextual ML</span>
          <span className="text-hanko">Recall 100%</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-1 font-mono">
          <div className="p-2.5 border border-ink/20 bg-washi">
            <div className="text-[10px] text-slateink">TEST F1</div>
            <div className="text-lg font-bold text-ink">F1 = 0.77</div>
          </div>
          <div className="p-2.5 bg-hanko text-paper">
            <div className="text-[10px] opacity-85">ANOMALY RECALL</div>
            <div className="text-lg font-bold">100.0%</div>
          </div>
          <div className="col-span-2 p-2 border border-ink/15 flex items-center justify-between text-[10px] text-ink">
            <span>Flask REST + Gunicorn + S3</span>
            <span className="font-bold text-hanko">Dockerized</span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-slateink border-t border-ink/10 pt-1.5 flex justify-between">
          <span>Mixed Tabular Conditioning</span>
          <span>TN09 Production</span>
        </div>
      </div>
    );
  }

  // MonLycée Relay
  return (
    <div className="w-full h-full bg-paper p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between font-mono text-[11px] font-bold text-slateink">
        <span>Zero-Trust Auth Broker</span>
        <span className="text-hanko">&lt; 50ms RAM</span>
      </div>
      <div className="space-y-2 my-1 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 border border-ink/30 bg-washi font-bold text-ink">
            Edge MV3
          </span>
          <span className="flex-1 h-px bg-ink/30" />
          <span className="px-2 py-1 bg-ink text-paper font-bold">FastAPI SSE</span>
          <span className="flex-1 h-px bg-hanko/50" />
          <span className="px-2 py-1 bg-hanko text-paper font-bold">Keycloak</span>
        </div>
        <p className="text-xs text-slateink font-sans">
          {lang === "en"
            ? "Ephemeral headless Playwright SSO negotiation — zero credentials persisted on browser storage."
            : "Négociation SSO Keycloak déportée via Playwright headless — zéro secret stocké dans le navigateur."}
        </p>
      </div>
      <div className="font-mono text-[10px] text-slateink border-t border-ink/10 pt-1.5 flex justify-between">
        <span>Oracle Cloud Host</span>
        <span>Zero Disk Tokens</span>
      </div>
    </div>
  );
}

export function EditorialProjects() {
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
    <section id="projects" className="scroll-mt-20 border-t border-ink/15 pt-14 space-y-10">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-hanko uppercase">
            <span className="font-jp">実績</span>
            <span>/</span>
            <span>02 · {lang === "en" ? "Selected Case Studies" : "Études de Cas"}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <p className="font-mono text-xs text-slateink max-w-sm">
          {lang === "en"
            ? "Select any system below to open the full technical breakdown and high-resolution figures."
            : "Sélectionnez un système pour ouvrir l'étude technique complète et ses figures haute résolution."}
        </p>
      </div>

      {/* FLAGSHIP CASE STUDY: CUSTOS OS */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        onClick={() => openProjectZoom(custos)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openProjectZoom(custos)}
        className="border border-ink/20 bg-paper/75 hover:border-hanko transition-colors p-6 sm:p-8 cursor-pointer group"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Clean Hardware Phone Mockup (Cropping out Android 19:14 & navbar chrome) + Ink Cyber Lock */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-2">
            <img
              src="/images/manga/ai-guardian.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain ink-blend opacity-25 pointer-events-none select-none"
            />
            <div className="relative z-10 w-[160px] sm:w-[175px] aspect-[9/17] rounded-[24px] border-[5px] border-ink bg-white shadow-2xl overflow-hidden group-hover:-translate-y-1 transition-transform duration-300">
              <img
                src={custos.screens[0].src}
                alt="Custos Pentagon UI"
                className="w-full h-full object-cover object-center scale-[1.09]"
              />
            </div>
          </div>

          {/* Right: Editorial Executive Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logos/custos.svg"
                  alt="Custos"
                  className="w-7 h-7 border border-ink/20 bg-white p-0.5"
                />
                <span className="font-mono text-xs font-bold tracking-widest text-hanko uppercase">
                  FLAGSHIP SYSTEM · {custos.period}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink group-hover:text-hanko transition-colors">
                <span>{lang === "en" ? "5 Live Captures" : "5 Captures Réelles"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight">
              {pick(custos.title, lang)}
            </h3>

            <p className="text-sm sm:text-base text-slateink leading-relaxed">
              {pick(custos.summary, lang)}
            </p>

            {/* 3 Hero Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-ink/15 py-4">
              <div>
                <div className="font-display font-bold text-lg sm:text-2xl text-hanko">
                  Device Owner
                </div>
                <div className="font-mono text-[11px] text-slateink">DPM &amp; AIDL IPC</div>
              </div>
              <div>
                <div className="font-display font-bold text-lg sm:text-2xl text-ink">
                  72h Lock
                </div>
                <div className="font-mono text-[11px] text-slateink">App Quarantine</div>
              </div>
              <div>
                <div className="font-display font-bold text-lg sm:text-2xl text-ink">
                  0 Telemetry
                </div>
                <div className="font-mono text-[11px] text-slateink">100% On-Device</div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-xs font-bold text-hanko">
              <span>
                {lang === "en"
                  ? "Inspect OS Architecture & Samsung Captures →"
                  : "Explorer l'Architecture OS & Captures Samsung →"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CLEAN 2-COLUMN CASE STUDY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: (idx % 2) * 0.06 }}
            onClick={() => openProjectZoom(proj)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openProjectZoom(proj)}
            className="border border-ink/20 bg-paper/75 hover:border-hanko transition-colors p-5 flex flex-col justify-between gap-4 cursor-pointer group"
          >
            {/* Unified Vector / Mesh Editorial Thumbnail */}
            <div className="h-48 sm:h-52 w-full border border-ink/15 overflow-hidden">
              <CaseVisualPreview id={proj.id} lang={lang} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-slateink">
                <span className="font-semibold text-ink">{proj.org}</span>
                <span>{proj.period}</span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-ink leading-snug group-hover:text-hanko transition-colors">
                {pick(proj.title, lang)}
              </h3>

              <p className="text-xs sm:text-sm text-slateink leading-relaxed">
                {pick(proj.summary, lang)}
              </p>

              {/* Highlight Metrics Row */}
              <div className="pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div className="flex flex-wrap gap-3 font-bold text-hanko">
                  {proj.metrics.slice(0, 2).map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-hanko">
                  <span>{lang === "en" ? "Case Study" : "Détails"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULL CASE STUDY ZOOM MODAL */}
      <MangaZoomModal
        open={Boolean(zoomProject)}
        onClose={() => setZoomProject(null)}
        eyebrow={
          zoomProject
            ? `${zoomProject.org} · ${zoomProject.period}`
            : undefined
        }
        title={zoomProject ? pick(zoomProject.title, lang) : ""}
      >
        {zoomProject && (
          <>
            {/* Interactive Carousel of Verified Project Visuals */}
            {currentScreen && (
              <div className="border border-ink/15 bg-washi p-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs font-semibold text-hanko">
                  <span>
                    {pick(copy.screensLabel, lang)} ({safeSlide + 1}/{activeScreens.length})
                  </span>
                </div>

                <div
                  className={`h-72 sm:h-96 w-full flex items-center justify-center overflow-hidden ${
                    currentScreen.isPhone ? "bg-[#141416] p-4" : "bg-white border border-ink/10 p-2"
                  }`}
                >
                  <img
                    src={currentScreen.src}
                    alt={pick(currentScreen.caption, lang)}
                    className={`max-h-full max-w-full ${
                      currentScreen.isPhone
                        ? "rounded-[20px] border-[3px] border-white/20 shadow-2xl object-contain"
                        : zoomProject.id === "monlycee-relay"
                        ? "h-full w-auto object-cover object-right-top"
                        : "object-contain"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  {activeScreens.length > 1 ? (
                    <button
                      onClick={() =>
                        setSlideIdx(
                          (p) => (p - 1 + activeScreens.length) % activeScreens.length
                        )
                      }
                      className="p-2 bg-paper border border-ink/20 hover:border-hanko transition-colors"
                      aria-label="Previous visual"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  ) : (
                    <span />
                  )}

                  <span className="font-mono text-xs font-semibold text-ink text-center">
                    {pick(currentScreen.caption, lang)}
                  </span>

                  {activeScreens.length > 1 ? (
                    <button
                      onClick={() => setSlideIdx((p) => (p + 1) % activeScreens.length)}
                      className="p-2 bg-paper border border-ink/20 hover:border-hanko transition-colors"
                      aria-label="Next visual"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            )}

            <p className="text-sm sm:text-base text-ink leading-relaxed font-medium border-l-2 border-hanko pl-4">
              {pick(zoomProject.summary, lang)}
            </p>

            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-hanko uppercase">
                {lang === "en" ? "Engineering Outcomes" : "Résultats Techniques"}
              </div>
              <ul className="space-y-2 text-sm text-ink leading-relaxed">
                {zoomProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-hanko font-bold">•</span>
                    <span>{pick(h, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-xs text-slateink">
                {zoomProject.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-washi border border-ink/15 text-ink">
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-paper font-mono text-xs font-bold hover:bg-hanko transition-colors"
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-ink/25 font-mono text-xs font-bold hover:border-hanko transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-hanko" />
                    <span>APK Release</span>
                  </a>
                )}
                {zoomProject.links?.externalLabel && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-washi border border-dashed border-ink/30 font-mono text-xs text-slateink">
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
