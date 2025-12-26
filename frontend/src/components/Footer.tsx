import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Abakar Ingénieur Structure</h3>
            <p className="text-gray-300">
              Services professionnels de génie civil pour projets résidentiels et commerciaux à N'djamena, Tchad.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">À Propos</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-white">Projets</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Construction Résidentielle</li>
              <li className="text-gray-300">Bâtiments Commerciaux</li>
              <li className="text-gray-300">Conception Structurelle</li>
              <li className="text-gray-300">Supervision de Chantier</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">📞 66 84 57 32 / 99 84 57 32</li>
              <li className="text-gray-300">✉️ isahbenatb@gmail.com</li>
              <li className="text-gray-300">📍 N'djamena, Tchad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 ATB BUSINESS CENTER (ABC. sarl). Tous droits réservés.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              Edit with Lovable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
