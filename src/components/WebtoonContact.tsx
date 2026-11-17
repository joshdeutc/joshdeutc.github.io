"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function WebtoonContact() {
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

  return (
    <section id="contact" className="scroll-mt-20 space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
          <span className="w-6 h-[2px] bg-hanko" />
          <span>EPISODE 05 · FINALE & CONTACT</span>
        </span>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mt-1">
          {pick(copy.title, lang)}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-5"
      >
        {/* Left: Protagonist Art + Malt CTA + Direct Links */}
        <div className="md:col-span-6 space-y-4">
          <div className="manga-sheet manga-panel p-4 grid grid-cols-12 gap-3 items-center">
            <div className="col-span-4 h-28 border-2 border-ink bg-white overflow-hidden relative">
              <img
                src="/images/manga/cover-hero.jpg"
                alt="Manga Protagonist"
                className="w-full h-full object-cover object-[50%_62%]"
              />
              <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-ink/85 text-white font-mono text-[8px] font-bold">
                READY
              </span>
            </div>
            <div className="col-span-8 manga-bubble md:manga-bubble-left p-3 text-xs font-medium text-ink leading-snug">
              “{pick(copy.bubble, lang)}”
            </div>
          </div>

          <div className="manga-sheet manga-panel p-4 halftone-red space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/logos/malt.svg"
                alt="Malt"
                className="w-9 h-9 border-2 border-ink rounded"
              />
              <div>
                <h3 className="font-display font-black text-base text-ink uppercase">
                  MALT FREELANCE PROFILE
                </h3>
                <p className="font-mono text-[10px] text-slateink font-bold">
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
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="manga-sheet manga-panel p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="flex items-center gap-2 px-3 py-2 border border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-hanko shrink-0" />
              <span className="truncate">{PROFILE_LINKS.email}</span>
            </a>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 shrink-0" />
              <span>github.com/joshdeutc</span>
            </a>
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-ink bg-washi font-mono text-[11px] font-bold hover:bg-ink hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 shrink-0" />
              <span>LinkedIn Profile</span>
            </a>
            <div className="flex gap-1.5">
              <a
                href={PROFILE_LINKS.resumeEn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 bg-paper border border-ink font-mono text-[10px] font-bold hover:bg-washi"
              >
                <FileText className="w-3 h-3 text-hanko" />
                <span>CV EN</span>
              </a>
              <a
                href={PROFILE_LINKS.resumeFr}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 bg-paper border border-ink font-mono text-[10px] font-bold hover:bg-washi"
              >
                <FileText className="w-3 h-3" />
                <span>CV FR</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:col-span-6 manga-sheet manga-panel p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-ink/20 pb-2">
            <div>
              <span className="font-mono text-[9px] font-bold text-hanko">
                QUEST CONTRACT // CONTACT
              </span>
              <h3 className="font-display font-black text-lg uppercase text-ink">
                {pick(copy.formTitle, lang)}
              </h3>
            </div>
            <Mail className="w-4 h-4 text-hanko" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                {lang === "en" ? "Name / Organization *" : "Nom / Organisation *"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "en" ? "Jane Doe — Acme AI" : "Jean Dupont — Société"}
                className="w-full px-3 py-2 bg-washi border border-ink text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                {lang === "en" ? "Email *" : "Email *"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 bg-washi border border-ink text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                {lang === "en" ? "Mission / Topic" : "Mission / Objet"}
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-washi border border-ink text-xs focus:outline-none focus:bg-white"
              >
                <option value="Freelance Mission">
                  {lang === "en"
                    ? "Freelance Mission (AI / LLM / Android)"
                    : "Mission Freelance (IA / LLM / Android)"}
                </option>
                <option value="Full-Time Engineering Role">
                  {lang === "en"
                    ? "Full-Time Engineering Role"
                    : "Poste Ingénieur CDI / R&D"}
                </option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                {lang === "en" ? "Message *" : "Message *"}
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Describe your project, timeline or inquiry..."
                    : "Décrivez votre projet, mission ou question..."
                }
                className="w-full px-3 py-2 bg-washi border border-ink text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-hanko text-white border border-ink shadow-manga-sm font-mono text-xs font-black uppercase hover:bg-hanko-dark transition-colors disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {status === "submitting"
                    ? lang === "en"
                      ? "Sending..."
                      : "Envoi..."
                    : lang === "en"
                    ? "PREPARE & SEND"
                    : "PRÉPARER L'ENVOI"}
                </span>
              </button>

              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-ink font-mono text-xs font-bold hover:bg-washi transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-hanko" />
                <span>{lang === "en" ? "Open Email App" : "Ouvrir Messagerie"}</span>
              </a>
            </div>

            {status === "sent" && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-700 font-mono text-[11px] text-emerald-900">
                {lang === "en"
                  ? "Validated cleanly. Click 'Open Email App' or send directly to contact@joshuanancey.com."
                  : "Message validé. Cliquez sur « Ouvrir Messagerie » ou écrivez directement à contact@joshuanancey.com."}
              </div>
            )}

            {status === "error" && (
              <div className="p-2.5 bg-red-50 border border-hanko font-mono text-[11px] text-hanko">
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}
