"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    // Track hoverable elements
    const handleOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], .cursor-pointer, [onclick]")
      ) {
        setIsHovering(true);
      }
    };
    const handleOutInteractive = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOverInteractive);
    document.addEventListener("mouseout", handleOutInteractive);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOverInteractive);
      document.removeEventListener("mouseout", handleOutInteractive);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isVisible]);

  // Smooth trail follower
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      trailRef.current.x += (pos.x - trailRef.current.x) * 0.15;
      trailRef.current.y += (pos.y - trailRef.current.y) * 0.15;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pos, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: pos.x - (isHovering ? 20 : 6),
          y: pos.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 ${
            isHovering
              ? "border-[#C6A75E]/60 bg-[#C6A75E]/10"
              : "border-[#C6A75E]/80 bg-[#C6A75E]/30"
          }`}
        />
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          x: pos.x - 15,
          y: pos.y - 15,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1,
        }}
      >
        <div className="w-[30px] h-[30px] rounded-full bg-[#C6A75E] blur-[8px]" />
      </motion.div>
    </>
  );
}
