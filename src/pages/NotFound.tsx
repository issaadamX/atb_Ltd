import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Non Trouvée - Abakar Ingénieur Structure</title>
        <meta
          name="description"
          content="La page que vous recherchez n'existe pas. Retournez à l'accueil d'Abakar Ingénieur Structure."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="text-9xl">🔍</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Page Non Trouvée
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              Retournez à l'accueil pour découvrir nos services de génie civil.
            </p>
            <div className="space-x-4">
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Retour à l'Accueil
              </Link>
              <Link
                to="/contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
