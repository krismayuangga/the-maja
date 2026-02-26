"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generates ambient gamelan-inspired tones using Web Audio API
// No external audio files needed!
export default function AmbientSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Pentatonic scale frequencies (Javanese pelog-inspired)
  const pelogScale = [
    293.66, // D4
    311.13, // Eb4
    349.23, // F4
    415.30, // Ab4
    466.16, // Bb4
    587.33, // D5
    622.25, // Eb5
  ];

  const startAmbient = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Fade in
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);

    // Drone layer — soft sustained pad
    const createDrone = (freq: number, vol: number) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      oscGain.gain.value = vol;

      // Subtle vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 0.3 + Math.random() * 0.4;
      lfoGain.gain.value = 1.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillatorsRef.current.push(osc, lfo);
    };

    // Low drone notes
    createDrone(146.83, 0.06); // D3
    createDrone(220.0, 0.04); // A3

    // Melodic pluck function
    const playNote = () => {
      if (!audioContextRef.current) return;
      const c = audioContextRef.current;
      const freq = pelogScale[Math.floor(Math.random() * pelogScale.length)];

      const osc = c.createOscillator();
      const noteGain = c.createGain();

      osc.type = Math.random() > 0.5 ? "triangle" : "sine";
      osc.frequency.value = freq;

      // Bell-like envelope
      const now = c.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(
        0.06 + Math.random() * 0.04,
        now + 0.02
      );
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3 + Math.random() * 2);

      osc.connect(noteGain);
      noteGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 5);
    };

    // Play a note every 2-5 seconds
    const scheduleNext = () => {
      playNote();
      intervalRef.current = setTimeout(scheduleNext, 2000 + Math.random() * 3000);
    };

    // Start after a short delay
    setTimeout(scheduleNext, 1000);

    setIsPlaying(true);
  }, []);

  const stopAmbient = useCallback(() => {
    const gain = gainNodeRef.current;
    const ctx = audioContextRef.current;

    if (gain && ctx) {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // already stopped
          }
        });
        oscillatorsRef.current = [];
        ctx.close();
        audioContextRef.current = null;
        gainNodeRef.current = null;
      }, 1200);
    }

    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    setIsPlaying(false);
  }, []);

  const toggleSound = useCallback(() => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  }, [isPlaying, startAmbient, stopAmbient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          /* noop */
        }
      });
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          onClick={toggleSound}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#C6A75E]/30 bg-[#0a0a0a]/60 backdrop-blur-sm flex items-center justify-center hover:border-[#C6A75E]/60 transition-colors cursor-pointer group"
          title={isPlaying ? "Matikan suara" : "Nyalakan suara gamelan"}
          aria-label={isPlaying ? "Mute ambient sound" : "Play ambient gamelan sound"}
        >
          {isPlaying ? (
            // Sound ON icon — speaker with waves
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C6A75E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <motion.path
                d="M15.54 8.46a5 5 0 0 1 0 7.07"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.path
                d="M19.07 4.93a10 10 0 0 1 0 14.14"
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </svg>
          ) : (
            // Sound OFF icon — speaker with X
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C6A75E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-40 group-hover:opacity-70 transition-opacity"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
