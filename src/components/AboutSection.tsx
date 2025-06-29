"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-transparent text-inherit overflow-hidden">
      {/* Ornamen SVG pojok kiri atas & kanan bawah */}
      <svg className="absolute left-0 top-0 w-32 h-32 md:w-48 md:h-48 opacity-30 z-10" viewBox="0 0 100 100" fill="none"><path d="M0,0 Q50,40 100,0 Q60,60 0,100 Z" fill="#b08d57"/></svg>
      <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 opacity-20 z-10" viewBox="0 0 100 100" fill="none"><path d="M100,100 Q50,60 0,100 Q40,40 100,0 Z" fill="#ffd700"/></svg>
      {/* Watermark aksara Jawa animasi */}
      <motion.span
        initial={{ opacity: 0.08, y: 0 }}
        animate={{ opacity: [0.08, 0.16, 0.08], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-[#b08d57] select-none pointer-events-none z-0"
      >ꦩꦗ</motion.span>
      <span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>

      <div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 flex flex-col items-center gap-10 relative z-20">
        <h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold mb-12 text-[#ffd700] text-center drop-shadow-lg">Tentang <span className="bg-gradient-to-r from-[#ffd700] to-[#b08d57] bg-clip-text text-transparent">$MAJA</span></h2>
        {/* Row 3 kolom: Latar Belakang | Logo | Tujuan */}
        <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
          {/* Latar Belakang */}
          <motion.div
            className="flex-1 bg-[#2a1a0b]/60 rounded-2xl shadow-xl border border-[#ffd700]/40 px-4 py-8 md:px-8 md:py-12 backdrop-blur-md flex flex-col justify-center hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500 group"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px 10px #ffd70088' }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-[var(--font-bhutuka)] text-[#ffd700] mb-3 text-left flex items-center gap-3 group-hover:text-[#fff700] transition-colors duration-300">
              <span>Latar Belakang</span>
              <span className="flex-1 h-1 bg-gradient-to-r from-[#ffd700] to-[#b08d57] rounded-full opacity-40 ml-2" />
            </h3>
            <motion.p
              className="text-base md:text-lg text-[#f3e9d2] font-[var(--font-bhutuka)] text-left leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-[#ffd700] font-bold">Majapahit</span> merupakan simbol kejayaan Nusantara yang berpusat di <span className="text-[#ffd700]">Trowulan, Mojokerto</span>. Warisan sejarah dan seni Majapahit adalah bukti peradaban luhur yang kaya makna. Namun, hingga kini, upaya <span className="text-[#ffd700]">modernisasi</span> dan <span className="text-[#ffd700]">digitalisasi</span> untuk memperkenalkan warisan ini ke dunia masih sangat terbatas.
            </motion.p>
          </motion.div>
          {/* Logo tengah */}
          <motion.div
            className="flex-shrink-0 flex flex-col items-center justify-center min-w-[120px] md:min-w-[220px] relative"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08, rotate: 6 }}
            transition={{ duration: 0.9, type: 'spring' }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#ffd70055] via-[#b08d57aa] to-[#ffd70033] rounded-full blur-2xl opacity-60 z-0"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/images/majapahit-blockchain.png"
              alt="Majapahit & Blockchain"
              className="w-28 h-28 md:w-56 md:h-56 object-contain drop-shadow-xl shadow-[0_0_60px_10px_rgba(255,215,0,0.25)] rounded-full border-4 border-[#ffd700]/30 bg-[#2a1a0b]/40 relative z-10"
              style={{ boxShadow: "0 0 60px 10px #ffd70044, 0 0 0 8px #b08d5744" }}
              animate={{
                rotate: [0, 2, -2, 0],
                scale: [1, 1.04, 1],
                y: [0, -10, 0],
                filter: [
                  "drop-shadow(0 0 32px #ffd70088)",
                  "drop-shadow(0 0 48px #ffd700cc)",
                  "drop-shadow(0 0 32px #ffd70088)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.12,
                rotate: 8,
                boxShadow: "0 0 80px 20px #ffd700cc, 0 0 0 12px #b08d57cc"
              }}
              draggable={false}
            />
          </motion.div>
          {/* Tujuan */}
          <motion.div
            className="flex-1 bg-[#2a1a0b]/60 rounded-2xl shadow-xl border border-[#ffd700]/40 px-4 py-8 md:px-8 md:py-12 backdrop-blur-md flex flex-col justify-center hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500 group"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px 10px #ffd70088' }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-[var(--font-bhutuka)] text-[#ffd700] mb-3 text-left flex items-center gap-3 group-hover:text-[#fff700] transition-colors duration-300">
              <span>Tujuan</span>
              <span className="flex-1 h-1 bg-gradient-to-r from-[#ffd700] to-[#b08d57] rounded-full opacity-40 ml-2" />
            </h3>
            <motion.p
              className="text-base md:text-lg text-[#f3e9d2] font-[var(--font-bhutuka)] text-left leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-[#ffd700] font-bold">$MAJA</span> hadir sebagai inovasi <span className="text-[#ffd700]">pelestarian budaya</span> berbasis <span className="text-[#ffd700]">blockchain</span>. Token ini bukan sekadar aset digital, melainkan jembatan untuk <span className="text-[#ffd700]">mempromosikan</span>, <span className="text-[#ffd700]">melestarikan</span>, dan <span className="text-[#ffd700]">memberdayakan</span> seni-budaya Majapahit secara global—menghubungkan nilai ekonomi, teknologi, dan semangat gotong royong komunitas.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
