"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight ambient starfield — purely decorative, sits behind the hero
 * content. Distinct from the cursor's particle trail: these stars are
 * static-positioned and just twinkle slowly, giving the dark theme depth.
 */
export default function StarField({ count = 90 }: { count?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.childElementCount > 0) return;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      const size = Math.random() * 2 + 0.6;
      star.style.position = "absolute";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.borderRadius = "50%";
      star.style.background =
        Math.random() > 0.7 ? "rgba(34,211,238,0.9)" : "rgba(244,244,245,0.85)";
      star.style.animation = `twinkle ${3 + Math.random() * 4}s ease-in-out ${
        Math.random() * 4
      }s infinite`;
      el.appendChild(star);
    }
  }, [count]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
