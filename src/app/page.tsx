import { bhutuka } from "@/fonts-bhutuka";
// Semua section di bawah ini harus menggunakan background transparent.
// Gradasi hanya ada di parent wrapper ini.
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import TokenUtilitySection from "@/components/TokenUtilitySection";
import MarketplacePreviewSection from "@/components/MarketplacePreviewSection";
import RoadmapSection from "@/components/RoadmapSection";
import TeamSection from "@/components/TeamSection";
import CommunitySection from "@/components/CommunitySection";

export default function Home() {
  return (
    <div
      className={`min-h-screen ${bhutuka.variable}`}
      style={{
        background:
          "linear-gradient(180deg, #7A5B44 0%, #A07864 20%, #B29F94 40%,rgb(120, 105, 77) 60%, #603813 80%, #4A1A0A 100%)",
        backgroundColor: "#603813",
      }}
    >
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <TokenomicsSection />
      <TokenUtilitySection />
      <MarketplacePreviewSection />
      <RoadmapSection />
      <TeamSection />
      <CommunitySection />
    </div>
  );
}
