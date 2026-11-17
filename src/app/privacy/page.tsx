"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck, Lock } from "lucide-react";
import { MangaNavbar } from "@/components/MangaNavbar";
import { MangaFooter } from "@/components/MangaFooter";
import { MangaCanvasBg } from "@/components/MangaCanvasBg";
import { HankoStamp } from "@/components/HankoStamp";
import { useManga } from "@/components/MangaContext";
import { PROFILE_LINKS } from "@/lib/portfolio-data";

const PERMISSIONS_DATA = [
  {
    permission: "Accessibility Service (BIND_ACCESSIBILITY_SERVICE)",
    en: "Detects only the foreground app package name and local UI tabs targeted by Partial Access rules (e.g., hiding YouTube Shorts or WhatsApp Channels without blocking the entire app). UI nodes are evaluated exclusively in local RAM — zero screenshots, keystrokes or personal content are ever saved or transmitted.",
    fr: "Identifie uniquement l'application au premier plan et les onglets ciblés par l'Accès Partiel (ex. masquer YouTube Shorts sans bloquer l'application). Évaluation exclusivement en RAM locale : aucune capture, frappe clavier ou donnée personnelle n'est enregistrée ou transmise.",
  },
  {
    permission: "Usage Access (PACKAGE_USAGE_STATS)",
    en: "Measures foreground app usage duration strictly on-device to enforce your daily quotas and session timers.",
    fr: "Mesure localement le temps d'utilisation au premier plan pour décompter vos budgets quotidiens et limites par session.",
  },
  {
    permission: "Installed Packages Visibility (QUERY_ALL_PACKAGES)",
    en: "Displays your installed applications inside Custos so you can select which apps are subject to limits, curfew or whitelist rules. This list never leaves your phone.",
    fr: "Affiche localement la liste des applications installées pour que vous puissiez configurer vos quotas, couvre-feux ou règles de whitelist.",
  },
  {
    permission: "Device Admin / Device Owner (BIND_DEVICE_ADMIN)",
    en: "Optional enterprise-grade device policy enforcement preventing impulsive bypass or uninstallation during active lock delays.",
    fr: "Option de protection avancée (Device Owner / Admin) empêchant le contournement ou la désinstallation impulsive pendant les délais actifs.",
  },
  {
    permission: "Notifications & DND (POST_NOTIFICATIONS, BIND_NOTIFICATION_LISTENER_SERVICE, ACCESS_NOTIFICATION_POLICY)",
    en: "Displays the persistent foreground protection indicator (Android 13+) and optionally silences notifications from blocked apps during active focus or Nuclear sessions. Notification contents are never stored.",
    fr: "Affiche la notification persistante de service actif (Android 13+) et met optionnellement en sourdine les notifications des applications bloquées sans jamais en sauvegarder le contenu.",
  },
  {
    permission: "Boot, Exact Alarms & Battery Optimization (RECEIVE_BOOT_COMPLETED, SCHEDULE_EXACT_ALARM, FOREGROUND_SERVICE_SPECIAL_USE, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)",
    en: "Restores protection automatically after device reboot and keeps focus timers accurate against OS battery killing.",
    fr: "Relance automatiquement la protection après redémarrage et préserve la précision des minuteurs en arrière-plan.",
  },
  {
    permission: "Network Technical Permission (INTERNET)",
    en: "Declared strictly for local Private DNS-over-TLS connectivity verification when configured. Custos embeds zero analytics, zero advertising SDKs, and sends zero telemetry.",
    fr: "Déclarée uniquement pour les vérifications techniques de connectivité DNS privé (DoT). Custos n'embarque aucun SDK publicitaire, ni outil d'analyse ou de télémétrie.",
  },
];

