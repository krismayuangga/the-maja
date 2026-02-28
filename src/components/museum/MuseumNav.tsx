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
  // === MOBILE: Bottom bar ===
  if (isMobile) {
    return (
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around py-2.5 px-1"
        style={{
          background: "linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.8) 60%, transparent 100%)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {rooms.map((name, i) => {
          const isActive = activeRoom === i;
          return (
            <motion.button
              key={name}
              onClick={() => onNavigate(i)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer px-1.5 py-1.5 rounded-md min-w-0"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(198,167,94,0.15) 0%, rgba(198,167,94,0.05) 100%)"
                  : "transparent",
                border: isActive ? "1px solid rgba(198,167,94,0.3)" : "1px solid transparent",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Navigasi ke ${name}`}
            >
              <div
                className="rounded-full"
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  backgroundColor: isActive ? "#C6A75E" : "rgba(198,167,94,0.3)",
                  boxShadow: isActive ? "0 0 8px rgba(198,167,94,0.5)" : "none",
                  transition: "all 0.3s ease",
                }}
              />
              <span
                className="text-[7px] tracking-[0.05em] uppercase leading-tight text-center truncate w-full"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  color: isActive ? "#C6A75E" : "rgba(198,167,94,0.35)",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.3s ease",
                }}
              >
                {name}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    );
  }

  // === DESKTOP: Vertical sidebar with button-style items ===
  return (
    <motion.nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* No background — transparent */}

      {rooms.map((name, i) => {
        const isActive = activeRoom === i;
        const isPast = i < activeRoom;

        return (
          <motion.button
            key={name}
            onClick={() => onNavigate(i)}
            className="relative flex items-center gap-3 cursor-pointer rounded-xl overflow-hidden"
            style={{
              padding: "10px 20px 10px 14px",
              background: isActive
                ? "linear-gradient(135deg, rgba(198,167,94,0.18) 0%, rgba(13,10,6,0.8) 50%, rgba(198,167,94,0.12) 100%)"
                : "transparent",
              border: isActive
                ? "1px solid rgba(198,167,94,0.35)"
                : "1px solid transparent",
              boxShadow: isActive
                ? "0 0 20px rgba(198,167,94,0.1), inset 0 1px 0 rgba(198,167,94,0.15)"
                : "none",
              transition: "all 0.4s ease",
            }}
            whileHover={{
              backgroundColor: isActive
                ? "rgba(198,167,94,0.12)"
                : "rgba(198,167,94,0.06)",
              borderColor: isActive
                ? "rgba(198,167,94,0.4)"
                : "rgba(198,167,94,0.15)",
              x: 4,
            }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Navigate to ${name}`}
          >
            {/* Shimmer on active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(198,167,94,0.08) 45%, rgba(198,167,94,0.15) 50%, rgba(198,167,94,0.08) 55%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Inner glow top edge on active */}
            {isActive && (
              <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C6A75E]/30 to-transparent" />
            )}

            {/* Dot indicator */}
            <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
              {isActive && (
                <motion.div
                  className="absolute rounded-full bg-[#C6A75E]/15"
                  animate={{
                    width: [16, 22, 16],
                    height: [16, 22, 16],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div
                className="rounded-full"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  backgroundColor: isActive
                    ? "#C6A75E"
                    : isPast
                    ? "rgba(198,167,94,0.4)"
                    : "rgba(198,167,94,0.35)",
                  border: isActive
                    ? "none"
                    : `1.5px solid ${isPast ? "rgba(198,167,94,0.3)" : "rgba(198,167,94,0.15)"}`,
                  boxShadow: isActive ? "0 0 10px rgba(198,167,94,0.5)" : "none",
                  transition: "all 0.4s ease",
                }}
              />
            </div>

            {/* Label */}
            <span
              className="text-[11px] tracking-[0.2em] uppercase whitespace-nowrap relative z-10"
              style={{
                fontFamily: "var(--font-cinzel)",
                color: isActive
                  ? "#C6A75E"
                  : isPast
                  ? "rgba(198,167,94,0.55)"
                  : "rgba(198,167,94,0.35)",
                textShadow: isActive ? "0 0 12px rgba(198,167,94,0.3)" : "none",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.4s ease",
              }}
            >
              {name}
            </span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
