"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
	{
		icon: "🌏",
		title: "$MAJA: Token Budaya Semi-RWA",
		desc: "Token budaya yang terhubung langsung dengan nilai, kontribusi nyata, dan aset seni fisik lokal. Bukan sekadar digital, tapi berdampak di dunia nyata.",
	},
	{
		icon: "🏛️",
		title: "DAO Budaya",
		desc: "Pemegang $MAJA dapat memilih proyek pelestarian budaya—restorasi situs, pameran seni, hingga event budaya—secara transparan dan demokratis.",
	},
	{
		icon: "📜",
		title: "Digital Prasasti & Sertifikat",
		desc: "NFT eksklusif beraksara kuno dan interpretasi modern, menjadi koleksi digital bagi pelestari sejarah dan kolektor seni.",
	},
	{
		icon: "🕹️",
		title: "Game Edukasi Majapahit (Beta)",
		desc: "Platform edukasi berbasis game/AR: jelajahi Majapahit secara virtual, belajar sejarah dan budaya dengan cara interaktif.",
	},
];

export default function FeatureSection() {
	return (
		<section className="relative py-20 bg-transparent text-inherit overflow-hidden">
			{/* Watermark aksara Jawa tengah (lama, bisa dihapus jika ingin lebih clean) */}
			<span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>
				ꦩꦗ
			</span>
			{/* Watermark aksara Jawa */}
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-[#b08d57] opacity-10 select-none pointer-events-none z-0">
				ꦩꦗ
			</span>
			<div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 relative z-10">
				<h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold text-center mb-12 drop-shadow-lg text-[#ffd700]">
					Fitur Utama
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{features.map((f, i) => (
						<motion.div
							key={f.title}
							className="bg-black/30 rounded-2xl p-8 flex flex-col items-center shadow-xl border-2 border-[#b08d57]/30 hover:border-[#ffd700] transition group relative overflow-hidden min-h-[320px]"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: i * 0.15 }}
							viewport={{ once: true }}
							whileHover={{
								scale: 1.07,
								boxShadow: "0 0 32px #ffd700cc",
								rotate: [0, 2, -2, 0],
							}}
						>
							<span className="text-5xl md:text-6xl mb-4 drop-shadow-xl group-hover:animate-bounce">
								{f.icon}
							</span>
							<h3 className="text-lg md:text-xl font-bold text-[#ffd700] mb-2 font-[var(--font-bhutuka)] drop-shadow text-center">
								{f.title}
							</h3>
							<p className="text-sm md:text-base text-center text-[#f3e9d2] opacity-90 leading-relaxed">
								{f.desc}
							</p>
							{/* Ornamen aksara Jawa di sudut kartu */}
							<span className="absolute bottom-2 right-4 text-2xl text-[#b08d57]/30 select-none pointer-events-none font-serif">
								ꦩꦗ
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
