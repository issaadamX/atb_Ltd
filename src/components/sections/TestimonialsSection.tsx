import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../hooks/use-toast";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  type: string;
  video_url?: string;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        throw new Error('Failed to fetch testimonials');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les témoignages.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Ne nous croyez pas sur parole. Voici ce que nos clients satisfaits
            ont à dire sur leur expérience de collaboration avec nous.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/50 mb-6" />

              {/* Content */}
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-heading font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-primary-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
