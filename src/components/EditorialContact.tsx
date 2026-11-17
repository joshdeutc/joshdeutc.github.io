"use client";

import React, { useState } from "react";
import { ExternalLink, FileText, Github, Linkedin, Mail, Send } from "lucide-react";
import { useManga } from "./MangaContext";
import { pick, UI_COPY } from "@/lib/i18n";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

export function EditorialContact() {
  const { lang } = useManga();
  const copy = UI_COPY.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Freelance Mission");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const mailtoHref = `mailto:${PROFILE_LINKS.email}?subject=${encodeURIComponent(
    `[Portfolio] ${subject}`
  )}&body=${encodeURIComponent(`Name: ${name}\nFrom: ${email}\n\n${message}`)}`;

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
      setErrorMsg(err instanceof Error ? err.message : "Validation error");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-ink/15 pt-14 pb-6 space-y-10"
    >
      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-hanko uppercase">
          <span className="font-jp">連絡</span>
          <span>/</span>
          <span>05 · {lang === "en" ? "Direct Collaboration" : "Contact & Collaborations"}</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink uppercase tracking-tight mt-1">
          {pick(copy.title, lang)}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Direct Pitch, Malt Flagship & Full Unclipped Email */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-sm sm:text-base text-ink/85 leading-relaxed border-l-2 border-hanko pl-4">
            {pick(copy.bubble, lang)}
          </p>

          <div className="border border-ink/20 bg-paper p-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logos/malt.svg"
                alt="Malt"
                className="w-9 h-9 border border-ink/20 rounded"
              />
              <div>
                <h3 className="font-display font-bold text-base text-ink uppercase">
                  Malt Freelance Profile
                </h3>
                <p className="font-mono text-xs text-slateink">
                  AI · LLMs · RAG · Backend FastAPI · Kotlin Android
                </p>
              </div>
            </div>

            <a
              href={PROFILE_LINKS.malt}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-hanko text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-hanko-dark transition-colors"
            >
              <span>{pick(copy.ctaMalt, lang)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Direct Channels — Full Unclipped Links */}
          <div className="space-y-2.5 text-sm">
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="flex items-center justify-between py-2.5 px-3 border border-ink/15 bg-paper hover:border-hanko transition-colors font-mono text-xs sm:text-sm font-semibold text-ink"
            >
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-hanko shrink-0" />
                <span>{PROFILE_LINKS.email}</span>
              </span>
              <span className="text-slateink text-xs">Email →</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-3 border border-ink/15 bg-paper hover:border-ink transition-colors font-mono text-xs font-semibold text-ink"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-3 border border-ink/15 bg-paper hover:border-ink transition-colors font-mono text-xs font-semibold text-ink"
              >
                <Linkedin className="w-4 h-4 shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PROFILE_LINKS.resumeEn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-3 border border-ink/15 bg-paper hover:border-hanko transition-colors font-mono text-xs font-semibold text-ink"
              >
                <FileText className="w-4 h-4 text-hanko shrink-0" />
                <span>Resume (EN)</span>
              </a>
              <a
                href={PROFILE_LINKS.resumeFr}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-3 border border-ink/15 bg-paper hover:border-ink transition-colors font-mono text-xs font-semibold text-ink"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>CV (FR)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Single-Purpose Clear Contact Form */}
        <div className="lg:col-span-7 border border-ink/20 bg-paper p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-ink/15 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-hanko uppercase">
                {lang === "en" ? "Direct Inquiry" : "Message Direct"}
              </span>
              <h3 className="font-display font-bold text-xl text-ink mt-0.5">
                {pick(copy.formTitle, lang)}
              </h3>
            </div>
            <Mail className="w-4 h-4 text-hanko" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-semibold text-ink mb-1.5">
                  {lang === "en" ? "Name / Organization *" : "Nom / Organisation *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "en" ? "Jane Doe — Acme AI" : "Jean Dupont — Société"}
                  className="w-full px-3.5 py-2.5 bg-washi border border-ink/20 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-ink mb-1.5">
                  {lang === "en" ? "Email *" : "Email *"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-washi border border-ink/20 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-semibold text-ink mb-1.5">
                {lang === "en" ? "Mission / Topic" : "Mission / Objet"}
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-washi border border-ink/20 text-sm text-ink focus:outline-none focus:border-ink"
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
              <label className="block font-mono text-xs font-semibold text-ink mb-1.5">
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
                    : "Décrivez votre projet, contexte ou besoin..."
                }
                className="w-full px-3.5 py-2.5 bg-washi border border-ink/20 text-sm text-ink focus:outline-none focus:border-ink"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-hanko transition-colors disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {status === "submitting"
                    ? lang === "en"
                      ? "Validating..."
                      : "Validation..."
                    : lang === "en"
                    ? "Validate & Generate Email"
                    : "Valider & Générer l'Email"}
                </span>
              </button>

              {status === "sent" && (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-hanko text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-hanko-dark transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>
                    {lang === "en"
                      ? "Launch Email Client Now →"
                      : "Ouvrir Messagerie Maintenant →"}
                  </span>
                </a>
              )}
            </div>

            {status === "sent" && (
              <p className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-700/30 p-3">
                {lang === "en"
                  ? "Message validated cleanly — click 'Launch Email Client Now' or email contact@joshuanancey.com directly."
                  : "Message prêt — cliquez sur « Ouvrir Messagerie Maintenant » ou écrivez directement à contact@joshuanancey.com."}
              </p>
            )}

            {status === "error" && (
              <p className="font-mono text-xs text-hanko bg-red-50 border border-hanko/30 p-3">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
