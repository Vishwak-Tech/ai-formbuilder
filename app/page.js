import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import Footer from "./_components/footer";

export const metadata = {
  title: "AI Form Builder",
  description:
    "Create AI-powered forms in seconds using FormCraft. Generate, customize, publish and collect responses effortlessly.",
};

export default function Home() {
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <Footer/>
    </div>
  );
}
