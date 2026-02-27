"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicOpeningProps {
  onComplete: () => void;
}

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  const [phase, setPhase] = useState<"particles" | "text1" | "text2" | "doors" | "done">("particles");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; drift: number }[]>([]);
  const doorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 3,
        drift: Math.random() * 30 - 15,
      }))
    );

    // Preload door sound
    const audio = new Audio("/sound/open-door.mp3");
    audio.preload = "auto";
    audio.volume = 0.6;
    doorAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Play door sound when doors phase starts (with slight delay to sync with animation)
  useEffect(() => {
    if (phase === "doors" && doorAudioRef.current) {
      const timer = setTimeout(() => {
        doorAudioRef.current?.play().catch(() => {});
      }, 600); // 600ms delay — sound starts just as doors begin moving (animation delay is 800ms)
      return () => clearTimeout(timer);
    }
    if (phase === "done" && doorAudioRef.current) {
      // Fade out audio on scene end
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

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("text1"), 1500),
      setTimeout(() => setPhase("text2"), 4500),
      setTimeout(() => setPhase("doors"), 7000),
      setTimeout(() => setPhase("done"), 11000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  const handleSkip = useCallback(() => {
    // Stop audio immediately on skip
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
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Cinematic letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black z-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black z-30" />

          {/* Deep ambient background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C6A75E] opacity-[0.03] blur-[150px]" />
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#0F3B2E] opacity-[0.04] blur-[120px]" />
          </motion.div>

          {/* Gold dust particles — enhanced */}
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
                  background: `radial-gradient(circle, #C6A75E 0%, transparent 70%)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.3, 0.6, 0],
                  scale: [0, 1.2, 0.8, 1, 0.5],
                  y: [0, -20, -40, -70, -110],
                  x: [0, p.drift * 0.3, p.drift * 0.6, p.drift],
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

          {/* Text content — centered */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            {/* Text: Line 1 */}
            <AnimatePresence mode="wait">
              {(phase === "text1" || phase === "text2") && (
                <motion.div
                  key="text1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "text1" ? 1 : 0.35 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.p
                    className="text-lg md:text-2xl lg:text-3xl tracking-[0.15em] leading-relaxed"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      color: "#C6A75E",
                      opacity: 0.8,
                    }}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 0.8, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    Dulu Nusantara disatukan oleh Sumpah Palapa.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Text: Line 2 — brighter, bolder */}
            <AnimatePresence>
              {phase === "text2" && (
                <motion.div
                  key="text2"
                  className="mt-4"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                >
                  <p
                    className="text-lg md:text-2xl lg:text-3xl tracking-[0.15em] leading-relaxed text-[#F5EBDD] font-medium"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Hari ini Nusantara disatukan oleh kreativitas.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Museum doors — FULL SCREEN, opens INWARD (away from viewer) */}
            <AnimatePresence>
              {phase === "doors" && (
                <motion.div
                  key="doors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-50 flex items-stretch"
                  style={{ perspective: "2000px" }}
                >
                  {/* Light burst from behind doors */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                  >
                    <div className="w-[60vw] h-full bg-[#C6A75E] opacity-[0.08] blur-[100px]" />
                    <div className="absolute w-[10vw] h-[200%] bg-[#F5EBDD] opacity-[0.06] blur-[60px]" />
                  </motion.div>

                  {/* Left door — full screen half, opens INWARD */}
                  <motion.div
                    className="flex-1 h-full relative overflow-hidden"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      boxShadow: "inset -30px 0 60px rgba(0,0,0,0.6)",
                    }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 80 }}
                    transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
                  >
                    {/* Door texture — fallback gradient */}
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(160deg, #3D2517 0%, #2C1A12 40%, #1A0F09 100%)",
                    }} />
                    {/* Wood grain lines */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(198,167,94,0.06) 12px, rgba(198,167,94,0.06) 13px)`,
                    }} />
                    {/* Door panels */}
                    <div className="absolute inset-6 md:inset-12 lg:inset-16 border border-[#C6A75E]/20 rounded-sm">
                      <div className="absolute inset-4 md:inset-6 border border-[#C6A75E]/10 rounded-sm" />
                      {/* Inner panel detail */}
                      <div className="absolute inset-8 md:inset-12 border border-[#C6A75E]/5 rounded-sm" />
                    </div>
                    {/* Surya Majapahit ornament — larger */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32">
                      <svg viewBox="0 0 40 40" className="w-full h-full opacity-30">
                        <circle cx="20" cy="20" r="4" fill="#C6A75E" opacity="0.5" />
                        <circle cx="20" cy="20" r="8" fill="none" stroke="#C6A75E" strokeWidth="0.5" />
                        <circle cx="20" cy="20" r="12" fill="none" stroke="#C6A75E" strokeWidth="0.3" opacity="0.3" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                          <line key={angle} x1="20" y1="20"
                            x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
                            y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
                            stroke="#C6A75E" strokeWidth="0.4" opacity="0.4" />
                        ))}
                      </svg>
                    </div>
                    {/* Handle */}
                    <div className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 w-2.5 h-16 md:h-24 rounded-full bg-gradient-to-b from-[#C6A75E]/80 via-[#8B6914] to-[#C6A75E]/80 shadow-lg" />
                    {/* Border */}
                    <div className="absolute inset-0 border-r-2 border-[#C6A75E]/25 pointer-events-none" />
                    {/* Real image overlay */}
                    <img src="/images/museum/opening/door-left.png" alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                      onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </motion.div>

                  {/* Right door — full screen half, opens INWARD */}
                  <motion.div
                    className="flex-1 h-full relative overflow-hidden"
                    style={{
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                      boxShadow: "inset 30px 0 60px rgba(0,0,0,0.6)",
                    }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -80 }}
                    transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
                  >
                    <div className="absolute inset-0" style={{
                      background: "linear-gradient(200deg, #3D2517 0%, #2C1A12 40%, #1A0F09 100%)",
                    }} />
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(198,167,94,0.06) 12px, rgba(198,167,94,0.06) 13px)`,
                    }} />
                    <div className="absolute inset-6 md:inset-12 lg:inset-16 border border-[#C6A75E]/20 rounded-sm">
                      <div className="absolute inset-4 md:inset-6 border border-[#C6A75E]/10 rounded-sm" />
                      <div className="absolute inset-8 md:inset-12 border border-[#C6A75E]/5 rounded-sm" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32">
                      <svg viewBox="0 0 40 40" className="w-full h-full opacity-30">
                        <circle cx="20" cy="20" r="4" fill="#C6A75E" opacity="0.5" />
                        <circle cx="20" cy="20" r="8" fill="none" stroke="#C6A75E" strokeWidth="0.5" />
                        <circle cx="20" cy="20" r="12" fill="none" stroke="#C6A75E" strokeWidth="0.3" opacity="0.3" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                          <line key={angle} x1="20" y1="20"
                            x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
                            y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
                            stroke="#C6A75E" strokeWidth="0.4" opacity="0.4" />
                        ))}
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 w-2.5 h-16 md:h-24 rounded-full bg-gradient-to-b from-[#C6A75E]/80 via-[#8B6914] to-[#C6A75E]/80 shadow-lg" />
                    <div className="absolute inset-0 border-l-2 border-[#C6A75E]/25 pointer-events-none" />
                    <img src="/images/museum/opening/door-right.png" alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                      onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </motion.div>

                  {/* "Memasuki Museum" text overlay — centered */}
                  <motion.p
                    className="absolute bottom-[14vh] left-1/2 -translate-x-1/2 text-xs tracking-[0.4em] uppercase text-[#C6A75E]/40 z-10"
                    style={{ fontFamily: "var(--font-inter)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 1.5 }}
                  >
                    Memasuki Museum
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-20"
            style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)" }} />

          {/* Skip button */}
          <motion.button
            onClick={handleSkip}
            className="absolute bottom-[10vh] right-8 z-40 text-[#C6A75E]/40 text-xs tracking-[0.3em] uppercase hover:text-[#C6A75E]/80 transition-colors cursor-pointer"
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
