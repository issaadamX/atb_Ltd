import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LazyImage } from '../components/ui';
import { useToast } from '../hooks/use-toast';

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  images?: string[];
  year: number;
  location: string;
}

const Projects = () => {
  const [filter, setFilter] = useState('all');
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

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  return (
    <>
      <Helmet>
        <title>Projets - Abakar Ingénieur Structure</title>
        <meta
          name="description"
          content="Découvrez notre portfolio de projets de construction : villas modernes, bâtiments commerciaux, appartements et rénovations à N'djamena."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Projets Réalisés
              </h1>
              <p className="text-xl text-gray-600">
                Découvrez notre portfolio de constructions de qualité
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Tous les Projets
                </button>
                <button
                  onClick={() => setFilter('residential')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'residential'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Résidentiel
                </button>
                <button
                  onClick={() => setFilter('commercial')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'commercial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Commercial
                </button>
                <button
                  onClick={() => setFilter('renovation')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'renovation'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Rénovation
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <LazyImage
                    src={project.images && project.images[0] ? project.images[0] : '/assets/project-placeholder.jpg'}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {project.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>📅 {project.year}</span>
                      <span>📍 {project.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-blue-600 text-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Votre Projet en Tête ?
                </h2>
                <p className="text-xl mb-6">
                  Discutons de votre vision et réalisons-la ensemble.
                </p>
                <a
                  href="/contact"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
                >
                  Démarrer un Projet
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
