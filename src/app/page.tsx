"use client";

import React, { useEffect } from "react";
import { MangaLoader } from "@/components/MangaLoader";
import { MangaNavbar } from "@/components/MangaNavbar";
import { MangaFooter } from "@/components/MangaFooter";
import { OpenMangaBook } from "@/components/OpenMangaBook";
import { useAboutSpread } from "@/components/ChapterAbout";
import { useProjectsSpread } from "@/components/ChapterProjects";
import { useExperienceSpread } from "@/components/ChapterExperience";
import { useStackSpread } from "@/components/ChapterStack";
import { useContactSpread } from "@/components/ChapterContact";
import { CHAPTER_ORDER, useManga } from "@/components/MangaContext";

export default function HomePage() {
  const { activeChapter, direction, navigateChapter, lang } = useManga();

  const about = useAboutSpread();
  const projects = useProjectsSpread();
  const experience = useExperienceSpread();
  const stack = useStackSpread();
  const contact = useContactSpread();

  const currentIdx = CHAPTER_ORDER.indexOf(activeChapter);
  const prevChapter = currentIdx > 0 ? CHAPTER_ORDER[currentIdx - 1] : null;
  const nextChapter =
    currentIdx < CHAPTER_ORDER.length - 1 ? CHAPTER_ORDER[currentIdx + 1] : null;

  const handlePrev = () => {
    if (activeChapter === "experience" && experience.spreadIdx === 1) {
      experience.setSpreadIdx(0);
      return;
    }
    if (prevChapter) {
      navigateChapter(prevChapter);
    }
  };

  const handleNext = () => {
    if (activeChapter === "experience" && experience.spreadIdx === 0) {
      experience.setSpreadIdx(1);
      return;
    }
    if (nextChapter) {
      navigateChapter(nextChapter);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const spreadConfig = {
    about: {
      bookKey: "about",
      leftTitle: "CH.01 // THE PROTAGONIST",
      rightTitle: "EDUCATION & OFF-SCREEN",
      leftPageNum: "P.02",
      rightPageNum: "P.03",
      leftPage: about.leftPage,
      rightPage: about.rightPage,
      prevLabel: undefined,
      nextLabel: lang === "en" ? "CH.02: PROJECTS" : "CH.02 : PROJETS",
    },
    projects: {
      bookKey: "projects",
      leftTitle: "CH.02 // QUEST ARCHIVE",
      rightTitle: "INSPECTED QUEST",
      leftPageNum: "P.04",
      rightPageNum: "P.05",
      leftPage: projects.leftPage,
      rightPage: projects.rightPage,
      prevLabel: lang === "en" ? "CH.01: ABOUT" : "CH.01 : À PROPOS",
      nextLabel: lang === "en" ? "CH.03: EXPERIENCE" : "CH.03 : EXPÉRIENCE",
    },
    experience: {
      bookKey: `experience-${experience.spreadIdx}`,
      leftTitle: "CH.03 // CHRONOLOGICAL ARC",
      rightTitle:
        experience.spreadIdx === 0
          ? "EPICONCEPT R&D (TN10)"
          : "COMPLÉTUDE TUTORING",
      leftPageNum: experience.spreadIdx === 0 ? "P.06" : "P.08",
      rightPageNum: experience.spreadIdx === 0 ? "P.07" : "P.09",
      leftPage: experience.leftPage,
      rightPage: experience.rightPage,
      prevLabel:
        experience.spreadIdx === 1
          ? lang === "en"
            ? "SPREAD 1/2"
            : "PAGE 1/2"
          : lang === "en"
          ? "CH.02: PROJECTS"
          : "CH.02 : PROJETS",
      nextLabel:
        experience.spreadIdx === 0
          ? lang === "en"
            ? "SPREAD 2/2 (2022–2025)"
            : "PAGE 2/2 (2022–2025)"
          : lang === "en"
          ? "CH.04: STACK"
          : "CH.04 : STACK",
    },
    stack: {
      bookKey: "stack",
      leftTitle: "CH.04 // AI & SCIENTIFIC ARSENAL",
      rightTitle: "MOBILE OS & CLOUD INFRA",
      leftPageNum: "P.10",
      rightPageNum: "P.11",
      leftPage: stack.leftPage,
      rightPage: stack.rightPage,
      prevLabel: lang === "en" ? "CH.03: EXPERIENCE" : "CH.03 : EXPÉRIENCE",
      nextLabel: lang === "en" ? "CH.05: CONTACT" : "CH.05 : CONTACT",
    },
    contact: {
      bookKey: "contact",
      leftTitle: "CH.05 // MALT & DIRECT LINKS",
      rightTitle: "CONTRACT & MESSAGE PANEL",
      leftPageNum: "P.12",
      rightPageNum: "P.13",
      leftPage: contact.leftPage,
      rightPage: contact.rightPage,
      prevLabel: lang === "en" ? "CH.04: STACK" : "CH.04 : STACK",
      nextLabel: undefined,
    },
  }[activeChapter];

  const hasPrev = Boolean(prevChapter) || (activeChapter === "experience" && experience.spreadIdx === 1);
  const hasNext = Boolean(nextChapter) || (activeChapter === "experience" && experience.spreadIdx === 0);

  return (
    <div className="min-h-screen flex flex-col mangaka-desk">
      <MangaLoader />
      <MangaNavbar />

      <main className="flex-1 flex flex-col justify-center">
        <OpenMangaBook
          bookKey={spreadConfig.bookKey}
          direction={direction}
          leftTitle={spreadConfig.leftTitle}
          rightTitle={spreadConfig.rightTitle}
          leftPageNum={spreadConfig.leftPageNum}
          rightPageNum={spreadConfig.rightPageNum}
          leftPage={spreadConfig.leftPage}
          rightPage={spreadConfig.rightPage}
          onPrev={hasPrev ? handlePrev : undefined}
          onNext={hasNext ? handleNext : undefined}
          prevLabel={spreadConfig.prevLabel}
          nextLabel={spreadConfig.nextLabel}
        />
      </main>

      <MangaFooter />
    </div>
  );
}
