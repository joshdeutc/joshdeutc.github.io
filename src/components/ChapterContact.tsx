"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { HankoStamp } from "./HankoStamp";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function useContactSpread() {
  const { lang } = useManga();
  const copy = UI_COPY.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Freelance Mission");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to validate");
    }
  };

  const mailtoHref = `mailto:${PROFILE_LINKS.email}?subject=${encodeURIComponent(
    `[Portfolio] ${subject}`
  )}&body=${encodeURIComponent(`Name: ${name}\nFrom: ${email}\n\n${message}`)}`;

  const leftPage = (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2 border-b-[2.5px] border-ink pb-2">
        <div>
          <span className="inline-block px-2 py-0.5 bg-hanko text-white font-mono text-[9px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
        </div>
        <HankoStamp kanji="連" size="sm" />
      </div>

      {/* Protagonist Speech Bubble */}
      <div className="manga-bubble p-3 text-xs font-medium text-ink leading-snug">
        “{pick(copy.bubble, lang)}”
      </div>

      {/* Malt Flagship Hire Panel */}
      <div className="manga-panel p-3 halftone-red space-y-2">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logos/malt.svg"
            alt="Malt"
            className="w-8 h-8 border-2 border-ink rounded"
          />
          <div>
            <h2 className="font-display font-black text-base text-ink uppercase">
              MALT FREELANCE PROFILE
            </h2>
            <p className="font-mono text-[10px] text-slateink font-bold">
              AI · LLMs · RAG · Backend FastAPI · Kotlin Android
            </p>
          </div>
        </div>

        <a
          href={PROFILE_LINKS.malt}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-[11px] font-black uppercase hover:bg-hanko-dark transition-colors"
        >
          <span>{pick(copy.ctaMalt, lang)}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Direct Channels & Resumes */}
      <div className="manga-panel p-3 space-y-2 bg-white">
        <div className="font-mono text-[9px] font-bold uppercase text-slateink">
          {pick(copy.directTitle, lang)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-washi font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-hanko shrink-0" />
            <span className="truncate">{PROFILE_LINKS.email}</span>
          </a>

          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-washi font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Github className="w-3 h-3 shrink-0" />
            <span>github.com/joshdeutc</span>
          </a>

          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-washi font-mono text-[10px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Linkedin className="w-3 h-3 shrink-0" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href={PROFILE_LINKS.malt}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-hanko text-white font-mono text-[10px] font-bold hover:bg-hanko-dark transition-colors"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            <span>Malt Freelance</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <a
            href={PROFILE_LINKS.resumeEn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border-2 border-ink font-mono text-[10px] font-bold hover:bg-washi"
          >
            <FileText className="w-3 h-3 text-hanko" />
            <span>ATS Resume (EN)</span>
          </a>
          <a
            href={PROFILE_LINKS.resumeFr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border-2 border-ink font-mono text-[10px] font-bold hover:bg-washi"
          >
            <FileText className="w-3 h-3" />
            <span>CV Ingénieur (FR)</span>
          </a>
        </div>
      </div>
    </div>
  );

  const rightPage = (
    <div className="manga-panel p-3.5 sm:p-4 bg-white space-y-3">
      <div className="flex items-center justify-between border-b-2 border-ink pb-2">
        <div>
          <span className="font-mono text-[9px] font-bold text-hanko">
            QUEST CONTRACT // CONTACT
          </span>
          <h2 className="font-display font-black text-lg uppercase text-ink">
            {pick(copy.formTitle, lang)}
          </h2>
        </div>
        <Mail className="w-4 h-4 text-hanko" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label className="block font-mono text-[10px] font-bold uppercase mb-0.5">
            {lang === "en" ? "Name / Organization *" : "Nom / Organisation *"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === "en" ? "Jane Doe — Acme AI" : "Jean Dupont — Société"}
            className="w-full px-2.5 py-1.5 bg-washi border-2 border-ink text-xs focus:outline-none focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold uppercase mb-0.5">
            {lang === "en" ? "Email *" : "Email *"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-2.5 py-1.5 bg-washi border-2 border-ink text-xs focus:outline-none focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold uppercase mb-0.5">
            {lang === "en" ? "Mission / Topic" : "Sujet"}
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-washi border-2 border-ink text-xs focus:outline-none focus:bg-white"
          >
            <option value="Freelance Mission">
              {lang === "en"
                ? "Freelance Mission (AI / LLM / Android)"
                : "Mission Freelance (IA / LLM / Android)"}
            </option>
            <option value="Full-Time Engineering Role">
              {lang === "en"
                ? "Full-Time Engineering Role (AI / ML / Systems)"
                : "Opportunité CDI / R&D (IA / ML / Systèmes)"}
            </option>
            <option value="Technical / Research Collaboration">
              {lang === "en"
                ? "Technical Collaboration / Research Inquiry"
                : "Collaboration Technique / Échange R&D"}
            </option>
            <option value="Other Inquiry">
              {lang === "en" ? "Other Inquiry" : "Autre demande"}
            </option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold uppercase mb-0.5">
            {lang === "en" ? "Message *" : "Message *"}
          </label>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              lang === "en"
                ? "Describe your project, timeline or inquiry..."
                : "Décrivez votre besoin, calendrier ou question..."
            }
            className="w-full px-2.5 py-1.5 bg-washi border-2 border-ink text-xs focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-0.5">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-[11px] font-black uppercase hover:bg-hanko-dark transition-colors"
          >
            <Send className="w-3 h-3" />
            <span>
              {status === "submitting"
                ? "..."
                : lang === "en"
                ? "Prepare & Send"
                : "Préparer l'envoi"}
            </span>
          </button>

          <a
            href={mailtoHref}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-washi text-ink border-2 border-ink font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-hanko" />
            <span>{lang === "en" ? "Open Email App" : "Ouvrir Messagerie"}</span>
          </a>
        </div>

        {status === "sent" && (
          <div className="p-2.5 bg-emerald-50 border-2 border-emerald-700 font-mono text-xs text-emerald-900">
            {lang === "en"
              ? "Ready! Click 'Open Email App' or send directly to contact@joshuanancey.com."
              : "Validé ! Cliquez sur « Ouvrir Messagerie » ou écrivez à contact@joshuanancey.com."}
          </div>
        )}

        {status === "error" && (
          <div className="p-2.5 bg-red-50 border-2 border-hanko font-mono text-xs text-hanko">
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );

  return { leftPage, rightPage };
}
