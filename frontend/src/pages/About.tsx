import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>À Propos - ATB BUSINESS CENTER (ABC. sarl)</title>
        <meta
          name="description"
          content="Découvrez l'histoire, l'expertise et les valeurs d'ATB BUSINESS CENTER (ABC. sarl), votre partenaire de confiance en commerce général, transport, construction et menuiserie à N'djamena."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                À Propos de Nous
              </h1>
              <p className="text-xl text-gray-600">
                Excellence en commerce général, transport et construction
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre Histoire
                </h2>
                <p className="text-gray-600 mb-4">
                  Depuis 2013, ATB BUSINESS CENTER (ABC. sarl) s'est établi comme un acteur majeur dans les domaines du commerce général,
                  du transport et transit, de la construction et réhabilitation des bâtiments, ainsi que de la menuiserie métallique,
                  aluminium et bois à N'djamena.
                </p>
                <p className="text-gray-600">
                  Notre engagement envers l'excellence, la fiabilité et l'innovation nous permet de répondre aux besoins diversifiés
                  de nos clients, contribuant ainsi au développement économique et urbain de la région.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos Statistiques</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                    <div className="text-gray-600">Projets Réalisés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                    <div className="text-gray-600">Années d'Expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">Clients Satisfaits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                    <div className="text-gray-600">Respect des Délais</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Les Mots du Directeur Général</h2>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Présentation de l'Entreprise</h3>
                <p className="text-gray-600 mb-4">
                  ATB BUSINESS CENTER (ABC. sarl) est une entreprise tchadienne spécialisée dans le commerce général,
                  le transport et transit, la construction et réhabilitation des bâtiments, ainsi que la menuiserie
                  métallique, aluminium et bois. Fondée en 2013, notre société s'est rapidement imposée comme un
                  acteur de référence dans ces domaines d'activité.
                </p>
                <p className="text-gray-600 mb-4">
                  Notre expertise couvre l'ensemble du territoire national, avec une présence particulièrement marquée
                  à N'djamena. Nous nous engageons à fournir des services de qualité supérieure, répondant aux normes
                  internationales tout en respectant les spécificités locales de notre marché.
                </p>
                <p className="text-gray-600">
                  Grâce à une équipe qualifiée et expérimentée, ainsi qu'à des partenariats stratégiques avec des
                  fournisseurs de confiance, nous garantissons la satisfaction de nos clients et contribuons activement
                  au développement économique et urbain du Tchad.
                </p>
              </div>
              <div className="border-t pt-6">
                <div className="text-center">
                  <blockquote className="text-lg text-gray-600 italic">
                    "Chez ATB BUSINESS CENTER, nous croyons en l'excellence et l'intégrité dans tous nos services.
                    Notre mission est de fournir des solutions de qualité qui répondent aux besoins de nos clients
                    et contribuent au développement durable de notre communauté. Nous nous engageons à être un partenaire
                    fiable pour tous vos projets, qu'ils soient commerciaux, logistiques ou constructifs."
                  </blockquote>
                  <p className="text-gray-900 font-semibold mt-4">- Directeur Général, ATB BUSINESS CENTER</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualité</h3>
                  <p className="text-gray-600">
                    Nous nous engageons à fournir des travaux de la plus haute qualité,
                    respectant les normes internationales et les standards locaux.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sécurité</h3>
                  <p className="text-gray-600">
                    La sécurité de nos équipes et de nos clients est notre priorité absolue.
                    Tous nos chantiers respectent les normes de sécurité les plus strictes.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                  <p className="text-gray-600">
                    Nous intégrons les dernières technologies et méthodes de construction
                    pour optimiser les coûts et améliorer la durabilité de nos réalisations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
