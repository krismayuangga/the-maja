"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TokenUtilitySection() {
  return (
    <section className="relative py-20 bg-transparent text-inherit overflow-hidden">
      {/* Watermark aksara Jawa */}
      <span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-[#b08d57] opacity-10 select-none pointer-events-none z-0">
        ꦩꦗ
      </span>
      <div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 flex flex-col items-center relative z-10">
        {/* Judul & deskripsi di tengah */}
        <h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold mb-6 text-[#ffd700] drop-shadow-lg text-center">
          Utility Token & Semi-RWA
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-90 text-[#f3e9d2] text-center max-w-3xl">
          <span className="font-bold text-[#ffd700]">$MAJA</span> bukan sekadar
          token digital. Ia menjadi jembatan antara dunia budaya nyata dan
          ekosistem Web3 melalui konsep{" "}
          <span className="font-bold">Semi-RWA</span> (Real World Asset). Token
          ini memberi akses ke NFT, voting komunitas, kolaborasi, dan donasi
          transparan—semua tercatat abadi di blockchain.
        </p>
        {/* 2 panel di bawahnya */}
        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
          {/* Panel kiri: List utility */}
          <motion.div
            className="flex-1 flex flex-col justify-center bg-black/30 rounded-2xl p-8 md:p-12 shadow-xl border-2 border-[#b08d57]/30 backdrop-blur-md min-h-[340px]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <ul className="list-disc pl-5 space-y-2 text-base text-[#f3e9d2] mx-auto max-w-xl">
              <li>
                <span className="font-bold text-[#ffd700]">Akses NFT:</span> Token
                digunakan untuk membeli/mint NFT seni & budaya Majapahit.
              </li>
              <li>
                <span className="font-bold text-[#ffd700]">Voting:</span> Token
                sebagai hak suara dalam pengambilan keputusan komunitas.
              </li>
              <li>
                <span className="font-bold text-[#ffd700]">Kolaborasi:</span>
                Insentif bagi seniman, developer, & komunitas yang berkontribusi.
              </li>
              <li>
                <span className="font-bold text-[#ffd700]">Donasi:</span> Donasi
                on-chain untuk pelestarian budaya, transparan & terverifikasi.
              </li>
              <li>
                <span className="font-bold text-[#ffd700]">Semi-RWA:</span> NFT
                dapat mewakili aset budaya nyata (misal: karya seni, event,
                dokumentasi).
              </li>
            </ul>
          </motion.div>
          {/* Panel kanan: Infografis/diagram alur */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center gap-6 bg-black/30 rounded-2xl p-8 md:p-12 shadow-xl border-2 border-[#b08d57]/30 backdrop-blur-md min-h-[340px]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-xs mx-auto flex flex-col items-center">
              {/* Ilustrasi jembatan Semi-RWA */}
              <motion.div
                className="rounded-full bg-[#ffd700]/20 border-4 border-[#ffd700] w-24 h-24 flex items-center justify-center text-5xl mb-4 shadow-lg"
                whileHover={{ scale: 1.08 }}
              >
                <span>🏺</span>
              </motion.div>
              <span className="font-bold text-[#ffd700] mb-2 text-lg text-center">
                Semi-RWA Bridge
              </span>
              <div className="flex flex-col items-center gap-2 mt-2">
                <span className="text-base text-[#f3e9d2] text-center opacity-80">
                  Aset budaya nyata
                  <br />→ Blockchain
                  <br />→ Utility Web3
                </span>
                <svg
                  width="60"
                  height="40"
                  viewBox="0 0 60 40"
                  fill="none"
                  className="my-2"
                >
                  <path
                    d="M10 20 Q30 0 50 20"
                    stroke="#ffd700"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M50 20 L45 17 M50 20 L45 23"
                    stroke="#ffd700"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm text-[#ffd700] font-semibold">
                  NFT, Voting, Kolaborasi, Donasi
                </span>
              </div>
              {/* Ornamen aksara Jawa */}
              <span className="absolute -bottom-8 right-0 text-3xl text-[#b08d57]/30 select-none pointer-events-none font-serif">
                ꦩꦗ
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
