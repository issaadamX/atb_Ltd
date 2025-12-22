import { Link } from "react-router-dom";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import projectImage from "../../assets/3.jpg";

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className="container-max">
        <div
          className="relative bg-gradient-to-br from-navy via-navy to-navy-light rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden"
          ref={ref}
          aria-label="Section d'accueil avec image de fond"
        >
          {/* Background Image */}
          {inView && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
              style={{ backgroundImage: `url(${projectImage})` }}
              aria-hidden="true"
            />
          )}
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-navy/40 rounded-3xl" aria-hidden="true" />
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl" aria-hidden="true" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <div
                className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4"
                role="text"
                aria-label="Titre professionnel"
              >
                ATB BUSINESS CENTER (ABC. sarl)
              </div>
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6"
              >
                Construisons Vos
                <span className="block text-accent">Rêves Ensemble</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
                Services diversifiés en commerce général, transport, construction et menuiserie à N'Djamena.
                Spécialisés dans l'import-export, le transit, la réhabilitation des bâtiments et la fabrication
                de structures métalliques et boisées.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4" role="group" aria-label="Actions principales">
                <Link to="/contact">
                  <Button variant="hero" size="lg" aria-describedby="consultation-desc">
                    Consultation Gratuite
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <span id="consultation-desc" className="sr-only">
                  Planifier une consultation gratuite pour discuter de votre projet
                </span>
                <Link to="/projects">
                  <Button variant="heroOutline" size="lg" aria-describedby="projects-desc">
                    Voir Nos Projets
                  </Button>
                </Link>
                <span id="projects-desc" className="sr-only">
                  Explorer notre portfolio de projets réalisés
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-2 gap-6"
              role="region"
              aria-labelledby="stats-heading"
            >
              <h2 id="stats-heading" className="sr-only">Statistiques clés</h2>
              {[
                { value: "50+", label: "Projets Réalisés" },
                { value: "10+", label: "Années d'Expérience" },
                { value: "100%", label: "Taux de Satisfaction" },
                { value: "24/7", label: "Support Client" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-center"
                  role="text"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <p className="text-3xl font-heading font-bold text-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
