"use client";

import React from "react";
import { motion } from "framer-motion";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { STACK_CATEGORIES } from "@/lib/portfolio-data";

export function EditorialStack() {
  const { lang } = useManga();
  const copy = UI_COPY.stack;

  return (
    <section
      id="stack"
      className="scroll-mt-20 border-t border-ink/15 pt-14 space-y-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-hanko uppercase">
            <span className="font-jp">技術</span>
            <span>/</span>
            <span>04 · {lang === "en" ? "Engineering Stack" : "Inventaire Technique"}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight mt-1">
            {pick(copy.title, lang)}
          </h2>
        </div>
        <span className="font-mono text-xs text-slateink max-w-sm">
          {lang === "en"
            ? "Primary engineering weapons paired with production proof across deployed projects."
            : "Outils principaux associés à leur preuve exacte de déploiement en conditions réelles."}
        </span>
      </div>

      {/* 2x2 Readable Typographic Print Grid (Zero 9px Pill Clutter) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {STACK_CATEGORIES.map((cat, idx) => {
          const headlineItems = cat.items.slice(0, 6);
          const extendedItems = cat.items.slice(6);

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: (idx % 2) * 0.05 }}
              className="border border-ink/15 bg-paper/70 p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-3 border-b border-ink/15 pb-3">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
                    {pick(cat.title, lang)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slateink mt-0.5">
                    {pick(cat.subtitle, lang)}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-hanko shrink-0">
                  {cat.code}
                </span>
              </div>

              {/* Top 6 Core Technologies with Direct Proof Line */}
              <ul className="divide-y divide-ink/10">
                {headlineItems.map((item) => (
                  <li
                    key={item.name}
                    className="py-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs sm:text-[13px]"
                  >
                    <span className="font-semibold text-ink shrink-0">{item.name}</span>
                    <span className="font-mono text-[11px] sm:text-right text-slateink">
                      {pick(item.usedIn, lang)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Extended Tooling cleanly listed in readable mono */}
              {extendedItems.length > 0 && (
                <div className="pt-2 border-t border-ink/10 font-mono text-xs text-slateink leading-relaxed">
                  <span className="font-bold text-ink mr-1.5">
                    {lang === "en" ? "Extended:" : "Également maîtrisés :"}
                  </span>
                  {extendedItems.map((e) => e.name).join(" · ")}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
