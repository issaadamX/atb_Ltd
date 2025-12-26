import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingForm } from '../components/BookingForm';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Nous vous contacterons bientôt.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact - Abakar Ingénieur Structure</title>
        <meta
          name="description"
          content="Contactez Abakar Ingénieur Structure pour vos projets de construction à N'djamena. Devis gratuit et consultation personnalisée."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Contactez-Nous
              </h1>
              <p className="text-xl text-gray-600">
                Discutons de votre projet de construction
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Informations de Contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">66 84 57 32 / 99 84 57 32</p>
                      <p className="text-gray-600">Disponible du lundi au vendredi, 8h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">isahbenatb@gmail.com</p>
                      <p className="text-gray-600">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">Goudji, N'Djamena</p>
                      <p className="text-gray-600">Tchad</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">🕒</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Horaires d'Ouverture</h3>
                      <p className="text-gray-600">Lundi - Vendredi: 8h00 - 18h00</p>
                      <p className="text-gray-600">Samedi: 9h00 - 14h00</p>
                      <p className="text-gray-600">Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <span className="text-2xl">📘</span>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <span className="text-2xl">📷</span>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <span className="text-2xl">💼</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation Request Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Demander une Consultation
                </h2>
                <p className="text-gray-600 mb-6">
                  Remplissez ce formulaire pour demander une consultation gratuite.
                  Nous vous contacterons dans les 24 heures.
                </p>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
