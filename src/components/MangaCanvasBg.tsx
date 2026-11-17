"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  red: boolean;
}

export function MangaCanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, active: false };

    const count = Math.min(115, Math.floor((width * height) / 15000));
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.3,
      r: Math.random() * 2 + 0.7,
      alpha: 0.2 + Math.random() * 0.65,
      red: i % 9 === 0,
    }));

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle deep studio radial glow behind the floating manga
      const grad = ctx.createRadialGradient(
        mouse.active ? mouse.x : width * 0.5,
        mouse.active ? mouse.y : height * 0.45,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, "rgba(214, 40, 40, 0.08)");
      grad.addColorStop(0.45, "rgba(28, 30, 42, 0.35)");
      grad.addColorStop(1, "rgba(11, 12, 16, 1)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Floating manga ink sparks & stars
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 1) {
            p.x += (dx / dist) * 0.55;
            p.y += (dy / dist) * 0.55;
          }
        }

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red
          ? `rgba(214, 40, 40, ${p.alpha})`
          : `rgba(255, 255, 255, ${p.alpha * 0.75})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
