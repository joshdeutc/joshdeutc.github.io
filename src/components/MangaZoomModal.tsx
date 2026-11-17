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
          className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-paper border border-ink/25 shadow-2xl overflow-hidden my-auto"
          >
            {/* Clean Editorial Modal Header */}
            <div className="px-6 py-4 border-b border-ink/15 flex items-start justify-between gap-4 shrink-0">
              <div className="min-w-0">
                {eyebrow && (
                  <div className="font-mono text-xs font-bold tracking-widest text-hanko uppercase mb-1">
                    {eyebrow}
                  </div>
                )}
                <h2 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close zoom panel"
                className="p-2 border border-ink/20 hover:border-hanko hover:text-hanko transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Airy High-Contrast Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-ink">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
