import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import UpgradeHero from "./_components/UpgradeHero"

export default function Home() {
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <UpgradeHero/>
    </div>
  );
}
