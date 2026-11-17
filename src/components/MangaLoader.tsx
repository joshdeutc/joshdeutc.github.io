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
    }, 45);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1250);

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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0B0C10] text-white flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12) 1px, transparent 1px, transparent 14px)",
            }}
          />

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md bg-white text-ink rounded-sm shadow-[0_25px_70px_rgba(214,40,40,0.28)] p-7 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-ink/15 pb-3">
              <span className="font-mono text-[11px] font-bold tracking-widest text-hanko">
                {pick(UI_COPY.loader.volume, lang)}
              </span>
              <span className="w-8 h-8 rounded-full bg-hanko text-white font-jp font-black text-sm flex items-center justify-center">
                創
              </span>
            </div>

            <div className="text-center py-4 speedlines-bg relative">
              <div className="font-display font-black text-4xl tracking-tight uppercase text-ink">
                {UI_COPY.loader.title}
              </div>
              <div className="mt-1.5 font-mono text-xs font-bold text-slateink">
                AI · LLMs · MATHEMATICAL MODELING · ANDROID OS
              </div>
              <span className="inline-block mt-3 px-2.5 py-0.5 bg-ink text-white font-display font-black text-xs rotate-2">
                DON!!
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span>{pick(UI_COPY.loader.subtitle, lang)}</span>
                <span className="text-hanko">{progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-ink/10 overflow-hidden">
                <div
                  className="h-full bg-hanko transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setVisible(false)}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-ink text-white font-mono text-xs font-bold hover:bg-hanko transition-colors"
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
