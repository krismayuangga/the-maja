"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * High-performance parallax hook using direct DOM manipulation.
 * Instead of useState (which causes re-renders), this applies transforms
 * directly to registered DOM elements via refs — zero re-renders.
 *
 * Usage:
 *   const registerParallax = useParallax(!isMobile);
 *   <div ref={registerParallax(12, 10)} /> // moves 12px x, 10px y with mouse
 *
 * Negative values = move opposite to mouse (background layers)
 * Positive values = move with mouse (foreground layers)
 */
export default function useParallax(enabled: boolean = true) {
  const elementsRef = useRef<{ el: HTMLElement; mx: number; my: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (rafRef.current) return; // already queued
      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = mouseRef.current;
        for (const item of elementsRef.current) {
          if (item.el) {
            item.el.style.transform = `translate(${x * item.mx}px, ${y * item.my}px)`;
          }
        }
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  // Returns a ref callback to register an element with its parallax multipliers
  const register = useCallback(
    (mx: number, my: number) => {
      return (el: HTMLElement | null) => {
        if (!el) return;
        // Avoid duplicate registration
        const exists = elementsRef.current.find((item) => item.el === el);
        if (!exists) {
          elementsRef.current.push({ el, mx, my });
        }
      };
    },
    []
  );

  return register;
}
