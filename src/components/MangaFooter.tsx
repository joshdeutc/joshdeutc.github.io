"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ExternalLink } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function MangaFooter() {
  const { lang } = useManga();

  return (
    <footer className="mt-auto border-t-[3px] border-ink bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex w-7 h-7 bg-hanko text-white font-jp font-black text-sm items-center justify-center border-2 border-ink">
                完
              </span>
              <span className="font-display font-bold text-base text-ink uppercase tracking-wide">
                {UI_COPY.footer.publisher}
              </span>
              <span className="px-2 py-0.5 bg-washi border border-ink font-mono text-[11px] font-bold">
                {pick(UI_COPY.footer.location, lang)}
              </span>
            </div>
            <p className="text-xs text-slateink font-mono">
              {pick(UI_COPY.footer.rights, lang)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold">
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-hanko" />
              <span>{PROFILE_LINKS.email}</span>
            </a>

            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi border-2 border-ink hover:bg-hanko hover:text-white transition-colors"
            >
              <span>Malt</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white border-2 border-ink hover:bg-hanko transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{pick(UI_COPY.footer.privacy, lang)}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
