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
  const spreadVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      rotateY: dir > 0 ? 10 : -10,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      rotateY: dir > 0 ? -10 : 10,
      scale: 0.98,
    }),
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-5 flex-1 flex flex-col justify-center">
      {/* Hardcover Outer Manga Binding Frame (Desktop Double-Page Open Book) */}
      <div className="relative bg-ink p-1.5 sm:p-2 lg:p-3 border-[3px] border-ink shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
        {/* Book Cover Accent Tabs */}
        <div className="hidden lg:block absolute -top-3 left-10 px-3 py-0.5 bg-hanko text-white font-mono text-[10px] font-black border-2 border-ink z-20 tracking-widest">
          OPEN MANGA SPREAD // JOSHUA NANCEY
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={bookKey}
            custom={direction}
            variants={spreadVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1800 }}
            className="grid grid-cols-1 lg:grid-cols-2 bg-paper border-[2.5px] border-ink relative"
          >
            {/* ================= LEFT PAGE (Desktop) / TOP SECTION (Mobile Single Panel) ================= */}
            <div className="relative manga-page-paper lg:book-edge-left flex flex-col lg:h-[70vh] lg:min-h-[540px] lg:max-h-[760px] border-b-[3px] lg:border-b-0 lg:border-r-[2.5px] border-ink">
              {/* Central spine shading overlay on right edge of Left Page */}
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-16 book-gutter-left z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-6 pt-3 pb-2 border-b-2 border-ink/15 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="truncate">{leftTitle}</span>
                <span className="text-hanko font-black">{leftPageNum}</span>
              </div>

              {/* Left Page Scrollable Panel Content */}
              <div className="flex-1 overflow-y-auto manga-scroll px-4 sm:px-6 py-4">
                {leftPage}
              </div>

              {/* Left Page Bottom Corner Turn Button */}
              <div className="px-4 sm:px-6 py-2.5 border-t border-ink/15 flex items-center justify-between bg-washi/60 shrink-0">
                {onPrev ? (
                  <button
                    onClick={onPrev}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-ink font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors shadow-manga-sm"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-hanko" />
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

            {/* Center Vertical Spine Seam Badge (Desktop Only) */}
            <div
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-3 h-28 bg-ink/80 rounded-full border border-white/20 shadow-inner" />
            </div>

            {/* ================= RIGHT PAGE (Desktop) / CONTINUATION IN SINGLE PANEL (Mobile) ================= */}
            <div className="relative manga-page-paper lg:book-edge-right flex flex-col lg:h-[70vh] lg:min-h-[540px] lg:max-h-[760px]">
              {/* Central spine shading overlay on left edge of Right Page */}
              <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-16 book-gutter-right z-10" />

              {/* Running Page Header */}
              <div className="px-4 sm:px-6 pt-3 pb-2 border-b-2 border-ink/15 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
                <span className="text-hanko font-black">{rightPageNum}</span>
                <span className="truncate">{rightTitle}</span>
              </div>

              {/* Right Page Scrollable Panel Content */}
              <div className="flex-1 overflow-y-auto manga-scroll px-4 sm:px-6 py-4">
                {rightPage}
              </div>

              {/* Right Page Bottom Corner Turn Button */}
              <div className="px-4 sm:px-6 py-2.5 border-t border-ink/15 flex items-center justify-between bg-washi/60 shrink-0 relative">
                <span className="font-mono text-[10px] font-bold text-slateink">
                  {rightPageNum}
                </span>
                {onNext ? (
                  <button
                    onClick={onNext}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-hanko text-white border-2 border-ink font-mono text-[11px] font-bold hover:bg-hanko-dark transition-colors shadow-manga-sm"
                  >
                    <span>{nextLabel ?? "NEXT"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
