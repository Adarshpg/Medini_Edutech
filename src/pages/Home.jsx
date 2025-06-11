import HeroSection from "@/components/MediniEdutech/HeroSection";
import { FaqSection } from "@/components/MediniEdutech/FaqSection";
import { Contact } from "@/components/MediniEdutech/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full md:my-19">
      <HeroSection />
      <FaqSection />
      <Contact />
    </div>
  )
}

