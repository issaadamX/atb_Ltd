import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-navy via-navy to-navy-light shadow-lg" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3" aria-label="Page d'accueil">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-navy font-bold text-lg" aria-hidden="true">
                IS
              </div>
              <span className="text-primary-foreground text-sm font-medium">
                ATB BUSINESS CENTER (ABC. sarl)
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            <Link to="/" className="text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1" role="menuitem">Accueil</Link>
            <Link to="/about" className="text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1" role="menuitem">À Propos</Link>
            <Link to="/services" className="text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1" role="menuitem">Services</Link>
            <Link to="/projects" className="text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1" role="menuitem">Projets</Link>
            <Link to="/contact" className="text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded px-2 py-1" role="menuitem">Contact</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-primary-foreground hover:text-accent transition-colors p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
              aria-label={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
            </button>

            <Link to="/contact">
              <button className="bg-accent text-navy px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy">
                Consultation Gratuite
              </button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy p-2 rounded"
              aria-label={isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden" id="mobile-menu" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-light rounded-lg mt-2">
              <Link to="/" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded" role="menuitem" onClick={() => setIsOpen(false)}>Accueil</Link>
              <Link to="/about" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded" role="menuitem" onClick={() => setIsOpen(false)}>À Propos</Link>
              <Link to="/services" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded" role="menuitem" onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/projects" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded" role="menuitem" onClick={() => setIsOpen(false)}>Projets</Link>
              <Link to="/contact" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy rounded" role="menuitem" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="text-primary-foreground hover:text-accent transition-colors p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
                  aria-label={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
