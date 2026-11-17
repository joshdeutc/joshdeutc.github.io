"use client";

import React from "react";
import { Mail, ExternalLink, FileText, Github, Linkedin } from "lucide-react";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function MangaFooter() {
  return (
    /* Static transparent bottom bar directly over the same continuous canvas — ZERO border or separate bar background */
    <footer className="relative z-30 shrink-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
            Joshua Nancey · Paris
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-mono text-[11px] font-bold tracking-wider">
            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-hanko hover:text-white transition-colors"
            >
              <img src="/images/logos/malt.svg" alt="Malt" className="w-3.5 h-3.5 rounded-sm" />
              <span>MALT</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>

            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-hanko" />
              <span className="hidden lg:inline">{PROFILE_LINKS.email}</span>
              <span className="lg:hidden">EMAIL</span>
            </a>

            <a
              href={PROFILE_LINKS.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-hanko" />
              <span>CV (EN)</span>
            </a>

            <a
              href={PROFILE_LINKS.resumeFr}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors"
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
