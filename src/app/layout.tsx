import type { Metadata } from "next";
import { cinzel, cormorant, inter } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAJA — Creative Economy Infrastructure of Nusantara",
  description: "Uniting Nusantara Through Creativity. MAJA is the creative economy infrastructure connecting artists, collectors, and global communities through blockchain technology.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
