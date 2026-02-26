"use client";

import { useEffect, useState, useCallback } from "react";

interface ParallaxPosition {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

/**
 * Hook for mouse-based parallax on desktop.
 * Returns normalized mouse position (-1 to 1) relative to viewport center.
 * On mobile returns {0,0} (no parallax).
 */
export default function useParallax(enabled: boolean = true): ParallaxPosition {
  const [pos, setPos] = useState<ParallaxPosition>({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setPos({ x, y });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, handleMove]);

  return pos;
}
