import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { LazyImage } from "../ui";
import { ArrowRight, MapPin, Home, Building2, Building, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../hooks/use-toast";

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  year: string;
  location: string;
}

const categories = [
  { id: "all", label: "Tous", icon: Building },
  { id: "residential", label: "Résidentiel", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building },
  { id: "renovation", label: "Rénovation", icon: Building2 },
];



export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.type === activeCategory);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Notre Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Projets Réalisés
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez notre collection de projets de construction réalisés avec succès,
            témoignant de notre engagement envers la qualité et l'excellence.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Filtrer les projets par catégorie">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary ${
                activeCategory === category.id
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-accent/10 hover:text-accent"
              }`}
              role="tab"
              aria-selected={activeCategory === category.id}
              aria-controls={`projects-${category.id}`}
              id={`tab-${category.id}`}
            >
              <category.icon className="w-4 h-4" aria-hidden="true" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
          id={`projects-${activeCategory}`}
        >
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-300 card-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary"
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Voir les détails du projet ${project.title} situé à ${project.location}`}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {categories.find(cat => cat.id === project.type)?.label}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                    <span className="mx-2">•</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Static Info */}
                <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {categories.find(cat => cat.id === project.type)?.label}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/projects">
            <Button variant="default" size="lg" aria-label="Voir tous les projets de construction">
              Voir Tous les Projets
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  closeModal();
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Fermer la fenêtre modale"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <LazyImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-8">
                  <h3 id="modal-title" className="text-3xl font-heading font-bold text-foreground mb-4">
                    {selectedProject.title}
                  </h3>
                  <p id="modal-description" className="text-muted-foreground text-lg mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Détails du Projet</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{selectedProject.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Localisation:</span>
                          <span className="font-medium">{selectedProject.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Année:</span>
                          <span className="font-medium">{selectedProject.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
