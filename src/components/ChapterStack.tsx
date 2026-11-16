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
      <div key={cat.id} className="manga-panel p-3 space-y-2 bg-white">
        <div className="flex items-start justify-between gap-2 border-b-2 border-ink pb-1.5">
          <div>
            <h2 className="font-display font-black text-sm sm:text-base text-ink uppercase">
              {pick(cat.title, lang)}
            </h2>
            <p className="text-[10px] text-slateink leading-tight">
              {pick(cat.subtitle, lang)}
            </p>
          </div>
          <HankoStamp kanji={cat.kanji} size="sm" />
        </div>

        <div className="flex flex-wrap gap-1">
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
                className={`px-2 py-0.5 font-mono text-[10px] font-bold border border-ink transition-colors flex items-center gap-1 ${
                  isSelected
                    ? "bg-hanko text-white shadow-manga-sm"
                    : "bg-washi text-ink hover:bg-ink hover:text-white"
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5" />}
                <span>{item.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const leftPage = (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2 border-b-[2.5px] border-ink pb-2">
        <div>
          <span className="inline-block px-2 py-0.5 bg-ink text-white font-mono text-[9px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-[11px] text-slateink mt-1">{pick(copy.subtitle, lang)}</p>
        </div>
        <HankoStamp kanji="技" size="sm" />
      </div>

      {renderCategory(0)}
      {renderCategory(1)}
    </div>
  );

  const rightPage = (
    <div className="space-y-3">
      {renderCategory(2)}
      {renderCategory(3)}

      <div className="manga-bubble p-3 bg-paper">
        <div className="font-mono text-[9px] font-black text-hanko uppercase mb-0.5">
          {activeSkill.skill.name} — {pick(copy.deployedIn, lang)}
        </div>
        <p className="text-xs font-semibold text-ink">
          “{pick(activeSkill.skill.usedIn, lang)}”
        </p>
      </div>
    </div>
  );

  return { leftPage, rightPage };
}
