"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MarketplacePreviewSection() {
  return (
    <section className="relative py-20 bg-transparent text-inherit overflow-hidden">
      {/* Watermark aksara Jawa */}
      <span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-[#b08d57] opacity-10 select-none pointer-events-none z-0">ꦩꦗ</span>

      <div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 flex flex-col items-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold mb-3 text-[#ffd700] text-center drop-shadow-lg">Marketplace Sneak Peek</h2>
        <div className="text-[#f3e9d2] text-lg md:text-xl mb-8 text-center opacity-80 max-w-2xl">Jelajahi karya NFT eksklusif Majapahit, hasil kolaborasi seniman Trowulan dan komunitas. Marketplace akan segera hadir dengan fitur lelang, koleksi, dan utility Web3.</div>
        <span className="inline-block bg-[#ffd700]/20 text-[#ffd700] px-4 py-2 rounded-full font-semibold mb-6 tracking-wide animate-pulse">Coming Soon</span>
        {/* Mockup NFT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 w-full justify-center">
          {/* NFT 1: Majapahit Royal Warrior */}
          <motion.div
            className="bg-[#2d1a0bcc] backdrop-blur-xl border-2 border-[#ffd700]/60 rounded-2xl p-6 shadow-2xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-[0_0_32px_#ffd70099] transition-transform duration-300 relative min-h-[320px] group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-4">
              <Image
                src="/images/nft1.png"
                alt="Majapahit Royal Warrior NFT"
                width={180}
                height={180}
                className="w-44 h-44 object-cover rounded-xl border-4 border-[#ffd700] shadow-lg"
                draggable={false}
                priority
              />
              <span className="absolute bottom-2 right-3 text-3xl text-[#b08d57]/40 select-none pointer-events-none font-serif group-hover:scale-110 transition-transform">ꦩꦗ</span>
            </div>
            <span className="font-bold text-xl text-[#ffd700] mb-1 text-center drop-shadow">Majapahit Royal Warrior</span>
            <span className="text-sm text-[#f3e9d2] mb-2 text-center">Seniman Trowulan</span>
            <span className="inline-block bg-[#ffd700]/10 text-[#ffd700] px-3 py-1 rounded-full text-xs font-semibold mt-auto">NFT Epic</span>
          </motion.div>
          {/* NFT 2: Majapahit Queen with Batik Veil */}
          <motion.div
            className="bg-[#2d1a0bcc] backdrop-blur-xl border-2 border-[#ffd700]/60 rounded-2xl p-6 shadow-2xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-[0_0_32px_#ffd70099] transition-transform duration-300 relative min-h-[320px] group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-4">
              <Image
                src="/images/nft2.png"
                alt="Majapahit Queen with Batik Veil NFT"
                width={180}
                height={180}
                className="w-44 h-44 object-cover rounded-xl border-4 border-[#ffd700] shadow-lg"
                draggable={false}
              />
              <span className="absolute bottom-2 right-3 text-3xl text-[#b08d57]/40 select-none pointer-events-none font-serif group-hover:scale-110 transition-transform">ꦩꦗ</span>
            </div>
            <span className="font-bold text-xl text-[#ffd700] mb-1 text-center drop-shadow">Majapahit Queen with Batik Veil</span>
            <span className="text-sm text-[#f3e9d2] mb-2 text-center">Seniman Trowulan</span>
            <span className="inline-block bg-[#ffd700]/10 text-[#ffd700] px-3 py-1 rounded-full text-xs font-semibold mt-auto">NFT Legendary</span>
          </motion.div>
          {/* NFT 3: Majapahit Mythical Creature */}
          <motion.div
            className="bg-[#2d1a0bcc] backdrop-blur-xl border-2 border-[#ffd700]/60 rounded-2xl p-6 shadow-2xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-[0_0_32px_#ffd70099] transition-transform duration-300 relative min-h-[320px] group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-4">
              <Image
                src="/images/nft3.png"
                alt="Majapahit Mythical Creature NFT"
                width={180}
                height={180}
                className="w-44 h-44 object-cover rounded-xl border-4 border-[#ffd700] shadow-lg"
                draggable={false}
              />
              <span className="absolute bottom-2 right-3 text-3xl text-[#b08d57]/40 select-none pointer-events-none font-serif group-hover:scale-110 transition-transform">ꦩꦗ</span>
            </div>
            <span className="font-bold text-xl text-[#ffd700] mb-1 text-center drop-shadow">Majapahit Mythical Creature</span>
            <span className="text-sm text-[#f3e9d2] mb-2 text-center">Seniman Trowulan</span>
            <span className="inline-block bg-[#ffd700]/10 text-[#ffd700] px-3 py-1 rounded-full text-xs font-semibold mt-auto">NFT Rare</span>
          </motion.div>
        </div>
        <button className="mt-2 px-8 py-3 rounded-full bg-[#ffd700]/60 text-[#2d1a0b] font-bold text-lg shadow-lg opacity-60 cursor-not-allowed" disabled>
          Lihat Marketplace
        </button>
      </div>
    </section>
  );
}
