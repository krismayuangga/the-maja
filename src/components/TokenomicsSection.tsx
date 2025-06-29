"use client";
import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ label: "Staking & Reward", percent: 30, amount: 300_000_000, color: "#ffd700" },
	{ label: "Tim & Pengembang", percent: 15, amount: 150_000_000, color: "#b08d57" },
	{ label: "Community & Airdrop", percent: 15, amount: 150_000_000, color: "#6e2639" },
	{ label: "Ekosistem Seniman", percent: 20, amount: 200_000_000, color: "#a67c52" },
	{ label: "Likuiditas & Listing", percent: 10, amount: 100_000_000, color: "#2d1a0b" },
	{ label: "Dana Budaya (DAO)", percent: 10, amount: 100_000_000, color: "#2a1a3a" },
];

export default function TokenomicsSection() {
	return (
		<section className="relative py-20 bg-transparent text-inherit overflow-hidden">
			{/* Watermark aksara Jawa pojok kanan atas tetap */}
			<span className="hidden md:block absolute right-8 top-4 text-5xl md:text-7xl font-serif text-[#ffd700] opacity-15 select-none pointer-events-none z-10" style={{lineHeight:'1'}}>ꦩꦗ</span>
			<div className="w-full max-w-[98vw] md:max-w-[1500px] mx-auto px-0 flex flex-col items-center gap-10 relative z-10">
				<h2 className="text-3xl md:text-5xl font-[var(--font-bhutuka)] font-bold mb-4 text-[#ffd700] text-center drop-shadow-lg">Tokenomics $MAJA</h2>
				<div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
					{/* Pie Chart */}
					<motion.div
						className="flex-1 flex flex-col items-center justify-center min-w-0"
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, type: 'spring' }}
						viewport={{ once: true }}
					>
						<div className="relative w-full flex justify-center items-center h-[340px] md:h-[420px]">
							<div className="w-full h-full max-w-full md:max-w-none flex-1 flex items-center justify-center">
								<ResponsiveContainer width="95%" height="100%">
									<PieChart>
										<Pie
											data={data}
											cx="50%"
											cy="50%"
											innerRadius={90}
											outerRadius={140}
											dataKey="percent"
											isAnimationActive={true}
											animationDuration={900}
											paddingAngle={2}
											label={({ cx, cy, midAngle, outerRadius, index }) => {
												if (typeof index !== 'number' || typeof midAngle !== 'number' || typeof cx !== 'number' || typeof cy !== 'number' || typeof outerRadius !== 'number') return null;
												const RADIAN = Math.PI / 180;
												const radius = outerRadius - 30;
												const x = cx + radius * Math.cos(-midAngle * RADIAN);
												const y = cy + radius * Math.sin(-midAngle * RADIAN);
												return (
													<text
														x={x}
														y={y}
														fill="#fffbe6"
														fontSize={13}
														fontWeight="bold"
														textAnchor="middle"
														alignmentBaseline="middle"
														style={{ pointerEvents: 'none', textShadow: '0 1px 6px #000, 0 0 2px #ffd700' }}
													>
														{data[index].label}
													</text>
												);
											}}
										>
											{data.map((entry, i) => (
												<Cell key={`cell-${i}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip
											content={({ active, payload }) => {
												if (!active || !payload || !payload[0]) return null;
												const d = payload[0].payload;
												return (
													<div className="bg-[#1a0e05ee] border border-[#ffd700] rounded-xl px-4 py-2 text-xs text-[#ffd700] font-bold shadow-2xl min-w-[110px] text-center animate-fade-in">
														<div>{d.label}</div>
														<div>{d.percent}% • {d.amount.toLocaleString('id-ID')} $MAJA</div>
													</div>
												);
											}}
											cursor={{ fill: '#ffd70022' }}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
						</div>
					</motion.div>
					{/* Tabel Tokenomics */}
					<motion.div
						className="flex-1 bg-black/30 rounded-2xl p-6 md:p-10 shadow-xl backdrop-blur-md border-2 border-[#ffd700]/20 hover:scale-105 hover:shadow-[0_0_40px_10px_#ffd70055] transition-transform duration-500"
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						whileHover={{ scale: 1.05, boxShadow: '0 0 40px 10px #ffd70088' }}
						transition={{ duration: 1, type: 'spring' }}
						viewport={{ once: true }}
					>
						<table className="w-full text-left text-base mb-6">
							<thead>
								<tr className="text-[#ffd700] border-b border-[#ffd700]/30">
									<th className="py-2">Kategori</th>
									<th className="py-2">Persentase</th>
									<th className="py-2">Jumlah Token</th>
								</tr>
							</thead>
							<tbody>
								{data.map((d) => (
									<tr key={d.label} className="border-b border-[#ffd700]/10 hover:bg-[#ffd70011] transition">
										<td className="py-2 font-semibold" style={{ color: d.color }}>{d.label}</td>
										<td className="py-2">{d.percent}%</td>
										<td className="py-2">{d.amount.toLocaleString("id-ID")}</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* Info detail token singkat 2 baris */}
						<div className="w-full flex flex-col items-center mt-2">
							<div className="w-full bg-[#2d1a0b]/70 border border-[#ffd700]/30 rounded-xl px-4 py-3 shadow-inner text-sm md:text-base font-semibold text-[#f3e9d2] text-center space-y-1">
								<div>
									<span className="text-[#ffd700]">Nama Token:</span> Maja Token
									<span className="mx-2 text-[#ffd700]">|</span>
									<span className="text-[#ffd700]">Simbol:</span> $MAJA
								</div>
								<div>
									<span className="text-[#ffd700]">Jaringan:</span> BSC (BEP-20)
									<span className="mx-2 text-[#ffd700]">|</span>
									<span className="text-[#ffd700]">Total Suplai:</span> 1 Milyar $MAJA
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
