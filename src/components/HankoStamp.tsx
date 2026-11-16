"use client";

import React from "react";
import { motion } from "framer-motion";

interface HankoStampProps {
  kanji: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HankoStamp({ kanji, size = "md", className = "" }: HankoStampProps) {
  const sizes = {
    sm: "w-10 h-10 text-lg border-2",
    md: "w-14 h-14 text-2xl border-[3px]",
    lg: "w-16 h-16 text-3xl border-[3px]",
  };

  return (
    <motion.div
      whileHover={{ rotate: -8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-hanko text-white font-jp font-black border-ink shadow-manga-sm select-none ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      <span className="leading-none">{kanji}</span>
    </motion.div>
  );
}
