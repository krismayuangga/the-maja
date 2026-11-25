"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API = "https://majacraft.id";

type ListItem = { id: string; productName: string; sellerName: string; sellerStore: string; imageUrl: string | null; nftTokenId: string | null; issuedAt: string; source?: string };
type Detail = {
  id: string; productName: string; material: string | null; dimensions: string | null; weight: string | null; origin: string | null;
  artisan: string; studio: string; owner: string | null; source?: string; imageUrl: string | null; issuedAt: string;
  blockchain: { tokenId: string | null; txHash: string | null; mintedAt: string | null } | null;
  timeline: { type: string; title: string; description?: string | null; from?: string | null; to?: string | null; date?: string; createdAt?: string; txHash?: string | null }[];
  productSlug: string | null; productImage: string | null;
};

const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—");
const thumb = (c: { id: string }) => `${API}/uploads/certificates/thumbs/${c.id}.jpg`;

function Header() {
  return (
    <header className="flex items-center justify-between py-5 border-b border-[#C6A75E]/15">
      <Link href="/" className="flex items-center gap-2 text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/museum/branding/themaja-logo-600.png" alt="Logo The MAJA" className="w-9 h-9 object-contain" />
        <span className="tracking-[0.3em] text-sm">MAJA</span>
      </Link>
      <nav className="flex gap-4 text-xs tracking-widest uppercase text-[#F5EBDD]/60" style={{ fontFamily: "var(--font-inter)" }}>
        <Link href="/" className="hover:text-[#C6A75E]">Museum</Link>
        <a href="https://majacraft.id/certified" target="_blank" rel="noopener" className="hover:text-[#C6A75E]">Ajukan</a>
        <a href="https://majacraft.id" target="_blank" rel="noopener" className="hover:text-[#C6A75E]">MajaCraft</a>
      </nav>
    </header>
  );
}

