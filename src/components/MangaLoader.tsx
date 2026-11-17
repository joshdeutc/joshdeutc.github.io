"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";

export function MangaLoader() {
  const { lang, coverMode, setCoverMode } = useManga();
  const [flipping, setFlipping] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: -5 });

  useEffect(() => {
    if (coverMode === "open") {
      setFlipping(false);
      return;
    }

    if (coverMode === "auto-opening") {
      setFlipping(false);
      const tStart = setTimeout(() => setFlipping(true), 320);
      const tDone = setTimeout(() => setCoverMode("open"), 1300);
      return () => {
        clearTimeout(tStart);
        clearTimeout(tDone);
      };
    }

    setFlipping(false);
  }, [coverMode, setCoverMode]);

  const triggerManualOpen = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setCoverMode("open");
    }, 950);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -ny * 10,
      ry: nx * 12 - 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: -5 });
  };

  const isVisible = coverMode !== "open";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: coverMode === "manual-closed" ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="fixed inset-0 z-[100] bg-[#0B0C10] text-white flex flex-col items-center justify-center p-4 overflow-hidden select-none"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(214, 40, 40, 0.22), rgba(11, 12, 16, 0) 60%)",
            }}
          />

          <div className="relative z-20 mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-hanko animate-pulse" />
            <span>
              {flipping
                ? lang === "en"
                  ? "UNROLLING WEBTOON EDITION..."
                  : "OUVERTURE DU WEBTOON..."
                : lang === "en"
                ? "VOL. 01 · CLICK COVER TO ENTER"
                : "TOME 01 · CLIQUEZ POUR ENTRER"}
            </span>
          </div>

          <div
            onClick={
              coverMode === "manual-closed"
                ? triggerManualOpen
                : () => setCoverMode("open")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (coverMode === "manual-closed") triggerManualOpen();
                else setCoverMode("open");
              }
            }}
            className="relative cursor-pointer group"
            style={{ perspective: "2200px" }}
          >
            <motion.div
              animate={{
                rotateX: flipping ? 2 : tilt.rx,
                rotateY: flipping ? 4 : tilt.ry,
                scale: flipping ? 1.04 : 1,
              }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
              className="relative w-[245px] sm:w-[300px] aspect-[3/4] preserve-3d shadow-[0_32px_90px_rgba(0,0,0,0.85)]"
            >
              <div
                className="absolute top-1 bottom-1 -right-2.5 w-3.5 book-pages-edge-right rounded-r-sm z-0 pointer-events-none"
                style={{ transform: "translateZ(-4px)" }}
                aria-hidden="true"
              />

              {/* Base Manga Interior Page */}
              <div className="absolute inset-0 bg-white border-2 border-ink rounded-r-sm overflow-hidden flex flex-col justify-between p-4 text-ink shadow-inner">
                <div className="flex items-center justify-between border-b border-ink/20 pb-2 font-mono text-[9px] font-bold">
                  <span>WEBTOON EDITION</span>
                  <span className="text-hanko">EP. 01–05</span>
                </div>
                <img
                  src="/images/manga/ai-guardian.jpg"
                  alt="Manga Interior Sketch"
                  className="w-full h-44 object-contain mix-blend-multiply opacity-90"
                />
                <div className="text-center space-y-0.5">
                  <div className="font-display font-black text-base tracking-tight uppercase">
                    JOSHUA NANCEY
                  </div>
                  <div className="font-mono text-[9px] text-hanko font-bold">
                    SCROLL TO READ ↓
                  </div>
                </div>
              </div>

              {/* Leafing Sheet #2: Storyboard Art */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -172 : 0 }}
                transition={{
                  duration: 0.4,
                  delay: flipping ? 0.24 : 0,
                  ease: [0.35, 0.05, 0.2, 1],
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 preserve-3d z-10 pointer-events-none"
              >
                <div className="absolute inset-0 backface-hidden bg-white border border-ink/40 rounded-r-sm overflow-hidden">
                  <img
                    src="/images/manga/flip-verso.jpg"
                    alt="Storyboard Splash"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Leafing Sheet #1: Action Splash */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -175 : 0 }}
                transition={{
                  duration: 0.4,
                  delay: flipping ? 0.14 : 0,
                  ease: [0.35, 0.05, 0.2, 1],
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 preserve-3d z-20 pointer-events-none"
              >
                <div className="absolute inset-0 backface-hidden bg-white border border-ink/40 rounded-r-sm overflow-hidden">
                  <img
                    src="/images/manga/flip-action.jpg"
                    alt="Manga Action Splash"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Front Illustrated Cover */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -178 : 0 }}
                transition={{
                  duration: 0.5,
                  delay: flipping ? 0.02 : 0,
                  ease: [0.32, 0.02, 0.2, 1],
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 preserve-3d z-30"
              >
                <div className="absolute inset-0 backface-hidden bg-white border-2 border-white/25 rounded-r-sm overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 via-black/10 to-transparent z-20 pointer-events-none" />

                  <img
                    src="/images/manga/cover-hero.jpg"
                    alt="Joshua Nancey Manga Cover"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />

                  <div className="relative z-10 p-3.5 bg-gradient-to-b from-black/95 via-black/75 to-transparent text-white">
                    <div className="flex items-center justify-between font-mono text-[9px] font-bold tracking-[0.2em]">
                      <span className="px-1.5 py-0.5 bg-hanko text-white font-black">
                        VOL. 01
                      </span>
                      <span className="px-1.5 py-0.5 bg-black/75 border border-white/30">
                        2026 EDITION
                      </span>
                    </div>
                    <h2 className="font-display font-black text-2xl sm:text-[26px] tracking-tight leading-none mt-1.5 drop-shadow">
                      {UI_COPY.loader.title}
                    </h2>
                  </div>

                  <div className="relative z-10 mx-2 mb-2 p-2.5 bg-hanko text-white border-2 border-ink shadow-manga-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-mono text-[8px] font-black tracking-widest opacity-90 uppercase">
                          AI · LLMs · MATH MOD&apos;MATH · ANDROID
                        </div>
                        <div className="font-display font-black text-xs sm:text-sm leading-tight mt-0.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {lang === "en"
                              ? "OPEN & READ WEBTOON →"
                              : "OUVRIR LE WEBTOON →"}
                          </span>
                        </div>
                      </div>
                      <span className="px-1.5 py-1 bg-ink text-white font-mono text-[9px] font-black shrink-0">
                        EP.1–5
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 backface-hidden bg-[#161820] border border-white/20 rounded-l-sm flex items-center justify-center p-6 text-center"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="border border-white/20 p-4 w-full h-full flex flex-col items-center justify-center space-y-2 text-white/80 font-mono">
                    <span className="text-[10px] tracking-[0.25em] text-hanko font-bold">
                      EX LIBRIS
                    </span>
                    <span className="font-display font-black text-lg text-white">
                      JOSHUA NANCEY
                    </span>
                    <span className="text-[9px] opacity-60">PARIS · UTC IAD</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-20 mt-6">
            {coverMode === "manual-closed" ? (
              <button
                onClick={triggerManualOpen}
                className="inline-flex items-center gap-2 px-5 py-2 bg-hanko text-white font-mono text-xs font-black tracking-wider hover:bg-hanko-dark transition-colors shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                <span>{pick(UI_COPY.loader.skip, lang)}</span>
              </button>
            ) : (
              <button
                onClick={() => setCoverMode("open")}
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/25 text-white/80 hover:text-white hover:border-hanko font-mono text-[11px] font-bold tracking-wider transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-hanko" />
                <span>{pick(UI_COPY.loader.skip, lang)}</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
