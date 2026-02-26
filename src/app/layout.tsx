import type { Metadata } from "next";
import { cinzel, cormorant, inter } from "@/fonts";
import "./globals.css";

const SITE_URL = "https://themaja.com";
const SITE_TITLE = "MAJA — Creative Economy Infrastructure of Nusantara";
const SITE_DESCRIPTION =
  "Uniting Nusantara Through Creativity. MAJA is the creative economy infrastructure connecting artists, collectors, and global communities through blockchain technology.";
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
    "Nusantara",
    "creative economy",
    "blockchain",
    "NFT",
    "digital art",
    "Majapahit",
    "Indonesia",
    "Web3",
    "cryptocurrency",
    "cultural heritage",
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
    apple: "/favicon.ico",
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
  name: "MAJA",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://twitter.com/themaborneo",
  ],
  foundingDate: "2024",
  knowsAbout: [
    "Creative Economy",
    "Blockchain Technology",
    "Nusantara Cultural Heritage",
    "Digital Art",
    "NFT",
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
        className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
