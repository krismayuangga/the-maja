/**
 * Titik provinsi untuk peta /images/museum/nusantara/indonesia-map.png (2317×872).
 * Isi peta (tanpa ruang kosong) ≈ bujur 95.0–141.0 BT, lintang 6.1 LU – 11.0 LS
 * → proyeksi equirectangular sederhana, hasil dalam persen terhadap ukuran gambar.
 */
const IMG_W = 2317, IMG_H = 872;
const X0 = 56, Y0 = 12, PX_LON = 2261 / 46, PX_LAT = 831 / 17.1;

export function project(lon: number, lat: number) {
  return {
    x: ((X0 + (lon - 95.0) * PX_LON) / IMG_W) * 100,
    y: ((Y0 + (6.1 - lat) * PX_LAT) / IMG_H) * 100,
  };
}

/** [nama tampilan, bujur, lintang] — titik di daratan dekat pusat/ibu kota provinsi */
const PROVINCES: Record<string, [string, number, number]> = {
  "ACEH": ["Aceh", 96.9, 4.4],
  "SUMATERA UTARA": ["Sumatera Utara", 99.0, 2.3],
  "SUMATERA BARAT": ["Sumatera Barat", 100.4, -0.9],
  "RIAU": ["Riau", 101.7, 0.3],
  "KEPULAUAN RIAU": ["Kepulauan Riau", 104.4, 1.0],
  "JAMBI": ["Jambi", 103.0, -1.6],
  "SUMATERA SELATAN": ["Sumatera Selatan", 104.2, -3.2],
  "BENGKULU": ["Bengkulu", 102.3, -3.8],
  "LAMPUNG": ["Lampung", 105.0, -5.0],
  "KEPULAUAN BANGKA BELITUNG": ["Bangka Belitung", 106.1, -2.3],
  "BANTEN": ["Banten", 106.1, -6.4],
  "DKI JAKARTA": ["DKI Jakarta", 106.85, -6.2],
  "JAWA BARAT": ["Jawa Barat", 107.6, -6.95],
  "JAWA TENGAH": ["Jawa Tengah", 110.2, -7.2],
  "DI YOGYAKARTA": ["DI Yogyakarta", 110.4, -7.85],
  "JAWA TIMUR": ["Jawa Timur", 112.4, -7.55],
  "BALI": ["Bali", 115.1, -8.4],
  "NUSA TENGGARA BARAT": ["Nusa Tenggara Barat", 117.0, -8.6],
  "NUSA TENGGARA TIMUR": ["Nusa Tenggara Timur", 121.0, -8.7],
  "KALIMANTAN BARAT": ["Kalimantan Barat", 110.5, 0.0],
  "KALIMANTAN TENGAH": ["Kalimantan Tengah", 113.5, -1.7],
  "KALIMANTAN SELATAN": ["Kalimantan Selatan", 115.3, -3.0],
  "KALIMANTAN TIMUR": ["Kalimantan Timur", 116.4, 0.4],
  "KALIMANTAN UTARA": ["Kalimantan Utara", 116.5, 3.0],
  "SULAWESI UTARA": ["Sulawesi Utara", 124.8, 1.4],
  "GORONTALO": ["Gorontalo", 122.6, 0.7],
  "SULAWESI TENGAH": ["Sulawesi Tengah", 121.0, -1.2],
  "SULAWESI BARAT": ["Sulawesi Barat", 119.3, -2.5],
  "SULAWESI SELATAN": ["Sulawesi Selatan", 120.0, -4.0],
  "SULAWESI TENGGARA": ["Sulawesi Tenggara", 122.3, -4.0],
  "MALUKU": ["Maluku", 129.5, -3.2],
  "MALUKU UTARA": ["Maluku Utara", 127.8, 0.8],
  "PAPUA BARAT DAYA": ["Papua Barat Daya", 131.6, -1.1],
  "PAPUA BARAT": ["Papua Barat", 133.5, -1.4],
  "PAPUA TENGAH": ["Papua Tengah", 136.5, -4.0],
  "PAPUA": ["Papua", 139.0, -2.8],
  "PAPUA PEGUNUNGAN": ["Papua Pegunungan", 139.0, -4.2],
  "PAPUA SELATAN": ["Papua Selatan", 139.5, -7.0],
};

const ALIASES: Record<string, string> = {
  "DAERAH ISTIMEWA YOGYAKARTA": "DI YOGYAKARTA", "YOGYAKARTA": "DI YOGYAKARTA", "DIY": "DI YOGYAKARTA",
  "JAKARTA": "DKI JAKARTA", "DAERAH KHUSUS IBUKOTA JAKARTA": "DKI JAKARTA",
  "NTB": "NUSA TENGGARA BARAT", "NTT": "NUSA TENGGARA TIMUR",
  "BANGKA BELITUNG": "KEPULAUAN BANGKA BELITUNG", "KEP BANGKA BELITUNG": "KEPULAUAN BANGKA BELITUNG",
  "KEPRI": "KEPULAUAN RIAU", "NANGGROE ACEH DARUSSALAM": "ACEH",
};

/** Kunci provinsi baku dari teks bebas ("Jawa Timur", "D.I. Yogyakarta", "Prov. Bali") */
export function provinceKey(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let k = raw.toUpperCase().replace(/\./g, "").replace(/^PROV(INSI)?\s+/, "").replace(/\s+/g, " ").trim();
  if (k.startsWith("DI ") === false && k.startsWith("D I ")) k = "DI " + k.slice(4);
  k = ALIASES[k] ?? k;
  return PROVINCES[k] ? k : null;
}

export function provinceInfo(key: string) {
  const p = PROVINCES[key];
  if (!p) return null;
  return { name: p[0], ...project(p[1], p[2]) };
}
