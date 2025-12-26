import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { Building, Building2, Compass, HardHat, Calculator, Wrench, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useToast } from "../../hooks/use-toast";

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
  created_at: string;
}

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    building: Building,
    building2: Building2,
    compass: Compass,
    hardhat: HardHat,
    calculator: Calculator,
    wrench: Wrench,
  };
  return icons[iconName] || Wrench;
};



export const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.data);
      } else {
        throw new Error('Failed to fetch services');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les services.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="section-padding bg-background"
      ref={ref}
      aria-labelledby="services-heading"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4"
            role="text"
            aria-label="Section services"
          >
            Nos Services
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Solutions Complètes en Génie Civil
          </h2>
          <p className="text-muted-foreground text-lg">
            De la conception à la réalisation, nous fournissons des services complets
            adaptés à vos besoins spécifiques.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          role="grid"
          aria-label="Liste des services disponibles"
        >
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            services.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="group p-8 bg-card rounded-2xl border border-border hover:border-accent/30 transition-all duration-300 card-hover cursor-pointer"
                  role="gridcell"
                  tabIndex={0}
                  aria-label={`Service: ${service.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Could add navigation or modal opening logic here
                    }
                  }}
                >
                  <motion.div
                    className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    <IconComponent className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/services" aria-describedby="services-cta-desc">
            <Button variant="default" size="lg">
              Explorer Tous les Services
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
          <span id="services-cta-desc" className="sr-only">
            Accéder à la page complète des services pour plus de détails
          </span>
        </motion.div>
      </div>
    </section>
  );
};
