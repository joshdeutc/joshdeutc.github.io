"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";

export function MangaLoader() {
  const { lang } = useManga();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + 8);
      });
    }, 55);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1450);

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-ink text-white flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Manga Speedlines Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12) 2px, transparent 2px, transparent 14px)",
            }}
          />

          {/* Centered Manga Volume Cover Card */}
          <motion.div
            initial={{ y: 20, opacity: 0, rotate: -1.5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full max-w-md bg-paper text-ink border-[3px] border-white shadow-[8px_8px_0px_0px_#D62828] p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between border-b-2 border-ink pb-3">
              <span className="font-mono text-[11px] font-bold tracking-widest text-hanko">
                {pick(UI_COPY.loader.volume, lang)}
              </span>
              <span className="w-9 h-9 rounded-full bg-hanko text-white border-2 border-ink font-jp font-black text-base flex items-center justify-center">
                創
              </span>
            </div>

            <div className="text-center py-4 speedlines-bg border-2 border-ink bg-washi/60 relative">
              <div className="font-display font-black text-4xl sm:text-5xl tracking-tight uppercase text-ink">
                {UI_COPY.loader.title}
              </div>
              <div className="mt-2 font-mono text-xs font-bold text-slateink">
                AI · LLMs · MATHEMATICAL MODELING · ANDROID OS
              </div>
              <span className="absolute -bottom-3 right-3 px-2 py-0.5 bg-ink text-white font-display font-black text-xs rotate-3">
                DON!!
              </span>
            </div>

            {/* Manga Ink Loading Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span>{pick(UI_COPY.loader.subtitle, lang)}</span>
                <span className="text-hanko">{progress}%</span>
              </div>
              <div className="h-4 w-full border-2 border-ink bg-washi p-0.5">
                <div
                  className="h-full bg-hanko transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setVisible(false)}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-ink text-white font-mono text-xs font-bold border-2 border-ink hover:bg-hanko transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{pick(UI_COPY.loader.skip, lang)}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
