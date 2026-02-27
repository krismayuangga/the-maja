"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  glareOpacity?: number;
  scale?: number;
  perspective?: number;
}

/**
 * TiltCard — React Bits style
 * 3D tilt effect on hover with optional glare.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  glare = true,
  glareOpacity = 0.15,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0) rotateY(0) scale(1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0) rotateY(0) scale(1)`);
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

/**
 * SpotlightCard — React Bits style
 * Spotlight follows cursor on card surface.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(198, 167, 94, 0.08)",
  spotlightSize = 300,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: pos.x - spotlightSize / 2,
            top: pos.y - spotlightSize / 2,
            width: spotlightSize,
            height: spotlightSize,
            background: `radial-gradient(circle, ${spotlightColor}, transparent 70%)`,
            opacity: 1,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  color?: string;
  once?: boolean;
}

/**
 * Reveal — React Bits style
 * Color block slides across to reveal content.
 */
export function Reveal({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.8,
  color = "#C6A75E",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const isHorizontal = direction === "left" || direction === "right";
  const origin = direction === "left" || direction === "up" ? "0% 0%" : "100% 100%";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: delay + duration }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: color, transformOrigin: origin }}
        initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
        animate={
          isInView
            ? {
                scaleX: [isHorizontal ? 0 : 1, 1, isHorizontal ? 0 : 1],
                scaleY: [isHorizontal ? 1 : 0, 1, isHorizontal ? 1 : 0],
              }
            : undefined
        }
        transition={{
          duration: duration * 2,
          delay,
          ease: [0.77, 0, 0.175, 1],
          times: [0, 0.5, 1],
        }}
      />
    </div>
  );
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "up" | "random";
}

/**
 * ParticleField — React Bits style
 * Floating particle background with various configs.
 */
export function ParticleField({
  count = 40,
  color = "#C6A75E",
  minSize = 1,
  maxSize = 4,
  className = "",
  speed = "normal",
  direction = "up",
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; dur: number; drift: number }[]
  >([]);

  useEffect(() => {
    const speedMap = { slow: 8, normal: 5, fast: 3 };
    const baseDur = speedMap[speed];

    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        delay: Math.random() * baseDur,
        dur: Math.random() * baseDur + baseDur * 0.8,
        drift: direction === "random" ? Math.random() * 60 - 30 : Math.random() * 20 - 10,
      }))
    );
  }, [count, speed, minSize, maxSize, direction]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.5, 0],
            y: direction === "up" ? [0, -60, -120] : [0, p.drift, p.drift * 2],
            x: [0, p.drift * 0.5, p.drift],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

interface HolographicProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Holographic — React Bits style
 * Holographic shimmer overlay effect on any element.
 */
export function Holographic({ children, className = "", intensity = 0.12 }: HolographicProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 20%,
            rgba(198, 167, 94, ${intensity}) 35%,
            rgba(15, 59, 46, ${intensity}) 45%,
            rgba(198, 167, 94, ${intensity}) 55%,
            transparent 70%
          )`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  blur?: number;
  animated?: boolean;
}

/**
 * GlowBorder — React Bits style
 * Animated glowing border around an element.
 */
export function GlowBorder({
  children,
  className = "",
  color = "#C6A75E",
  blur = 20,
  animated = true,
}: GlowBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-[1px] rounded-inherit pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${color}, transparent, ${color}, transparent, ${color})`,
          filter: `blur(${blur}px)`,
          opacity: 0.4,
          borderRadius: "inherit",
        }}
        animate={animated ? { rotate: 360 } : {}}
        transition={animated ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
      />
      <div className="relative z-10 bg-inherit" style={{ borderRadius: "inherit" }}>
        {children}
      </div>
    </div>
  );
}

interface LetterPullUpProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * LetterPullUp — React Bits style
 * Letters pull up from below baseline with spring physics.
 */
export function LetterPullUp({ text, className = "", delay = 0, style }: LetterPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-x-2 ${className}`} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split("").map((char, ci) => {
            const totalIndex = words.slice(0, wi).join("").length + ci;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                  delay: delay + totalIndex * 0.04,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
