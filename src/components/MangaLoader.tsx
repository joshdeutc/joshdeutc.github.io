"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";

export function MangaLoader() {
  const { lang, coverMode, setCoverMode } = useManga();
  const [flipping, setFlipping] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: -6 });

  // Reset & orchestrate auto-opening sequence on entry
  useEffect(() => {
    if (coverMode === "open") {
      setFlipping(false);
      return;
    }

    if (coverMode === "auto-opening") {
      setFlipping(false);
      const tStart = setTimeout(() => setFlipping(true), 420);
      const tDone = setTimeout(() => setCoverMode("open"), 1550);
      return () => {
        clearTimeout(tStart);
        clearTimeout(tDone);
      };
    }

    // manual-closed: wait interactively for click
    setFlipping(false);
  }, [coverMode, setCoverMode]);

  const triggerManualOpen = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setCoverMode("open");
    }, 1150);
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
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="fixed inset-0 z-[100] bg-[#0B0C10] text-white flex flex-col items-center justify-center p-4 overflow-hidden select-none"
        >
          {/* Subtle halftone cosmic glow behind the Tankobon cover */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(214, 40, 40, 0.22), rgba(11, 12, 16, 0) 60%)",
            }}
          />

          {/* Interactive Skip / Hint Header */}
          <div className="relative z-20 mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-hanko animate-pulse" />
            <span>
              {flipping
                ? lang === "en"
                  ? "LEAFING VOLUME 01..."
                  : "OUVERTURE DU TOME 01..."
                : lang === "en"
                ? "INTERACTIVE TANKŌBON · CLICK COVER TO FLIP"
                : "TOME 01 INTERACTIF · CLIQUEZ POUR FEUILLETER"}
            </span>
          </div>

          {/* 3D Closed & Opening Shonen Manga Tankobon */}
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
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-[250px] sm:w-[310px] aspect-[3/4] preserve-3d shadow-[0_32px_90px_rgba(0,0,0,0.85)]"
            >
              {/* 3D Stacked White Fore-Edge Page Block (Right Edge Depth) */}
              <div
                className="absolute top-1 bottom-1 -right-2.5 w-3.5 book-pages-edge-right rounded-r-sm z-0 pointer-events-none"
                style={{ transform: "translateZ(-4px)" }}
                aria-hidden="true"
              />

              {/* Base Underlying Manga Page (Visible once cover & splash sheets swing away) */}
              <div className="absolute inset-0 bg-white border-2 border-ink rounded-r-sm overflow-hidden flex flex-col justify-between p-4 text-ink shadow-inner">
                <div className="flex items-center justify-between border-b border-ink/20 pb-2 font-mono text-[9px] font-bold">
                  <span>VOL. 01 // P.01</span>
                  <span className="text-hanko">SHONEN EDITION</span>
                </div>
                <img
                  src="/images/manga/ai-guardian.jpg"
                  alt="Manga Interior Sketch"
                  className="w-full h-48 object-contain mix-blend-multiply opacity-90"
                />
                <div className="text-center space-y-1">
                  <div className="font-display font-black text-base tracking-tight uppercase">
                    JOSHUA NANCEY
                  </div>
                  <div className="font-mono text-[9px] text-hanko font-bold">
                    PAKA!! · ENTERING CHAPTER 01
                  </div>
                </div>
              </div>

              {/* Leafing Sheet #3: Storyboard Verso Art */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -172 : 0 }}
                transition={{
                  duration: 0.45,
                  delay: flipping ? 0.36 : 0,
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
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-hanko text-white font-display font-black text-xs rotate-[-4deg]">
                    PARA!!
                  </span>
                </div>
              </motion.div>

              {/* Leafing Sheet #2: Dynamic Ink Action Splash */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -174 : 0 }}
                transition={{
                  duration: 0.45,
                  delay: flipping ? 0.22 : 0,
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
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-ink text-white font-display font-black text-xs rotate-3">
                    DON!!
                  </span>
                </div>
              </motion.div>

              {/* Leafing Sheet #1: Front Manga Tankobon Hardcover */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping ? -178 : 0 }}
                transition={{
                  duration: 0.56,
                  delay: flipping ? 0.04 : 0,
                  ease: [0.32, 0.02, 0.2, 1],
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 preserve-3d z-30"
              >
                {/* Front Illustrated Cover Face */}
                <div className="absolute inset-0 backface-hidden bg-white border-2 border-white/25 rounded-r-sm overflow-hidden flex flex-col justify-between shadow-2xl">
                  {/* Spine Hinge Crease Groove on Left */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 via-black/10 to-transparent z-20 pointer-events-none" />

                  {/* Full-Bleed Manga Cover Hero Illustration */}
                  <img
                    src="/images/manga/cover-hero.jpg"
                    alt="Joshua Nancey Manga Cover"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />

                  {/* Top Masthead Title Overlay */}
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

                  {/* Signature Red Manga Obi Wraparound Band Bottom */}
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
                              ? "OPEN & FLIP PAGES →"
                              : "OUVRIR & FEUILLETER →"}
                          </span>
                        </div>
                      </div>
                      <span className="px-1.5 py-1 bg-ink text-white font-mono text-[9px] font-black shrink-0">
                        CH.1–5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inner Inside-Cover Face (Visible briefly as cover flips left) */}
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

          {/* Direct Action Pill Below Cover */}
          <div className="relative z-20 mt-6 flex items-center gap-3">
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
