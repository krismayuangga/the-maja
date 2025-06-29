"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const team = [
	{ name: "Angga Adrianto", role: "Founder & Cultural Innovator", avatar: "/images/angga.png" },
	{ name: "Tim Dev", role: "Developer", avatar: "/images/dev.png" },
	{ name: "Tim Design", role: "Designer", avatar: "/images/design.png" },
	{ name: "Konsultan", role: "Konsultan", avatar: "/images/consultant.png" },
];

export default function TeamSection() {
	return (
		<section className="relative py-20 bg-transparent text-inherit overflow-hidden">
			<span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
			<div className="max-w-5xl mx-auto px-6 relative z-10">
				<h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#ffd700]">
					The Team
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{team.map((member, idx) => (
						<motion.div
							key={member.name}
							className="flex flex-col items-center"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: idx * 0.2 }}
							viewport={{ once: true }}
							whileHover={{ scale: 1.08, boxShadow: "0 0 16px #ffd700" }}
						>
							<div className="w-28 h-28 rounded-full border-4 border-[#b08d57] overflow-hidden mb-3 bg-[#2a1a3a] transition-transform duration-300">
								<Image
									src={member.avatar}
									alt={member.name}
									width={128}
									height={128}
									className="w-full h-full object-cover"
									priority={idx === 0}
								/>
							</div>
							<span className="font-bold text-lg text-[#ffd700]">
								{member.name}
							</span>
							<span className="text-sm text-[#f3e9d2]">{member.role}</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
