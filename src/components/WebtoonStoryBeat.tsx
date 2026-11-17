"use client";

import React from "react";
import { motion } from "framer-motion";
import { useManga } from "./MangaContext";
import { LocalizedText, pick } from "@/lib/i18n";

interface WebtoonStoryBeatProps {
  sceneTag: string;
  narrator: LocalizedText;
  dialogue: LocalizedText;
  sfx: string;
  artSrc: string;
  align?: "left" | "right";
}

export function WebtoonStoryBeat({
  sceneTag,
  narrator,
  dialogue,
  sfx,
  artSrc,
  align = "left",
}: WebtoonStoryBeatProps) {
  const { lang } = useManga();
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -36 : 36, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="my-10 sm:my-14 relative"
    >
      <div className="manga-sheet manga-panel overflow-hidden grid grid-cols-12 items-stretch">
        {/* Illustrated Slanted Manga Action Strip (explicit bounded height so drawing never stretches row) */}
        <div
          className={`col-span-5 relative h-28 sm:h-32 overflow-hidden bg-white ${
            isLeft
              ? "order-1 manga-slant-right border-r-2 border-ink"
              : "order-2 manga-slant-left border-l-2 border-ink"
          }`}
        >
          <img
            src={artSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <span
            className={`absolute bottom-2 px-2 py-0.5 bg-hanko text-white font-display font-black text-xs shadow ${
              isLeft ? "left-2 -rotate-3" : "right-2 rotate-3"
            }`}
          >
            {sfx}
          </span>
        </div>

        {/* Narrator Box + Adventure Story Beat Dialogue */}
        <div
          className={`col-span-7 px-3 sm:px-5 py-2.5 flex flex-col justify-center gap-1.5 ${
            isLeft ? "order-2" : "order-1"
          }`}
        >
          <div className="inline-flex items-center self-start px-2 py-0.5 bg-ink text-white font-mono text-[9px] font-bold tracking-widest uppercase">
            {sceneTag} · {pick(narrator, lang)}
          </div>
          <p className="font-display font-bold text-xs sm:text-sm text-ink leading-snug italic">
            “{pick(dialogue, lang)}”
          </p>
        </div>
      </div>
    </motion.div>
  );
}
