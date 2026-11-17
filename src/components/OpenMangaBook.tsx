"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const prevBookKeyRef = useRef(bookKey);
  const [flipSeq, setFlipSeq] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  useEffect(() => {
    if (prevBookKeyRef.current !== bookKey) {
      prevBookKeyRef.current = bookKey;
      setFlipSeq((s) => s + 1);
      setIsTurning(true);
    }
  }, [bookKey]);

  return (
    <div className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-1.5 flex-1 lg:h-full lg:min-h-0 flex flex-col justify-center">
      {/* Real Physical Tankobon Book Frame on Desktop: subtle cover backing + stacked layered paper edges */}
      <div
        className="relative lg:h-full lg:min-h-0 flex flex-col"
        style={{ perspective: "2600px" }}
      >
        {/* Outer Paperback Hardcover Bevel + Stacked Paper Edges (Desktop) */}
        <div className="relative lg:flex-1 lg:min-h-0 flex items-stretch bg-[#171923] p-[3px] lg:p-[5px] rounded-[4px] border border-white/15 shadow-[0_28px_85px_rgba(0,0,0,0.85)]">
          {/* Crimson silk bookmark ribbon peeking from bottom spine */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-2.5 h-4 bg-hanko z-0 shadow-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)" }}
            aria-hidden="true"
          />

          {/* Left Stacked Paper Page Thickness Edge */}
          <div
            className="hidden lg:block w-2.5 shrink-0 book-pages-edge-left rounded-l-[2px]"
            aria-hidden="true"
          />

          {/* Main Book Interior Container (no overflow-hidden here so preserve-3d & backface-visibility remain crisp) */}
          <div
            className="relative flex-1 lg:min-h-0 flex flex-col rounded-[2px]"
            style={{ perspective: "2400px" }}
          >
            {/* ================= TWO-SIDED 3D ILLUSTRATED PAGE-TURNING LEAF (Unmounts cleanly after flip) ================= */}
            {isTurning && (
              <motion.div
                key={`turn-sheet-${flipSeq}`}
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{
                  rotateY: direction >= 0 ? -180 : 180,
                  opacity: [1, 1, 1, 0],
                }}
                transition={{
                  duration: 0.58,
                  times: [0, 0.25, 0.85, 1],
                  ease: [0.32, 0.08, 0.24, 1],
                }}
                onAnimationComplete={() => setIsTurning(false)}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: direction >= 0 ? "left center" : "right center",
                }}
                className={`hidden lg:block pointer-events-none absolute top-0 bottom-0 w-1/2 z-30 ${
                  direction >= 0 ? "right-0" : "left-0"
                }`}
                aria-hidden="true"
              >
                {/* FRONT FACE OF TURNING PAGE: Manga Action Ink Art */}
                <div
                  className="absolute inset-0 bg-white border border-ink/25 shadow-[0_14px_45px_rgba(0,0,0,0.45)] overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/images/manga/flip-action.jpg"
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/5" />
                  <span className="absolute bottom-5 right-5 px-2.5 py-0.5 bg-ink text-white font-display font-black text-sm rotate-[-4deg] shadow">
                    {direction >= 0 ? "PARA!!" : "SHING!!"}
                  </span>
                </div>

                {/* BACK FACE OF TURNING PAGE: Storyboard Multi-Panel Ink Art */}
                <div
                  className="absolute inset-0 bg-white border border-ink/25 shadow-[0_14px_45px_rgba(0,0,0,0.45)] overflow-hidden"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/images/manga/flip-verso.jpg"
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/5" />
                  <span className="absolute bottom-5 left-5 px-2.5 py-0.5 bg-hanko text-white font-display font-black text-sm rotate-3 shadow">
                    BATAN!!
                  </span>
                </div>
              </motion.div>
            )}

            {/* ================= DOUBLE-PAGE OPEN SPREAD (Desktop) / VERTICAL PANELS (Mobile) ================= */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={bookKey}
                custom={direction}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.35 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 lg:grid-cols-2 relative flex-1 lg:min-h-0"
              >
                {/* LEFT PAGE */}
                <div className="relative manga-sheet flex flex-col lg:h-full lg:min-h-0 border-b lg:border-b-0 lg:border-r border-ink/20">
                  <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-14 book-gutter-left z-10" />

                  {/* Clickable Curled Bottom-Left Dog-Ear Corner for Previous Page */}
                  {onPrev && (
                    <button
                      onClick={onPrev}
                      title={prevLabel ?? "Previous Page"}
                      aria-label={prevLabel ?? "Previous Page"}
                      className="hidden lg:block absolute bottom-0 left-0 w-7 h-7 z-30 group cursor-pointer"
                    >
                      <span
                        className="block w-full h-full bg-gradient-to-tr from-[#e5e7eb] via-white to-[#d1d5db] border-t border-r border-ink/25 transition-all duration-200 group-hover:w-10 group-hover:h-10 group-hover:bg-hanko/15 shadow-sm"
                        style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                      />
                    </button>
                  )}

                  {/* Running Page Header */}
                  <div className="px-4 sm:px-6 pt-2 pb-1.5 border-b border-ink/10 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
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

                {/* Subtle Stitched Center Binding Fold */}
                <div
                  className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-ink/30 z-20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* RIGHT PAGE */}
                <div className="relative manga-sheet flex flex-col lg:h-full lg:min-h-0">
                  <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-14 book-gutter-right z-10" />

                  {/* Clickable Curled Bottom-Right Dog-Ear Corner for Next Page */}
                  {onNext && (
                    <button
                      onClick={onNext}
                      title={nextLabel ?? "Next Page"}
                      aria-label={nextLabel ?? "Next Page"}
                      className="hidden lg:block absolute bottom-0 right-0 w-7 h-7 z-30 group cursor-pointer"
                    >
                      <span
                        className="block w-full h-full bg-gradient-to-tl from-[#e5e7eb] via-white to-[#d1d5db] border-t border-l border-ink/25 transition-all duration-200 group-hover:w-10 group-hover:h-10 group-hover:bg-hanko/20 shadow-sm"
                        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                      />
                    </button>
                  )}

                  {/* Running Page Header */}
                  <div className="px-4 sm:px-6 pt-2 pb-1.5 border-b border-ink/10 flex items-center justify-between font-mono text-[10px] font-bold text-slateink shrink-0">
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

          {/* Right Stacked Paper Page Thickness Edge */}
          <div
            className="hidden lg:block w-2.5 shrink-0 book-pages-edge-right rounded-r-[2px]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
