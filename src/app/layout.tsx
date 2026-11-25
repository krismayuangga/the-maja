import type { Metadata } from "next";
import { cinzel, cormorant, inter, philosopher } from "@/fonts";
import "./globals.css";

const SITE_URL = "https://themaja.com";
const SITE_TITLE = "MAJA — Rumah Ekosistem Seni & Kerajinan Nusantara";
const SITE_DESCRIPTION =
  "MAJA adalah induk ekosistem MajaCraft: marketplace karya pengrajin Nusantara, MAJA Certified — sertifikat kepemilikan phygital untuk karya orisinal, Ruang Budaya, dan komunitas pegiat seni.";
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | MAJA",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MAJA",
    "MajaCraft",
    "MAJA Certified",
    "sertifikat kepemilikan",
    "phygital",
    "kerajinan Nusantara",
    "seni Indonesia",
    "pengrajin",
    "Majapahit",
    "warisan budaya",
    "ekonomi kreatif",
  ],
  authors: [{ name: "MAJA Team", url: SITE_URL }],
  creator: "MAJA",
  publisher: "MAJA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "MAJA",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "MAJA — Creative Economy Infrastructure of Nusantara",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@themaborneo",
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "theme-color": "#1a0a2e",
    "msapplication-TileColor": "#1a0a2e",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The MAJA",
  alternateName: "MAJA",
  url: SITE_URL,
  logo: `${SITE_URL}/images/museum/branding/themaja-logo-600.png`,
  description: SITE_DESCRIPTION,
  parentOrganization: {
    "@type": "Organization",
    name: "PT BSE Group Teknologi",
    address: { "@type": "PostalAddress", addressLocality: "Trowulan, Mojokerto", addressRegion: "Jawa Timur", addressCountry: "ID" },
  },
  email: "halo@majacraft.id",
  sameAs: [
    "https://majacraft.id",
    "https://www.instagram.com/majacraft.id/",
    "https://www.tiktok.com/@majacraft.id",
    "https://www.facebook.com/profile.php?id=61591981286814",
    "https://www.youtube.com/@MajaCraft",
  ],
  knowsAbout: [
    "Seni dan kerajinan Nusantara",
    "Marketplace karya seni",
    "Sertifikat kepemilikan karya",
    "Ekonomi kreatif",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${philosopher.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
