"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CommunitySection() {
  const buttons = [
    { label: "Telegram", href: "https://t.me/themaja" },
    { label: "Discord", href: "https://discord.gg/themaja" },
    { label: "Twitter", href: "https://twitter.com/themaja" },
  ];
  return (
    <section className="relative py-20 bg-transparent text-inherit overflow-hidden">
      {/* Watermark aksara Jawa */}
      <span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
      <motion.div
        className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Stempel Majapahit */}
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="#b08d57" strokeWidth="4" fill="#2d1a0b" />
            <text x="50%" y="54%" textAnchor="middle" fill="#ffd700" fontSize="32" fontFamily="serif">ꦩꦗ</text>
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#ffd700] drop-shadow-lg">Gabung Komunitas</h2>
        <p className="mb-6 text-lg">Bergabunglah dengan komunitas $MAJA untuk update terbaru, event, dan airdrop eksklusif!</p>
        <div className="flex gap-4 justify-center mb-6">
          {buttons.map((btn) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener"
              className="px-4 py-2 rounded-lg bg-[#b08d57] text-white font-bold shadow hover:bg-[#a67c52] transition relative overflow-hidden"
              whileHover={{ scale: 1.1, boxShadow: "0 0 24px #ffd700" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{btn.label}</span>
              {/* Glowing effect */}
              <span className="absolute inset-0 rounded-lg pointer-events-none opacity-40 blur-md bg-gradient-to-br from-[#ffd700] to-[#b08d57] z-0" />
            </motion.a>
          ))}
        </div>
        <motion.a
          href="#"
          className="inline-block px-8 py-3 rounded-full border-2 border-[#ffd700] text-[#ffd700] font-bold bg-transparent hover:bg-[#ffd700] hover:text-[#2d1a0b] transition text-lg relative overflow-hidden"
          whileHover={{ scale: 1.08, boxShadow: "0 0 24px #ffd700" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Daftar Airdrop</span>
          {/* Glowing effect */}
          <span className="absolute inset-0 rounded-full pointer-events-none opacity-30 blur-md bg-gradient-to-br from-[#ffd700] to-[#b08d57] z-0" />
        </motion.a>
      </motion.div>
    </section>
  );
}
