import { AboutHero } from "@/components/MediniEdutech/about/AboutHero"
import { PartnersSection } from "@/components/MediniEdutech/about/PartnersSection"

function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-gray-900">
      <AboutHero />
      <PartnersSection />
    </div>
  )
}

export default AboutPage