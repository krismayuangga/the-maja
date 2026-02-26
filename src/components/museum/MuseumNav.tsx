"use client";

import React from "react";
import { motion } from "framer-motion";

interface MuseumNavProps {
  rooms: string[];
  activeRoom: number;
  onNavigate: (index: number) => void;
  isMobile: boolean;
}

export default function MuseumNav({ rooms, activeRoom, onNavigate, isMobile }: MuseumNavProps) {
  // === MOBILE: Horizontal dots di bawah layar ===
  if (isMobile) {
    return (
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-4 px-4 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-transparent backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {rooms.map((name, i) => (
          <button
            key={name}
            onClick={() => onNavigate(i)}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
            aria-label={`Navigasi ke ${name}`}
          >
            {/* Label muncul di atas dot aktif */}
            <motion.span
              className="text-[8px] tracking-[0.1em] uppercase leading-none"
              style={{ fontFamily: "var(--font-inter)" }}
              animate={{
                opacity: activeRoom === i ? 1 : 0,
                y: activeRoom === i ? 0 : 5,
                color: "#C6A75E",
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.span>

            {/* Dot */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-500 ${
                  activeRoom === i
                    ? "bg-[#C6A75E] border-[#C6A75E] shadow-[0_0_10px_rgba(198,167,94,0.5)]"
                    : "bg-transparent border-[#C6A75E]/30"
                }`}
              />
              {activeRoom === i && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#C6A75E]/30"
                  initial={{ scale: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </button>
        ))}
      </motion.nav>
    );
  }

  // === DESKTOP: Vertical dots di kiri layar ===
  return (
    <motion.nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {rooms.map((name, i) => (
        <button
          key={name}
          onClick={() => onNavigate(i)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={`Navigate to ${name}`}
        >
          {/* Dot */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              scale: activeRoom === i ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                activeRoom === i
                  ? "bg-[#C6A75E] border-[#C6A75E] shadow-[0_0_12px_rgba(198,167,94,0.5)]"
                  : "bg-transparent border-[#C6A75E]/40 group-hover:border-[#C6A75E]/80"
              }`}
            />
            {activeRoom === i && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#C6A75E]/30"
                initial={{ scale: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
          {/* Label */}
          <span
            className={`text-xs tracking-[0.15em] uppercase transition-all duration-500 ${
              activeRoom === i
                ? "text-[#C6A75E] opacity-100"
                : "text-[#C6A75E]/0 group-hover:text-[#C6A75E]/70"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {name}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
