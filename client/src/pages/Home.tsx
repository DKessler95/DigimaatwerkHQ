import HeroSection from "@/components/HeroSection";
import { CMSServicesSection } from "@/components/CMSServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TechStackSection from "@/components/TechStackSection";
import PricingSection from "@/components/PricingSection";
import ProjectCalculator from "@/components/ProjectCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CMSServicesSection />
      <CaseStudiesSection />
      <TechStackSection />
      <PricingSection />
      <ProjectCalculator />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
};

export default Home;