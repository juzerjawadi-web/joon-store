import type { Metadata } from "next";
import SamsungHeader from "../../components/samsung/SamsungHeader";
import SamsungHero from "../../components/samsung/SamsungHero";
import SamsungHighlights from "../../components/samsung/SamsungHighlights";
import SamsungModelComparison from "../../components/samsung/SamsungModelComparison";
import SamsungFloatingBar from "../../components/samsung/SamsungFloatingBar";
import SamsungFooter from "../../components/samsung/SamsungFooter";

export const metadata: Metadata = {
  title: "Samsung Galaxy Z Fold8 Ultra | Fold8 | Flip8 — JOON STORES",
  description: "Experience the all-new Samsung Galaxy Z Fold8 Ultra, Fold8, and Flip8. Authentic sealed Dubai units with worldwide warranty at JOON STORES Dub-Ind.",
};

export default function SamsungPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#2189ff]/20 overflow-x-hidden">
      <SamsungHeader />
      <SamsungHero />
      <SamsungHighlights />
      <SamsungModelComparison />
      <SamsungFloatingBar />
      <SamsungFooter />
    </main>
  );
}
