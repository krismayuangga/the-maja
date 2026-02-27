"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

/**
 * SplitText — React Bits style
 * Animates each character individually with stagger.
 * Perfect for titles and headings.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  once = true,
  style,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const chars = text.split("");

  return (
    <div ref={ref} className={`inline-block ${className}`} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

/**
 * BlurText — React Bits style
 * Text fades in from blur to sharp.
 * Great for subtitles and quotes.
 */
export function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 1.2,
  once = true,
  style,
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.35em]"
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * 0.08,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
  style?: React.CSSProperties;
}

/**
 * ShinyText — React Bits style
 * Gold shimmer sweeps across text infinitely.
 * For hero titles and important CTAs.
 */
export function ShinyText({
  text,
  className = "",
  shimmerWidth = 200,
  speed = 3,
  style,
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block relative ${className}`}
      style={{
        ...style,
        backgroundImage: `linear-gradient(
          90deg,
          currentColor 0%,
          rgba(245, 235, 221, 0.9) 45%,
          rgba(255, 223, 128, 1) 50%,
          rgba(245, 235, 221, 0.9) 55%,
          currentColor 100%
        )`,
        backgroundSize: `${shimmerWidth}% 100%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shimmer ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}

interface GradientTextProps {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

/**
 * GradientText — React Bits style
 * Animated gradient text.
 */
export function GradientText({
  text,
  className = "",
  from = "#C6A75E",
  via = "#F5EBDD",
  to = "#D4B978",
  animate = true,
  speed = 4,
  style,
}: GradientTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        ...style,
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${from})`,
        backgroundSize: animate ? "300% 100%" : "100% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: animate ? `gradient-shift ${speed}s ease infinite` : undefined,
      }}
    >
      {text}
    </span>
  );
}

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
}

/**
 * CountUp — React Bits style
 * Animates number from 0 to target.
 */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  once = true,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const step = end / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  distance?: number;
}

/**
 * FadeIn — React Bits style
 * Directional fade-in with customizable distance.
 */
export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  distance = 40,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none: { y: 0, x: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic — React Bits style
 * Element follows cursor when hovered.
 */
export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 400);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
