"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MangaZoomModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}

export function MangaZoomModal({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: MangaZoomModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col manga-sheet border-2 border-ink shadow-[10px_10px_0px_#D62828] overflow-hidden my-auto"
          >
            {/* Sticky Zoom Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-ink/15 bg-white flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0">
                {eyebrow && (
                  <span className="inline-block px-2 py-0.5 bg-hanko text-white font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
                    {eyebrow}
                  </span>
                )}
                <h2 className="font-display font-black text-lg sm:text-2xl text-ink leading-tight">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close zoom panel"
                className="p-2 border-2 border-ink bg-washi hover:bg-hanko hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable High-Contrast Details Interior */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-ink">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
