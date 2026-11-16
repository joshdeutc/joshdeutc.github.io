"use client";

import React from "react";
import { Mail, ExternalLink, FileText, Github, Linkedin } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function MangaFooter() {
  const { lang } = useManga();

  return (
    <footer className="sticky bottom-0 z-30 border-t-[2.5px] border-ink unified-manga-bg shrink-0">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Publisher Identity Left (Zero personal street address, zero privacy link clutter) */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-flex w-6 h-6 bg-hanko text-white font-jp font-black text-xs items-center justify-center border-2 border-ink">
              完
            </span>
            <span className="font-display font-bold text-ink uppercase">
              {UI_COPY.footer.publisher}
            </span>
            <span className="hidden md:inline px-1.5 py-0.5 bg-white border border-ink text-[10px] font-bold">
              {pick(UI_COPY.footer.location, lang)}
            </span>
          </div>

          {/* Static Footer Links Bar (Malt, GitHub, LinkedIn, Email, CVs PDF) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono font-bold">
            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-hanko text-white border-2 border-ink hover:bg-hanko-dark transition-colors shadow-manga-sm"
            >
              <img src="/images/logos/malt.svg" alt="Malt" className="w-3.5 h-3.5 rounded-sm" />
              <span>Malt</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-hanko" />
              <span className="hidden lg:inline">{PROFILE_LINKS.email}</span>
              <span className="lg:hidden">Email</span>
            </a>

            <a
              href={PROFILE_LINKS.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-hanko" />
              <span>CV (EN)</span>
            </a>

            <a
              href={PROFILE_LINKS.resumeFr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border-2 border-ink hover:bg-ink hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV (FR)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
