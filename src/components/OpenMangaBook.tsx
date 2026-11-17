"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OpenMangaBookProps {
  bookKey: string;
  direction: number;
  leftTitle: string;
  rightTitle: string;
  leftPageNum: string;
  rightPageNum: string;
  leftPage: React.ReactNode;
  rightPage: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
}

export function OpenMangaBook({
  bookKey,
  direction,
  leftTitle,
  rightTitle,
  leftPageNum,
  rightPageNum,
  leftPage,
  rightPage,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: OpenMangaBookProps) {
  return (
    <div className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-2 flex-1 lg:h-full lg:min-h-0 flex flex-col justify-center">
      {/* Floating Open Manga Book (no heavy dark outer slab framing) */}
      <div
        className="relative lg:h-full lg:min-h-0 flex flex-col"
        style={{ perspective: "2400px" }}
      >
        {/* Realistic 3D Turning Page Animation Sheet */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`turn-sheet-${bookKey}-${direction}`}
            initial={{
              rotateY: 0,
              opacity: 0.96,
            }}
            animate={{
              rotateY: direction >= 0 ? -180 : 180,
              opacity: 0,
            }}
            transition={{ duration: 0.56, ease: [0.35, 0.0, 0.2, 1] }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: direction >= 0 ? "left center" : "right center",
            }}
            className={`hidden lg:flex pointer-events-none absolute top-0 bottom-0 w-1/2 z-30 bg-white border border-ink/30 shadow-[0_12px_40px_rgba(0,0,0,0.45)] items-center justify-center ${
              direction >= 0 ? "right-0 rounded-r-sm" : "left-0 rounded-l-sm"
            }`}
            aria-hidden="true"
          >
            <div className="w-full h-full halftone-subtle opacity-60 flex items-center justify-center">
              <span className="font-display font-black text-3xl text-ink/15 tracking-widest">
                {direction >= 0 ? "NEXT SPREAD →" : "← PREV SPREAD"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Double-Page Open Spread floating smoothly on the unified canvas */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={bookKey}
            custom={direction}
            initial={{ opacity: 0.4, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.99 }}
            transition={{ duration: 0.24 }}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-sm shadow-[0_24px_75px_rgba(0,0,0,0.65)] relative lg:flex-1 lg:min-h-0 overflow-hidden border border-white/20"
          >
            {/* ================= LEFT PAGE (Desktop) / SINGLE PANEL TOP (Mobile) ================= */}
            <div className="relative manga-sheet flex flex-col lg:h-full lg:min-h-0 border-b lg:border-b-0 lg:border-r border-ink/20">
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-14 book-gutter-left z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-6 pt-2.5 pb-1.5 border-b border-ink/10 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="truncate">{leftTitle}</span>
                <span className="text-hanko font-black">{leftPageNum}</span>
              </div>

              {/* Left Page Manga Panels Content */}
              <div className="flex-1 lg:min-h-0 overflow-y-auto manga-scroll px-4 sm:px-6 py-2.5 sm:py-3">
                {leftPage}
              </div>

              {/* Left Page Turn Footer */}
              <div className="px-4 sm:px-6 py-1.5 flex items-center justify-between shrink-0 bg-ink/[0.02]">
                {onPrev ? (
                  <button
                    onClick={onPrev}
                    className="group inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-ink font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-all shadow-manga-sm"
                  >
                    <ChevronLeft className="w-3 h-3 text-hanko group-hover:-translate-x-0.5 transition-transform" />
                    <span>{prevLabel ?? "PREV"}</span>
                  </button>
                ) : (
                  <span className="font-mono text-[10px] font-bold text-slateink">
                    VOL. 01 · OPENING
                  </span>
                )}
                <span className="font-mono text-[10px] font-bold text-slateink">
                  {leftPageNum}
                </span>
              </div>
            </div>

            {/* Subtle Center Binding Crease */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-ink/25 z-20 pointer-events-none"
              aria-hidden="true"
            />

            {/* ================= RIGHT PAGE (Desktop) / SINGLE PANEL BOTTOM (Mobile) ================= */}
            <div className="relative manga-sheet flex flex-col lg:h-full lg:min-h-0">
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-14 book-gutter-right z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-6 pt-2.5 pb-1.5 border-b border-ink/10 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="text-hanko font-black">{rightPageNum}</span>
                <span className="truncate">{rightTitle}</span>
              </div>

              {/* Right Page Manga Panels Content */}
              <div className="flex-1 lg:min-h-0 overflow-y-auto manga-scroll px-4 sm:px-6 py-2.5 sm:py-3">
                {rightPage}
              </div>

              {/* Right Page Turn Footer */}
              <div className="px-4 sm:px-6 py-1.5 flex items-center justify-between shrink-0 bg-ink/[0.02]">
                <span className="font-mono text-[10px] font-bold text-slateink">
                  {rightPageNum}
                </span>
                {onNext ? (
                  <button
                    onClick={onNext}
                    className="group inline-flex items-center gap-1 px-3 py-0.5 bg-hanko text-white border border-ink font-mono text-[10px] font-bold hover:bg-hanko-dark transition-all shadow-manga-sm"
                  >
                    <span>{nextLabel ?? "NEXT"}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <span className="font-mono text-[10px] font-bold text-hanko">
                    FIN · END OF VOL.01
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