export default function PrivacyPage() {
  const { lang } = useManga();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Custos GDPR / Google Play Inquiry");
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
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Could not send directly; use email below."
      );
    }
  };

  const mailtoHref = `mailto:${PROFILE_LINKS.email}?subject=${encodeURIComponent(
    `[Custos Privacy / Contact] ${subject}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nReply-To: ${email}\n\n${message}`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C10] text-white relative">
      <MangaCanvasBg />
      <MangaNavbar />

      <main className="relative z-10 text-ink flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 my-4 bg-paper border border-white/20 rounded-sm shadow-[0_24px_75px_rgba(0,0,0,0.65)] space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-hanko text-white font-mono text-xs font-bold mb-2 border border-ink">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GOOGLE PLAY CONSOLE & GDPR COMPLIANCE</span>
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-ink uppercase">
              {lang === "en"
                ? "Privacy Policy — Custos"
                : "Politique de Confidentialité — Custos"}
            </h1>
            <p className="font-mono text-xs text-slateink mt-2">
              {lang === "en"
                ? "Application: Custos (com.jo.selfcontrol.ultimate) · Publisher: Custos - Joshua Nancey · Last updated: November 2026"
                : "Application : Custos (com.jo.selfcontrol.ultimate) · Éditeur : Custos - Joshua Nancey · Mise à jour : Novembre 2026"}
            </p>
          </div>
          <HankoStamp kanji="護" size="lg" />
        </div>

        {/* Executive Zero-Data Summary */}
        <section className="manga-panel p-6 bg-paper space-y-3">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-ink">
            <Lock className="w-5 h-5 text-hanko" />
            <span>
              {lang === "en"
                ? "100% On-Device Architecture — Zero Data Collection"
                : "Architecture 100 % Locale — Zéro Collecte de Données"}
            </span>
          </div>
          <ul className="space-y-2 text-sm text-ink">
            {[
              {
                en: "Custos runs completely offline on your Android device without account creation or remote servers.",
                fr: "Custos fonctionne entièrement en local sur votre téléphone Android, sans création de compte ni serveur distant.",
              },
              {
                en: "Zero personal data, browsing history, usage statistics, or screen content are collected, sold, or shared with third parties.",
                fr: "Aucune donnée personnelle, historique de navigation ou statistique d'usage n'est collectée, vendue ou partagée avec des tiers.",
              },
              {
                en: "No advertising SDKs, no analytics trackers, and no third-party telemetry are bundled inside the APK.",
                fr: "Aucun SDK publicitaire, aucun traceur comportemental et aucun outil d'analytics n'est embarqué dans l'application.",
              },
              {
                en: "All rules, quotas and schedules remain under your sole physical control and are erased immediately if you uninstall the application or clear app storage.",
                fr: "Toutes vos règles et statistiques restent exclusivement sur votre appareil et sont immédiatement supprimées lors de la désinstallation.",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-hanko shrink-0 mt-0.5" />
                <span>{lang === "en" ? item.en : item.fr}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Publisher & Data Controller (Strictly Contact Only as requested) */}
        <section className="manga-panel p-6 space-y-3">
          <h2 className="font-display font-bold text-xl text-ink uppercase border-b-2 border-ink pb-2">
            {lang === "en"
              ? "1. Publisher & Data Protection Contact"
              : "1. Éditeur & Point de Contact Confidentialité"}
          </h2>
          <p className="text-sm text-ink leading-relaxed">
            {lang === "en"
              ? "The mobile application Custos (package com.jo.selfcontrol.ultimate) and this privacy hub (joshuanancey.com/privacy) are published by Custos - Joshua Nancey (Paris, France)."
              : "L'application mobile Android Custos (package com.jo.selfcontrol.ultimate) et la présente page (joshuanancey.com/privacy) sont éditées par Custos - Joshua Nancey (Paris, France)."}
          </p>
          <p className="text-sm font-mono font-bold text-ink">
            {lang === "en" ? "Direct Contact:" : "Contact direct :"}{" "}
            <a
              href={`mailto:${PROFILE_LINKS.email}`}
              className="text-hanko underline hover:text-ink"
            >
              {PROFILE_LINKS.email}
            </a>
          </p>
        </section>

        {/* Permissions Breakdown */}
        <section className="manga-panel p-6 space-y-4">
          <h2 className="font-display font-bold text-xl text-ink uppercase border-b-2 border-ink pb-2">
            {lang === "en"
              ? "2. Android Permissions Transparency"
              : "2. Transparence sur les Permissions Android"}
          </h2>
          <div className="space-y-3">
            {PERMISSIONS_DATA.map((p) => (
              <div
                key={p.permission}
                className="p-4 border-2 border-ink bg-washi/70 space-y-1.5"
              >
                <div className="font-mono text-xs font-bold text-hanko">
                  {p.permission}
                </div>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  {lang === "en" ? p.en : p.fr}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* GDPR Rights & Children Protection */}
        <section className="manga-panel p-6 space-y-3">
          <h2 className="font-display font-bold text-xl text-ink uppercase border-b-2 border-ink pb-2">
            {lang === "en"
              ? "3. GDPR Rights, Data Retention & Security"
              : "3. Vos Droits RGPD, Conservation & Sécurité"}
          </h2>
          <p className="text-sm text-ink leading-relaxed">
            {lang === "en"
              ? "Under GDPR (EU Regulation 2016/679), because Custos collects and stores zero user data on external servers, we hold no personal user database to export or delete remotely. All preferences reside locally in encrypted Android app storage. For any privacy inquiry, Google Play compliance verification, or freelance mission request, contact us via the form below or by email at contact@joshuanancey.com."
              : "Conformément au RGPD (Règlement UE 2016/679), Custos ne stockant aucune donnée sur un serveur distant, aucune base utilisateur externe n'est conservée. Vos configurations résident localement sur votre appareil. Pour toute question relative à la confidentialité, à la vérification Google Play ou à un projet, utilisez le formulaire ci-dessous ou écrivez à contact@joshuanancey.com."}
          </p>
        </section>

        {/* Interactive Contact & GDPR Request Form */}
        <section id="contact-form" className="manga-panel p-6 sm:p-8 space-y-5 bg-paper">
          <div className="flex items-center justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="font-display font-black text-2xl text-ink uppercase">
                {lang === "en"
                  ? "4. Contact & GDPR Inquiry Form"
                  : "4. Formulaire de Contact & Demandes RGPD"}
              </h2>
              <p className="text-xs text-slateink mt-1">
                {lang === "en"
                  ? "Reach Joshua Nancey directly regarding Custos, GDPR rights, or engineering missions."
                  : "Contactez directement Joshua Nancey concernant Custos, vos droits RGPD ou une mission."}
              </p>
            </div>
            <Mail className="w-6 h-6 text-hanko shrink-0" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  {lang === "en" ? "Name / Organization *" : "Nom / Organisation *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "en" ? "Your name" : "Votre nom"}
                  className="w-full px-3 py-2.5 bg-washi border-2 border-ink font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  {lang === "en" ? "Email Address *" : "Adresse Email *"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2.5 bg-washi border-2 border-ink font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                {lang === "en" ? "Subject" : "Objet"}
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 bg-washi border-2 border-ink font-sans text-sm focus:outline-none focus:bg-white"
              >
                <option value="Custos GDPR / Google Play Inquiry">
                  Custos — GDPR / Google Play Inquiry
                </option>
                <option value="Custos Bug Report / Feedback">
                  Custos — Technical Feedback
                </option>
                <option value="Malt / Engineering Mission">
                  Engineering / AI Mission Inquiry
                </option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase mb-1">
                {lang === "en" ? "Message *" : "Message *"}
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Write your message here..."
                    : "Écrivez votre message ici..."
                }
                className="w-full px-3 py-2.5 bg-washi border-2 border-ink font-sans text-sm focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-hanko text-white border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-hanko-dark disabled:opacity-60 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status === "submitting"
                    ? lang === "en"
                      ? "Validating..."
                      : "Validation..."
                    : lang === "en"
                    ? "Submit Request"
                    : "Envoyer la demande"}
                </span>
              </button>

              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-paper text-ink border-2 border-ink shadow-manga-sm font-mono text-xs font-bold hover:bg-washi transition-colors"
              >
                <Mail className="w-4 h-4 text-hanko" />
                <span>
                  {lang === "en"
                    ? "Open in Email Client (contact@joshuanancey.com)"
                    : "Ouvrir dans votre messagerie"}
                </span>
              </a>
            </div>

            {status === "sent" && (
              <div className="p-3 bg-emerald-50 border-2 border-emerald-700 font-mono text-xs text-emerald-900 space-y-1">
                <div className="font-bold">
                  {lang === "en"
                    ? "Request validated cleanly."
                    : "Demande validée avec succès."}
                </div>
                <div>
                  {lang === "en"
                    ? "Your inquiry has been formatted. Click the Email Client button above or email contact@joshuanancey.com directly for instant delivery."
                    : "Votre message est prêt. Cliquez sur « Ouvrir dans votre messagerie » ou écrivez directement à contact@joshuanancey.com pour envoi immédiat."}
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 bg-red-50 border-2 border-hanko font-mono text-xs text-hanko">
                {errorMsg}
              </div>
            )}
          </form>
        </section>
      </main>

      <MangaFooter />
    </div>
  );
}
