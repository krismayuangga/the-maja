import { Suspense } from "react";
import type { Metadata } from "next";
import SertifikatClient from "@/components/sertifikat/SertifikatClient";

export const metadata: Metadata = {
  title: "Sertifikat Kepemilikan",
  description: "Periksa sertifikat kepemilikan phygital karya seni & kerajinan Nusantara dari ekosistem MAJA — MajaCraft dan MAJA Certified.",
  alternates: { canonical: "https://themaja.com/sertifikat/" },
};

export default function SertifikatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0A06]" />}>
      <SertifikatClient />
    </Suspense>
  );
}
