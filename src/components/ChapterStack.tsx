"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, ShieldCheck, Sparkles, Check } from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS, STACK_CATEGORIES, SkillItem } from "@/lib/portfolio-data";

export function ChapterStack() {
  const { lang } = useManga();
  const copy = UI_COPY.stack;

  const [activeSkill, setActiveSkill] = useState<{
    catId: string;
    skill: SkillItem;
  } | null>(null);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div className="max-w-3xl">
          <span className="inline-block px-2.5 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest mb-2">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase">
            {pick(copy.title, lang)}
          </h1>
          <p className="text-sm text-slateink mt-2 leading-relaxed">
            {pick(copy.subtitle, lang)}
          </p>
        </div>
        <HankoStamp kanji="技" size="lg" />
      </div>

      {/* 4 Talent / Arsenal Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {STACK_CATEGORIES.map((cat) => {
          const selectedInCat =
            activeSkill?.catId === cat.id ? activeSkill.skill : null;

          return (
            <div
              key={cat.id}
              className="manga-panel p-5 sm:p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 border-b-2 border-ink pb-3">
                  <div>
                    <h2 className="font-display font-black text-xl text-ink uppercase">
                      {pick(cat.title, lang)}
                    </h2>
                    <p className="text-xs text-slateink mt-0.5">
                      {pick(cat.subtitle, lang)}
                    </p>
                  </div>
                  <HankoStamp kanji={cat.kanji} size="sm" />
                </div>

                {/* Dense Real-World Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const isSelected = selectedInCat?.name === item.name;
                    return (
                      <motion.button
                        key={item.name}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          setActiveSkill(
                            isSelected ? null : { catId: cat.id, skill: item }
                          )
                        }
                        onMouseEnter={() => setActiveSkill({ catId: cat.id, skill: item })}
                        className={`px-2.5 py-1.5 font-mono text-xs font-bold border-2 border-ink transition-all flex items-center gap-1.5 ${
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

              {/* Proven-in Detail Banner */}
              <div className="p-3 border-2 border-dashed border-ink bg-washi/70 font-mono text-xs min-h-[48px] flex items-center">
                {selectedInCat ? (
                  <div>
                    <span className="font-bold text-hanko uppercase mr-2">
                      {selectedInCat.name} — {pick(copy.deployedIn, lang)}
                    </span>
                    <span className="text-ink font-semibold">
                      {pick(selectedInCat.usedIn, lang)}
                    </span>
                  </div>
                ) : (
                  <span className="text-slateink">
                    {lang === "en"
                      ? "Hover or tap any equipment badge above to inspect field deployment."
                      : "Survolez ou cliquez sur une compétence pour voir son déploiement réel."}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Summon / Hire on Malt Panel */}
      <div className="manga-panel p-6 sm:p-9 bg-paper halftone-red relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-hanko text-white font-mono text-xs font-bold border-2 border-ink">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pick(copy.summonBadge, lang)}</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-ink leading-tight">
              {pick(copy.summonTitle, lang)}
            </h2>
            <p className="text-sm sm:text-base text-slateink leading-relaxed">
              {pick(copy.summonDesc, lang)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-hanko text-white border-[2.5px] border-ink shadow-manga font-mono text-sm font-black uppercase hover:-translate-y-0.5 hover:bg-hanko-dark transition-all"
            >
              <img src="/images/logos/malt.svg" alt="Malt" className="w-5 h-5 rounded-sm" />
              <span>{pick(copy.ctaMaltPrimary, lang)}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-white border-[2.5px] border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-paper hover:text-ink transition-colors"
            >
              <Mail className="w-4 h-4 text-hanko" />
              <span>{pick(copy.ctaEmail, lang)}</span>
            </a>

            <a
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-paper text-ink border-2 border-ink font-mono text-xs font-bold hover:bg-washi transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-hanko" />
              <span>{pick(copy.ctaPrivacy, lang)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
