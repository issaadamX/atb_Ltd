import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { CTASection } from "../components/sections/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Abakar Ingénieur Structure | Services de Construction de Qualité à N'djamena</title>
        <meta
          name="description"
          content="Services professionnels de génie civil pour projets résidentiels et commerciaux à N'djamena, Tchad. Construction experte, conception structurelle et gestion de projet fiable."
        />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
