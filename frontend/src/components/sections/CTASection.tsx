import { Link } from "react-router-dom";
import { Button } from "../ui";
import { ArrowRight, Phone } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="relative bg-gradient-to-br from-navy via-navy to-navy-light rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
                Prêt à Démarrer Votre
                <span className="block text-accent">Projet de Construction ?</span>
              </h2>
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
                Discutons de votre vision et concrétisons-la. Planifiez une consultation gratuite
                avec nous et faites le premier pas vers votre bâtiment de rêve.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Planifier une Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+23566845732">
                  <Button variant="heroOutline" size="lg">
                    <Phone className="w-5 h-5" />
                    Appelez-Nous
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "Gratuit", label: "Consultation Initiale" },
                { value: "24/7", label: "Support Client" },
                { value: "100%", label: "Taux de Satisfaction" },
                { value: "10+", label: "Années d'Expérience" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-center"
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
