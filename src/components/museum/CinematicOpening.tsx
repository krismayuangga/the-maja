"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicOpeningProps {
  onComplete: () => void;
}

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  const [phase, setPhase] = useState<"particles" | "text1" | "text2" | "doors" | "done">("particles");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  // Generate partikel hanya di client side supaya tidak hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("text1"), 1500),
      setTimeout(() => setPhase("text2"), 4000),
      setTimeout(() => setPhase("doors"), 6500),
      setTimeout(() => setPhase("done"), 8500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  const handleSkip = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Gold dust particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `radial-gradient(circle, #C6A75E ${0}%, transparent ${100}%)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0.3, 0.6, 0],
                  scale: [0, 1, 0.8, 1, 0],
                  y: [0, -30, -15, -40, -60],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Subtle ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C6A75E] opacity-[0.04] blur-[120px]" />
          </motion.div>

          {/* Text: Line 1 */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <AnimatePresence mode="wait">
              {(phase === "text1" || phase === "text2") && (
                <motion.div
                  key="text1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase === "text1" ? 1 : 0.4, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <p
                    className="text-lg md:text-2xl text-[#C6A75E]/80 tracking-[0.2em] leading-relaxed"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Dulu Nusantara disatukan oleh Sumpah Palapa.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text: Line 2 */}
            <AnimatePresence>
              {phase === "text2" && (
                <motion.div
                  key="text2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  className="mt-4"
                >
                  <p
                    className="text-lg md:text-2xl text-[#F5EBDD] tracking-[0.2em] leading-relaxed"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Hari ini Nusantara disatukan oleh kreativitas.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Museum doors opening */}
            <AnimatePresence>
              {phase === "doors" && (
                <motion.div
                  key="doors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12"
                >
                  <motion.div
                    className="flex items-center justify-center gap-0 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Left door */}
                    <motion.div
                      className="w-[120px] h-[200px] md:w-[180px] md:h-[300px] border-2 border-[#C6A75E]/40 rounded-l-lg"
                      style={{
                        background: "linear-gradient(135deg, #2C1A12 0%, #1A1008 100%)",
                        transformOrigin: "left center",
                      }}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -75 }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                    >
                      <div className="w-full h-full flex items-center justify-end pr-3">
                        <div className="w-2 h-8 rounded-full bg-[#C6A75E]/60" />
                      </div>
                    </motion.div>
                    {/* Right door */}
                    <motion.div
                      className="w-[120px] h-[200px] md:w-[180px] md:h-[300px] border-2 border-[#C6A75E]/40 rounded-r-lg"
                      style={{
                        background: "linear-gradient(225deg, #2C1A12 0%, #1A1008 100%)",
                        transformOrigin: "right center",
                      }}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 75 }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                    >
                      <div className="w-full h-full flex items-center justify-start pl-3">
                        <div className="w-2 h-8 rounded-full bg-[#C6A75E]/60" />
                      </div>
                    </motion.div>
                    {/* Light from inside */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <div className="w-32 h-full bg-[#C6A75E] opacity-10 blur-3xl" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip button */}
          <motion.button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-20 text-[#C6A75E]/50 text-sm tracking-widest uppercase hover:text-[#C6A75E] transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
