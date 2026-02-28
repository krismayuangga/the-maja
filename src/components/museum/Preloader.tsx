"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#050208] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C6A75E] opacity-[0.03] blur-[100px]" />

          {/* Coin logo with 3D spin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 relative"
          >
            {/* Glow behind coin */}
            <motion.div
              className="absolute inset-[-30px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(198,167,94,0.15) 0%, rgba(198,167,94,0.05) 40%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Spinning coin */}
            <motion.div
              className="relative"
              style={{ perspective: "600px" }}
            >
              <motion.img
                src="/images/museum/branding/maja-coin-front.png"
                alt="MAJA Token"
                className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] object-contain drop-shadow-[0_0_30px_rgba(198,167,94,0.4)]"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
              />
            </motion.div>

            {/* Particle ring around coin */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#C6A75E]"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i * 45 * Math.PI) / 180) * 90],
                  y: [0, Math.sin((i * 45 * Math.PI) / 180) * 90],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* MAJA text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl md:text-4xl tracking-[0.4em] text-[#C6A75E] mb-1"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            MAJA
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs md:text-sm tracking-[0.3em] text-[#C6A75E]/50 mb-10 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Digital Museum
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-48 md:w-64"
          >
            <div className="h-[1px] w-full bg-[#C6A75E]/10 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C6A75E]/40 via-[#C6A75E] to-[#C6A75E]/40"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="block text-center text-[10px] tracking-[0.2em] text-[#C6A75E]/40 mt-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {progress}%
            </motion.span>
          </motion.div>

          {/* Ornamental bottom dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-[#C6A75E]"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
