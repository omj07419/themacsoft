"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  kind: "bubble" | "star";
  hue: "cyan" | "violet" | "white";
  wobble: number;
};

const COLORS = {
  cyan: "34, 211, 238",
  violet: "168, 85, 247",
  white: "244, 244, 245",
};

/**
 * CustomCursor + ParticleTrail
 * - A spring-physics ring + dot that tracks the pointer and reacts to
 *   interactive elements (anything with [data-cursor]).
 * - A canvas-based particle field that leaves drifting "bubbles" and
 *   occasional star sparkles behind the cursor as it moves, which
 *   float away and fade out on their own.
 */
export default function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "link" | "card">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 });
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!isCoarse && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBubble = (x: number, y: number, speed: number) => {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.4 - Math.random() * 0.6,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 3 + Math.random() * (4 + Math.min(speed, 10) * 0.4),
        kind: "bubble",
        hue: Math.random() > 0.5 ? "cyan" : "violet",
        wobble: Math.random() * Math.PI * 2,
      });
    };

    const spawnStar = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const force = 0.8 + Math.random() * 1.4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        life: 0,
        maxLife: 28 + Math.random() * 20,
        size: 1.5 + Math.random() * 1.8,
        kind: "star",
        hue: "white",
        wobble: 0,
      });
    };

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = performance.now();
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (now - lastSpawnRef.current > 45 && particlesRef.current.length < 140) {
        lastSpawnRef.current = now;
        spawnBubble(e.clientX, e.clientY, speed);
        if (speed > 18 && Math.random() > 0.5) {
          spawnStar(e.clientX, e.clientY);
        }
      }
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const next: Particle[] = [];

      for (const p of particlesRef.current) {
        p.life += 1;
        if (p.life >= p.maxLife) continue;

        const t = p.life / p.maxLife;

        if (p.kind === "bubble") {
          p.wobble += 0.08;
          p.x += p.vx + Math.sin(p.wobble) * 0.3;
          p.y += p.vy;
          const alpha = (1 - t) * 0.55;
          const color = COLORS[p.hue];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 + t * 0.6), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.5})`;
          ctx.fill();
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          const alpha = 1 - t;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t * 2);
          ctx.beginPath();
          const s = p.size * (1 - t * 0.4);
          for (let i = 0; i < 4; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(s * 2.4, 0);
            ctx.rotate(Math.PI / 2);
          }
          ctx.strokeStyle = `rgba(${COLORS.white}, ${alpha * 0.9})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        next.push(p);
      }
      particlesRef.current = next;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]") as HTMLElement | null;
      if (el) setHoverState((el.dataset.cursor as "link" | "card") || "link");
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]");
      if (el) setHoverState("default");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const ringScale = hoverState === "default" ? 1 : hoverState === "card" ? 2.4 : 1.8;
  const ringSize = 36 * ringScale;
  const ringColor =
    hoverState === "card" ? "rgba(168,85,247,0.95)" : "rgba(34,211,238,0.9)";
  const ringFill =
    hoverState === "card" ? "rgba(168,85,247,0.12)" : "rgba(34,211,238,0.06)";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[55] mix-blend-screen"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border"
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hoverState === "default" ? 0.9 : 1,
          backgroundColor: ringFill,
          borderColor: ringColor,
        }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-cyan-glow"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
