"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { STACK_CATEGORIES, SkillItem } from "@/lib/portfolio-data";

export function WebtoonStack() {
  const { lang } = useManga();
  const copy = UI_COPY.stack;
  const [activeSkill, setActiveSkill] = useState<{
    catId: string;
    skill: SkillItem;
  }>({
    catId: STACK_CATEGORIES[0].id,
    skill: STACK_CATEGORIES[0].items[0],
  });

  return (
    <section id="stack" className="scroll-mt-20 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
            <span className="w-6 h-[2px] bg-hanko" />
            <span>EPISODE 04 · {lang === "en" ? "THE ARSENAL" : "L'INVENTAIRE"}</span>
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <span className="font-mono text-xs text-white/60">
          {pick(copy.subtitle, lang)}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STACK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="manga-sheet manga-panel p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-2 border-b border-ink/20 pb-2">
                <div>
                  <h3 className="font-display font-black text-base text-ink uppercase">
                    {pick(cat.title, lang)}
                  </h3>
                  <p className="text-[11px] text-slateink leading-tight">
                    {pick(cat.subtitle, lang)}
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-ink text-white font-mono text-[10px] font-black tracking-widest shrink-0">
                  SYS.{cat.code}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => {
                  const isSelected =
                    activeSkill.catId === cat.id &&
                    activeSkill.skill.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveSkill({ catId: cat.id, skill: item })}
                      onMouseEnter={() =>
                        setActiveSkill({ catId: cat.id, skill: item })
                      }
                      className={`px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-ink transition-colors flex items-center gap-1 ${
                        isSelected
                          ? "bg-hanko text-white shadow-manga-sm"
                          : "bg-washi text-ink hover:bg-ink hover:text-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Proven-In Manga Bubble + Cyber Shield Vignette */}
        <div className="manga-sheet manga-bubble p-4 flex items-center gap-4">
          <div className="hidden sm:block w-20 h-14 border-2 border-ink bg-white overflow-hidden shrink-0">
            <img
              src="/images/manga/ai-guardian.jpg"
              alt="Equipment Schematic"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-black text-hanko uppercase mb-0.5">
              {activeSkill.skill.name} — {pick(copy.deployedIn, lang)}
            </div>
            <p className="text-xs sm:text-sm font-bold text-ink">
              “{pick(activeSkill.skill.usedIn, lang)}”
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
