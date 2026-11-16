"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
  ShieldCheck,
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
  const [subject, setSubject] = useState("Freelance / AI Mission");
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
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3 border-b-[2.5px] border-ink pb-3">
        <div>
          <span className="inline-block px-2 py-0.5 bg-hanko text-white font-mono text-[10px] font-bold tracking-widest mb-1">
            {pick(copy.badge, lang)}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-ink leading-none">
            {pick(copy.title, lang)}
          </h1>
        </div>
        <HankoStamp kanji="連" size="sm" />
      </div>

      {/* Protagonist Speech Bubble */}
      <div className="manga-bubble manga-bubble-bottom p-4 text-xs sm:text-sm font-medium text-ink leading-relaxed">
        “{pick(copy.bubble, lang)}”
      </div>

      {/* Malt Flagship Hire Panel */}
      <div className="manga-panel p-4 halftone-red space-y-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/logos/malt.svg"
            alt="Malt"
            className="w-10 h-10 border-2 border-ink rounded"
          />
          <div>
            <h2 className="font-display font-black text-lg text-ink uppercase">
              MALT FREELANCE PROFILE
            </h2>
            <p className="font-mono text-[11px] text-slateink font-bold">
              AI · LLMs · RAG · Backend FastAPI · Kotlin Android
            </p>
          </div>
        </div>

        <a
          href={PROFILE_LINKS.malt}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-black uppercase hover:bg-hanko-dark transition-colors"
        >
          <span>{pick(copy.ctaMalt, lang)}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Direct Channels & Resumes */}
      <div className="manga-panel p-4 space-y-3 bg-white">
        <div className="font-mono text-[10px] font-bold uppercase text-slateink">
          {pick(copy.directTitle, lang)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={`mailto:${PROFILE_LINKS.email}`}
            className="flex items-center gap-2 px-3 py-2 border-2 border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-hanko shrink-0" />
            <span className="truncate">{PROFILE_LINKS.email}</span>
          </a>

          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border-2 border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5 shrink-0" />
            <span>github.com/joshdeutc</span>
          </a>

          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border-2 border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 shrink-0" />
            <span>LinkedIn Profile</span>
          </a>

          <Link
            href="/privacy"
            className="flex items-center gap-2 px-3 py-2 border-2 border-ink bg-ink text-white font-mono text-[11px] font-bold hover:bg-hanko transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{pick(copy.ctaPrivacy, lang)}</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={PROFILE_LINKS.resumeEn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border-2 border-ink font-mono text-[11px] font-bold hover:bg-washi"
          >
            <FileText className="w-3.5 h-3.5 text-hanko" />
            <span>ATS Resume (EN)</span>
          </a>
          <a
            href={PROFILE_LINKS.resumeFr}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border-2 border-ink font-mono text-[11px] font-bold hover:bg-washi"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV Ingénieur (FR)</span>
          </a>
        </div>
      </div>
    </div>
  );

  const rightPage = (
    <div className="manga-panel p-4 sm:p-5 bg-white space-y-4">
      <div className="flex items-center justify-between border-b-2 border-ink pb-2.5">
        <div>
          <span className="font-mono text-[10px] font-bold text-hanko">
            QUEST CONTRACT // CONTACT
          </span>
          <h2 className="font-display font-black text-xl uppercase text-ink">
            {pick(copy.formTitle, lang)}
          </h2>
        </div>
        <Mail className="w-5 h-5 text-hanko" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-mono text-[11px] font-bold uppercase mb-1">
            {lang === "en" ? "Name / Organization *" : "Nom / Organisation *"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === "en" ? "Jane Doe — Acme AI" : "Jean Dupont — Société"}
            className="w-full px-3 py-2 bg-washi border-2 border-ink text-sm focus:outline-none focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] font-bold uppercase mb-1">
            {lang === "en" ? "Email *" : "Email *"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-3 py-2 bg-washi border-2 border-ink text-sm focus:outline-none focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] font-bold uppercase mb-1">
            {lang === "en" ? "Mission / Topic" : "Sujet"}
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 bg-washi border-2 border-ink text-sm focus:outline-none focus:bg-white"
          >
            <option value="Freelance / AI Mission">
              {lang === "en"
                ? "Freelance Mission (AI / LLM / Android)"
                : "Mission Freelance (IA / LLM / Android)"}
            </option>
            <option value="Full-Time Engineering Role">
              {lang === "en"
                ? "Full-Time Engineering Role"
                : "Opportunité CDI / R&D"}
            </option>
            <option value="Custos / GDPR Inquiry">
              {lang === "en"
                ? "Custos App / GDPR Question"
                : "Application Custos / Question RGPD"}
            </option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[11px] font-bold uppercase mb-1">
            {lang === "en" ? "Message *" : "Message *"}
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              lang === "en"
                ? "Describe your project, timeline or inquiry..."
                : "Décrivez votre besoin, calendrier ou question..."
            }
            className="w-full px-3 py-2 bg-washi border-2 border-ink text-sm focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 px-4 py-2 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-black uppercase hover:bg-hanko-dark transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
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
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-washi text-ink border-2 border-ink font-mono text-xs font-bold hover:bg-ink hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-hanko" />
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