function CertDetail({ id }: { id: string }) {
  const [d, setD] = useState<Detail | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "notfound">("loading");
  useEffect(() => {
    fetch(`${API}/api/certificate/${encodeURIComponent(id)}`).then((r) => r.json()).then((j) => {
      if (j?.success && j.data?.certificate) { setD(j.data.certificate); setState("ok"); } else setState("notfound");
    }).catch(() => setState("notfound"));
  }, [id]);

  if (state === "loading") return <p className="py-20 text-center text-[#F5EBDD]/50">Memuat sertifikat…</p>;
  if (state === "notfound" || !d) return (
    <div className="py-20 text-center space-y-3">
      <p className="text-xl text-[#C6A75E]" style={{ fontFamily: "var(--font-cinzel)" }}>Sertifikat tidak ditemukan</p>
      <p className="text-sm text-[#F5EBDD]/50">Periksa kembali ID sertifikat: <span className="font-mono">{id}</span></p>
      <Link href="/sertifikat/" className="inline-block text-xs text-[#C6A75E] underline">Kembali ke daftar sertifikat</Link>
    </div>
  );

  const rows: [string, string | null][] = [
    ["Nama Karya", d.productName], ["Pencipta", d.artisan], ["Penerbit", d.studio], ["Pemilik", d.owner],
    ["Material", d.material], ["Ukuran", d.dimensions], ["Berat", d.weight], ["Asal Daerah", d.origin], ["Diterbitkan", fmt(d.issuedAt)],
  ];
  return (
    <div className="py-8 space-y-8">
      <Link href="/sertifikat/" className="text-xs text-[#C6A75E]/80 hover:text-[#C6A75E]">← Semua sertifikat</Link>
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 rounded-xl overflow-hidden border border-[#C6A75E]/25 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={d.imageUrl ? `${API}${d.imageUrl}` : thumb(d)} alt={`Sertifikat ${d.productName}`} className="w-full h-auto" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C6A75E]/60">{d.source === "certified" ? "MAJA Certified · Sertifikat Kepemilikan" : "Sertifikat Kepemilikan Phygital"}</p>
            <h1 className="text-2xl sm:text-3xl text-[#C6A75E] mt-1" style={{ fontFamily: "var(--font-cinzel)" }}>{d.productName}</h1>
            <p className="font-mono text-xs text-[#F5EBDD]/50 mt-1">{d.id}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-green-400/90">● Sertifikat terdaftar &amp; valid</p>
          </div>
          <dl className="rounded-xl border border-[#C6A75E]/15 divide-y divide-[#C6A75E]/10 text-sm">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 px-4 py-2.5"><dt className="text-[#F5EBDD]/50">{k}</dt><dd className="text-[#F5EBDD] text-right">{v}</dd></div>
            ))}
          </dl>
          {d.blockchain?.txHash && (
            <a href={`https://bscscan.com/tx/${d.blockchain.txHash}`} target="_blank" rel="noopener" className="block rounded-xl border border-[#C6A75E]/15 px-4 py-3 text-xs hover:border-[#C6A75E]/40">
              <span className="text-[#F5EBDD]/50">Catatan blockchain (BNB Chain)</span>
              <span className="block text-[#C6A75E] mt-0.5">Token #{d.blockchain.tokenId} · lihat di BscScan →</span>
            </a>
          )}
          <a href={`${API}/verifikasi/${d.id}`} target="_blank" rel="noopener" className="block text-center rounded-xl border-2 border-[#C6A75E]/50 text-[#C6A75E] py-3 text-xs tracking-widest uppercase hover:bg-[#C6A75E]/10" style={{ fontFamily: "var(--font-cinzel)" }}>
            Unduh PDF &amp; detail lengkap
          </a>
        </div>
      </div>

      {d.timeline?.length > 0 && (
        <section>
          <h2 className="text-lg text-[#C6A75E] mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>Riwayat Kepemilikan</h2>
          <ol className="border-l border-[#C6A75E]/30 ml-2 space-y-4">
            {d.timeline.map((ev, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#C6A75E]" />
                <p className="text-sm text-[#F5EBDD]">{ev.title}</p>
                {ev.description && <p className="text-xs text-[#F5EBDD]/50">{ev.description}</p>}
                <p className="text-[11px] text-[#F5EBDD]/35 mt-0.5">{fmt(ev.date ?? ev.createdAt)}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <p className="text-xs text-[#F5EBDD]/40 italic">
        Sertifikat ini mencatat kepemilikan sah atas karya — bukan penilaian keaslian maupun nilai karya. Tidak dapat diperjualbelikan (soulbound).
      </p>
    </div>
  );
}

function CertList({ initialQ }: { initialQ: string }) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState(initialQ);
  const [search, setSearch] = useState(initialQ);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams({ page: String(page), limit: "12", ...(search && { search }) });
    const j = await fetch(`${API}/api/certificate?${p}`).then((r) => r.json()).catch(() => null);
    setItems(j?.data?.certificates ?? []);
    setPages(j?.data?.pagination?.totalPages ?? j?.data?.pagination?.pages ?? 1);
    setTotal(j?.data?.pagination?.total ?? 0);
    setLoading(false);
  }, [page, search]);
  useEffect(() => { void load(); }, [load]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim().replace(/^#?MC-(?=\d{4}-)/i, "MAJA-"); // format cetak "#MC-…"
    if (/^MAJA-\d{4}-/i.test(v)) { window.location.href = `/sertifikat/?id=${encodeURIComponent(v.toUpperCase())}`; return; }
    setPage(1); setSearch(v);
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C6A75E]/50" style={{ fontFamily: "var(--font-philosopher)" }}>Arsip Kepemilikan</p>
        <h1 className="text-3xl sm:text-4xl text-[#C6A75E] mt-2" style={{ fontFamily: "var(--font-cinzel)" }}>Sertifikat MAJA</h1>
        <p className="text-[#F5EBDD]/60 mt-2 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem" }}>
          Periksa sertifikat kepemilikan phygital karya Nusantara — dari marketplace MajaCraft maupun MAJA Certified. {total ? `${total} sertifikat tercatat.` : ""}
        </p>
      </div>
      <form onSubmit={submit} className="flex max-w-xl mx-auto gap-2 mb-8">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ID sertifikat, nama karya, atau seniman"
          className="flex-1 h-11 px-4 rounded-lg bg-[#1A1008] border border-[#C6A75E]/30 text-[#F5EBDD] placeholder:text-[#F5EBDD]/30 text-sm focus:outline-none focus:border-[#C6A75E]" />
        <button className="h-11 px-5 rounded-lg border border-[#C6A75E]/60 text-[#C6A75E] text-xs tracking-widest uppercase hover:bg-[#C6A75E]/10">Cari</button>
      </form>
      {loading ? <p className="text-center text-[#F5EBDD]/40 py-10">Memuat…</p> : items.length === 0 ? (
        <p className="text-center text-[#F5EBDD]/40 py-10">Tidak ada sertifikat yang cocok.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((c) => (
            <Link key={c.id} href={`/sertifikat/?id=${c.id}`} className="group block border border-[#C6A75E]/20 bg-[#1A1008]/60 rounded-lg overflow-hidden hover:border-[#C6A75E]/60 transition-colors">
              <div className="aspect-[3/2] bg-black/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(c)} alt={c.productName} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { if (c.imageUrl) (e.target as HTMLImageElement).src = `${API}${c.imageUrl}`; }} />
              </div>
              <div className="p-3">
                <p className="text-sm text-[#F5EBDD] line-clamp-1">{c.productName}</p>
                <p className="text-xs text-[#C6A75E]/70 line-clamp-1">{c.sellerName}{c.source === "certified" ? " · MAJA Certified" : ` · ${c.sellerStore}`}</p>
                <p className="text-[10px] text-[#F5EBDD]/30 font-mono mt-1">{c.id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8 text-sm">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-lg border border-[#C6A75E]/30 text-[#C6A75E] disabled:opacity-30">←</button>
          <span className="text-[#F5EBDD]/60">{page} / {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg border border-[#C6A75E]/30 text-[#C6A75E] disabled:opacity-30">→</button>
        </div>
      )}
    </div>
  );
}

export default function SertifikatClient() {
  const sp = useSearchParams();
  const id = sp.get("id");
  return (
    <div className="min-h-screen bg-[#0D0A06] text-[#F5EBDD]" style={{ fontFamily: "var(--font-inter)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        {id ? <CertDetail id={id} /> : <CertList initialQ={sp.get("q") ?? ""} />}
        <footer className="py-8 mt-8 border-t border-[#C6A75E]/10 text-center text-xs text-[#F5EBDD]/30">
          MAJA — Rumah Ekosistem Seni &amp; Kerajinan Nusantara · Data sertifikat dari majacraft.id
        </footer>
      </div>
    </div>
  );
}
