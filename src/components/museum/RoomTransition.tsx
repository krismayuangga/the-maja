"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RoomTransitionProps {
  children: React.ReactNode;
  index: number;
}

const roomVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
};

// Golden vignette that fades between rooms
const vignetteVariants = {
  hidden: {
    opacity: 0.6,
  },
  visible: {
    opacity: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

export default function RoomTransition({
  children,
  index,
}: RoomTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    once: false,
  });

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
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      {/* Room content with scale/fade animation */}
      <motion.div
        className="w-full h-full"
        variants={roomVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        key={`room-${index}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
