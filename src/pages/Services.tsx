import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const Services = () => {
  const services = [
    {
      title: 'Commerce Général',
      description: 'Services complets de commerce général pour répondre à tous vos besoins commerciaux. Importation, exportation, distribution et vente de produits diversifiés.',
      features: ['Import/Export', 'Distribution', 'Vente au détail', 'Conseil commercial'],
      icon: '🏪'
    },
    {
      title: 'Transport & Transit',
      description: 'Solutions de transport et transit fiables pour vos marchandises. Logistique terrestre, aérienne et maritime avec suivi en temps réel.',
      features: ['Transport terrestre', 'Transit international', 'Logistique', 'Suivi en temps réel'],
      icon: '🚛'
    },
    {
      title: 'Construction et Réhabilitation des Bâtiments',
      description: 'Construction neuve et réhabilitation de bâtiments. Travaux publics, rénovation et modernisation d\'infrastructures avec expertise technique.',
      features: ['Construction neuve', 'Réhabilitation', 'Travaux publics', 'Expertise technique'],
      icon: '🏗️'
    },
    {
      title: 'Menuiserie Métallique',
      description: 'Fabrication et installation de structures métalliques. Portes, fenêtres, clôtures et charpentes métalliques sur mesure.',
      features: ['Structures métalliques', 'Portes & fenêtres', 'Clôtures', 'Charpentes'],
      icon: '🔧'
    },
    {
      title: 'Menuiserie Aluminium',
      description: 'Travail spécialisé en aluminium pour vos projets. Fenêtres, portes, façades et structures légères en aluminium de qualité.',
      features: ['Fenêtres aluminium', 'Portes coulissantes', 'Façades', 'Structures légères'],
      icon: '🏠'
    },
    {
      title: 'Menuiserie Bois',
      description: 'Artisanat du bois pour aménagements intérieurs et extérieurs. Mobilier sur mesure, parquets, escaliers et finitions boisées.',
      features: ['Mobilier sur mesure', 'Parquets', 'Escaliers', 'Aménagements boisés'],
      icon: '🪵'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - ATB BUSINESS CENTER (ABC. sarl)</title>
        <meta
          name="description"
          content="Découvrez nos services : commerce général, transport & transit, construction et réhabilitation des bâtiments, menuiserie métallique, aluminium et bois à N'djamena."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Services
              </h1>
              <p className="text-xl text-gray-600">
                Services diversifiés en commerce, transport, construction et menuiserie
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Inclus dans le service :</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-blue-600 text-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">
                  Besoin d'un Service Spécifique ?
                </h2>
                <p className="text-xl mb-6">
                  Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
                </p>
                <a
                  href="/contact"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
                >
                  Demander un Devis
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

export default Services;
