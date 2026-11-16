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
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-10 py-2 sm:py-3 flex-1 lg:h-full lg:min-h-0 flex flex-col justify-center">
      {/* Open Manga Book Hardcover Spine & Spread */}
      <div
        className="relative bg-ink p-1.5 sm:p-2 border-[3px] border-ink shadow-[8px_8px_0px_0px_rgba(17,17,17,0.85)] lg:h-full lg:min-h-0 flex flex-col"
        style={{ perspective: "2200px" }}
      >
        {/* 3D Animated Turning Page Sheet Overlay */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={`flip-leaf-${bookKey}-${direction}`}
            initial={{
              rotateY: 0,
              opacity: 0.96,
            }}
            animate={{
              rotateY: direction >= 0 ? -180 : 180,
              opacity: 0,
            }}
            transition={{ duration: 0.52, ease: [0.4, 0.0, 0.2, 1] }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: direction >= 0 ? "left center" : "right center",
            }}
            className={`hidden lg:block pointer-events-none absolute top-2 bottom-2 w-1/2 z-30 border-2 border-ink bg-white shadow-2xl ${
              direction >= 0 ? "right-2" : "left-2"
            }`}
            aria-hidden="true"
          >
            {/* Subtle paper halftone sheen during page turn */}
            <div className="w-full h-full halftone-subtle opacity-60 flex items-center justify-center">
              <span className="font-display font-black text-3xl text-ink/15 tracking-widest rotate-12">
                {direction >= 0 ? "PAGE TURN →" : "← PAGE TURN"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Double-Page Spread Content with smooth transition */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={bookKey}
            custom={direction}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.35 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 lg:grid-cols-2 bg-white border-[2.5px] border-ink relative lg:flex-1 lg:min-h-0"
          >
            {/* ================= LEFT PAGE (Desktop) / TOP SECTION (Mobile Single Panel) ================= */}
            <div className="relative manga-page-paper lg:book-edge-left flex flex-col lg:h-full lg:min-h-0 border-b-[3px] lg:border-b-0 lg:border-r-[2.5px] border-ink">
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-14 book-gutter-left z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-5 pt-2 pb-1.5 border-b border-ink/15 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="truncate">{leftTitle}</span>
                <span className="text-hanko font-black">{leftPageNum}</span>
              </div>

              {/* Left Page Content */}
              <div className="flex-1 lg:min-h-0 overflow-y-auto manga-scroll px-4 sm:px-5 py-2.5 sm:py-3">
                {leftPage}
              </div>

              {/* Left Page Bottom Corner Peel Turn */}
              <div className="px-4 sm:px-5 py-1.5 border-t border-ink/15 flex items-center justify-between bg-washi/80 shrink-0 relative">
                {onPrev ? (
                  <button
                    onClick={onPrev}
                    className="group inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border-2 border-ink font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-all shadow-manga-sm"
                  >
                    <ChevronLeft className="w-3 h-3 text-hanko group-hover:-translate-x-0.5 transition-transform" />
                    <span>{prevLabel ?? "PREV PAGE"}</span>
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

            {/* Center Vertical Spine Seam (Desktop Only) */}
            <div
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-2.5 h-24 bg-ink/85 rounded-full border border-white/20 shadow-inner" />
            </div>

            {/* ================= RIGHT PAGE (Desktop) / CONTINUATION IN SINGLE PANEL (Mobile) ================= */}
            <div className="relative manga-page-paper lg:book-edge-right flex flex-col lg:h-full lg:min-h-0">
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-14 book-gutter-right z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-5 pt-2 pb-1.5 border-b border-ink/15 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="text-hanko font-black">{rightPageNum}</span>
                <span className="truncate">{rightTitle}</span>
              </div>

              {/* Right Page Content */}
              <div className="flex-1 lg:min-h-0 overflow-y-auto manga-scroll px-4 sm:px-5 py-2.5 sm:py-3">
                {rightPage}
              </div>

              {/* Right Page Bottom Corner Peel Turn */}
              <div className="px-4 sm:px-5 py-1.5 border-t border-ink/15 flex items-center justify-between bg-washi/80 shrink-0 relative">
                <span className="font-mono text-[10px] font-bold text-slateink">
                  {rightPageNum}
                </span>
                {onNext ? (
                  <button
                    onClick={onNext}
                    className="group inline-flex items-center gap-1 px-3 py-0.5 bg-hanko text-white border-2 border-ink font-mono text-[10px] font-bold hover:bg-hanko-dark transition-all shadow-manga-sm"
                  >
                    <span>{nextLabel ?? "TURN PAGE"}</span>
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
