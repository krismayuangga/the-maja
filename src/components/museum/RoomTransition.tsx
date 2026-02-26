"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RoomTransitionProps {
  children: React.ReactNode;
  index: number;
  /** Currently active room index (from GSAP/scroll tracking) */
  activeRoom?: number;
  /** On desktop, useInView doesn't work with GSAP translateX */
  isMobile?: boolean;
}

const roomVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// Golden vignette that fades between rooms
const vignetteVariants = {
  hidden: {
    opacity: 0.5,
  },
  visible: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
    },
  },
};

export default function RoomTransition({
  children,
  index,
  activeRoom = 0,
  isMobile = false,
}: RoomTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mobile: use Intersection Observer (works with real scroll)
  const isInViewMobile = useInView(ref, {
    amount: 0.3,
    once: false,
  });

  // Desktop: determine visibility from activeRoom prop
  // Show current room + adjacent rooms for smooth transitions
  const isVisibleDesktop = Math.abs(activeRoom - index) <= 1;

  // Final visibility: mobile uses IntersectionObserver, desktop uses activeRoom
  const isVisible = isMobile ? isInViewMobile : isVisibleDesktop;

  return (
    <div ref={ref} className="relative w-full h-full flex-shrink-0">
      {/* Golden vignette overlay that fades when room enters */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,5,0,0.8) 100%)",
        }}
        variants={vignetteVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
      />

      {/* Room content with scale/fade animation */}
      <motion.div
        className="w-full h-full"
        variants={roomVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}
