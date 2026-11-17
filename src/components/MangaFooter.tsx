"use client";

import React from "react";
import { ExternalLink, FileText, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function MangaFooter() {
  return (
    <footer className="border-t border-ink/15 bg-washi">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs tracking-wider text-slateink flex items-center gap-2">
            <span className="font-jp font-bold text-hanko">創</span>
            <span>Joshua Nancey · Paris · AI, LLMs & Android OS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs font-semibold text-ink">
            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-hanko hover:underline"
            >
              <span>Malt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink/80 hover:text-ink"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink/80 hover:text-ink"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="inline-flex items-center gap-1 text-ink/80 hover:text-ink"
            >
              <Mail className="w-3.5 h-3.5 text-hanko" />
              <span>{PROFILE_LINKS.email}</span>
            </a>
            <a
              href={PROFILE_LINKS.resumeEn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink/80 hover:text-ink"
            >
              <FileText className="w-3.5 h-3.5 text-hanko" />
              <span>CV (EN)</span>
            </a>
            <a
              href={PROFILE_LINKS.resumeFr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ink/80 hover:text-ink"
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
