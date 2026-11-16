"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { STACK_CATEGORIES, SkillItem } from "@/lib/portfolio-data";

export function useStackSpread() {
  const { lang } = useManga();
  const copy = UI_COPY.stack;
  const [activeSkill, setActiveSkill] = useState<{
    catId: string;
    skill: SkillItem;
  }>({
    catId: STACK_CATEGORIES[0].id,
    skill: STACK_CATEGORIES[0].items[0],
  });

  const renderCategory = (catIdx: number) => {
    const cat = STACK_CATEGORIES[catIdx];
    return (
      <div key={cat.id} className="manga-panel p-4 space-y-3 bg-white">
        <div className="flex items-start justify-between gap-2 border-b-2 border-ink pb-2">
          <div>
            <h2 className="font-display font-black text-base sm:text-lg text-ink uppercase">
              {pick(cat.title, lang)}
            </h2>
            <p className="text-[11px] text-slateink">{pick(cat.subtitle, lang)}</p>
          </div>
          <HankoStamp kanji={cat.kanji} size="sm" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cat.items.map((item) => {
            const isSelected =
              activeSkill.catId === cat.id && activeSkill.skill.name === item.name;
            return (
              <motion.button
                key={item.name}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveSkill({ catId: cat.id, skill: item })}
                onMouseEnter={() => setActiveSkill({ catId: cat.id, skill: item })}
                className={`px-2 py-1 font-mono text-[11px] font-bold border-2 border-ink transition-colors flex items-center gap-1 ${
                  isSelected
                    ? "bg-hanko text-white shadow-manga-sm"
                    : "bg-washi text-ink hover:bg-ink hover:text-white"
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{item.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const leftPage = (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 border-b-[2.5px] border-ink pb-3">
        <div>
          <span className="inline-block px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-xs text-slateink mt-1">{pick(copy.subtitle, lang)}</p>
        </div>
        <HankoStamp kanji="技" size="sm" />
      </div>

      {renderCategory(0)}
      {renderCategory(1)}
    </div>
  );

  const rightPage = (
    <div className="space-y-4">
      {renderCategory(2)}
      {renderCategory(3)}

      {/* Proven-In Manga Dialogue Inspector */}
      <div className="manga-bubble p-4 bg-paper">
        <div className="font-mono text-[10px] font-black text-hanko uppercase mb-1">
          {activeSkill.skill.name} — {pick(copy.deployedIn, lang)}
        </div>
        <p className="text-xs sm:text-sm font-semibold text-ink">
          “{pick(activeSkill.skill.usedIn, lang)}”
        </p>
      </div>
    </div>
  );

  return { leftPage, rightPage };
}
