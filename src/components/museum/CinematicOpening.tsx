"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicOpeningProps {
  onComplete: () => void;
}

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  const [phase, setPhase] = useState<"waiting" | "doors" | "done">("waiting");
  const doorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload door sound
    const audio = new Audio("/sound/opening.mp3");
    audio.preload = "auto";
    audio.volume = 0.6;
    doorAudioRef.current = audio;
    // Let audio play to natural end — no cleanup on unmount
  }, []);

  // Play door sound when doors phase starts
  useEffect(() => {
    if (phase === "doors" && doorAudioRef.current) {
      doorAudioRef.current.play().catch(() => {});
    }
    if (phase === "done" && doorAudioRef.current) {
      const audio = doorAudioRef.current;
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 50);
      return () => clearInterval(fadeOut);
    }
  }, [phase]);

  // After doors fully open → done (smooth fade)
  useEffect(() => {
    if (phase === "doors") {
      const timer = setTimeout(() => setPhase("done"), 3800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  // User clicks "Masuki Museum" → start doors + sound
  const handleEnter = useCallback(() => {
    setPhase("doors");
  }, []);

  const handleSkip = useCallback(() => {
    if (doorAudioRef.current) {
      doorAudioRef.current.pause();
      doorAudioRef.current.currentTime = 0;
    }
    setPhase("done");
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Doors scene */}
          <div className="fixed inset-0">
            {/* Light burst from behind doors — when opening */}
            {phase === "doors" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              >
                <div className="w-[60vw] h-full bg-[#C6A75E] opacity-[0.08] blur-[100px]" />
                <div className="absolute w-[10vw] h-[200%] bg-[#F5EBDD] opacity-[0.06] blur-[60px]" />
              </motion.div>
            )}

            {/* Left door */}
            <motion.div
              className="absolute top-0 left-0 h-full overflow-hidden bg-black"
              style={{
                width: "50.5%",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex: 2,
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: phase === "doors" ? 95 : 0 }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: phase === "doors" ? 0.3 : 0 }}
            >
              <img src="/images/museum/opening/door-left.png" alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            {/* Right door */}
            <motion.div
              className="absolute top-0 right-0 h-full overflow-hidden bg-black"
              style={{
                width: "50.5%",
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
                zIndex: 2,
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: phase === "doors" ? -95 : 0 }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: phase === "doors" ? 0.3 : 0 }}
            >
              <img src="/images/museum/opening/door-right.png" alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            {/* ── "Masuki Museum" button — bold, glowing, unmissable ── */}
            <AnimatePresence>
              {phase === "waiting" && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Large pulsing glow behind button */}
                  <motion.div
                    className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(198,167,94,0.12) 0%, rgba(198,167,94,0.04) 40%, transparent 70%)",
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Main button */}
                  <motion.button
                    onClick={handleEnter}
                    className="group relative cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {/* Animated outer ring */}
                    <motion.div
                      className="absolute -inset-3 sm:-inset-4 rounded-lg border-2 border-[#C6A75E]/30"
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Button body */}
                    <div
                      className="relative px-12 py-5 sm:px-20 sm:py-6 md:px-24 md:py-7 rounded-lg overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, rgba(198,167,94,0.2) 0%, rgba(13,10,6,0.9) 50%, rgba(198,167,94,0.2) 100%)",
                        border: "2px solid rgba(198,167,94,0.6)",
                        boxShadow: "0 0 40px rgba(198,167,94,0.2), 0 0 80px rgba(198,167,94,0.1), inset 0 1px 0 rgba(198,167,94,0.3)",
                      }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(105deg, transparent 30%, rgba(198,167,94,0.15) 45%, rgba(198,167,94,0.25) 50%, rgba(198,167,94,0.15) 55%, transparent 70%)",
                          backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Inner glow top edge */}
                      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#C6A75E]/60 to-transparent" />

                      {/* Text */}
                      <span
                        className="relative z-10 text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase font-medium"
                        style={{
                          fontFamily: "var(--font-cinzel)",
                          color: "#C6A75E",
                          textShadow: "0 0 20px rgba(198,167,94,0.5), 0 0 40px rgba(198,167,94,0.2)",
                        }}
                      >
                        Masuki Museum
                      </span>
                    </div>
                  </motion.button>

                  {/* Bouncing arrow indicator */}
                  <motion.div
                    className="mt-8 sm:mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.svg
                      width="24" height="24" viewBox="0 0 24 24" fill="none"
                      className="text-[#C6A75E]/50"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M12 4 L12 16 M6 12 L12 18 L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* "Memasuki Museum" text — when doors are opening */}
            {phase === "doors" && (
              <motion.p
                className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 text-xs tracking-[0.4em] uppercase text-[#C6A75E]/40 z-10"
                style={{ fontFamily: "var(--font-inter)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
              >
                Memasuki Museum
              </motion.p>
            )}
          </div>

          {/* Vignette — only when waiting (doors closed) */}
          {phase === "waiting" && (
            <div className="absolute inset-0 pointer-events-none z-[5]"
              style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.5)" }} />
          )}

          {/* Skip button — only visible during doors phase */}
          {phase === "doors" && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-[10vh] right-8 z-40 text-[#C6A75E]/30 text-xs tracking-[0.3em] uppercase hover:text-[#C6A75E]/70 transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Skip →
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
