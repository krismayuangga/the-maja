"use client";
import React from "react";
import { motion } from "framer-motion";

export default function RoadmapSection() {
	return (
		<section className="relative py-20 bg-transparent text-inherit overflow-hidden">
			<span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
      {/* Background ukiran-maja.png seperti The Team */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/ukiran-maja.png"
          alt="Ornamen Ukiran Majapahit"
          className="object-cover object-center w-full h-full opacity-10"
          style={{mixBlendMode:'multiply'}}
          loading="eager"
        />
      </div>
      <div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 relative z-10">
        <h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold mb-12 text-[#ffd700] text-center drop-shadow-lg">
          Roadmap
        </h2>
				<div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
					{/* Tahap 1 */}
					<motion.div
						className="flex-1 bg-[#2a1a0b]/60 rounded-2xl shadow-xl border border-[#ffd700]/40 px-4 py-8 md:px-8 md:py-12 backdrop-blur-md flex flex-col justify-center hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500 group"
						initial={{ opacity: 0, x: -60 }}
						whileInView={{ opacity: 1, x: 0 }}
						whileHover={{ scale: 1.05, boxShadow: "0 0 40px 10px #ffd70088" }}
						transition={{ duration: 0.8, type: "spring" }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl md:text-2xl font-[var(--font-bhutuka)] text-[#ffd700] mb-3 font-bold flex items-center gap-2 group-hover:text-[#fff700] transition-colors duration-300">
							Tahap 1{" "}
							<span className="text-[#f3e9d2]">(Q3 2025)</span>
						</h3>
						<motion.ul
							className="list-disc pl-6 text-base md:text-lg text-[#f3e9d2] font-[var(--font-bhutuka)] space-y-1"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<li>Branding & Identitas Visual $MAJA</li>
							<li>Deploy Smart Contract BEP-20</li>
							<li>Pengembangan Galeri NFT tahap awal</li>
							<li>Onboarding 10 seniman lokal Trowulan</li>
						</motion.ul>
					</motion.div>
					{/* Tahap 2 */}
					<motion.div
						className="flex-1 bg-[#2a1a0b]/60 rounded-2xl shadow-xl border border-[#ffd700]/40 px-4 py-8 md:px-8 md:py-12 backdrop-blur-md flex flex-col justify-center hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500 group"
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.05, boxShadow: "0 0 40px 10px #ffd70088" }}
						transition={{ duration: 0.8, type: "spring" }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl md:text-2xl font-[var(--font-bhutuka)] text-[#ffd700] mb-3 font-bold flex items-center gap-2 group-hover:text-[#fff700] transition-colors duration-300">
							Tahap 2{" "}
							<span className="text-[#f3e9d2]">(Q4 2025)</span>
						</h3>
						<motion.ul
							className="list-disc pl-6 text-base md:text-lg text-[#f3e9d2] font-[var(--font-bhutuka)] space-y-1"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<li>Peluncuran marketplace NFT publik</li>
							<li>Program Airdrop & Community Challenge</li>
							<li>Pembuatan DAO Budaya pertama</li>
							<li>Event seni lokal: Pameran Majapahit Digital</li>
						</motion.ul>
					</motion.div>
					{/* Tahap 3 */}
					<motion.div
						className="flex-1 bg-[#2a1a0b]/60 rounded-2xl shadow-xl border border-[#ffd700]/40 px-4 py-8 md:px-8 md:py-12 backdrop-blur-md flex flex-col justify-center hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500 group"
						initial={{ opacity: 0, x: 60 }}
						whileInView={{ opacity: 1, x: 0 }}
						whileHover={{ scale: 1.05, boxShadow: "0 0 40px 10px #ffd70088" }}
						transition={{ duration: 0.8, type: "spring" }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl md:text-2xl font-[var(--font-bhutuka)] text-[#ffd700] mb-3 font-bold flex items-center gap-2 group-hover:text-[#fff700] transition-colors duration-300">
							Tahap 3{" "}
							<span className="text-[#f3e9d2]">(Q1 2026)</span>
						</h3>
						<motion.ul
							className="list-disc pl-6 text-base md:text-lg text-[#f3e9d2] font-[var(--font-bhutuka)] space-y-1"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<li>Integrasi dengan platform AR/Metaverse</li>
							<li>Peluncuran Game Edukasi Majapahit</li>
							<li>Ekspansi mitra (museum, akademisi, komunitas pelestari)</li>
						</motion.ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
