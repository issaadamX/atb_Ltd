import React, { useState, useEffect } from 'react';
import { Info, Briefcase, Phone, Layout, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

interface ContentData {
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  services: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  sections: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
}

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState<ContentData>({
    about: {
      title: 'À Propos de BuildPro Engineering',
      description: 'Avec plus de 20 ans d\'expérience dans l\'industrie de la construction, BuildPro Engineering s\'est établi comme une entreprise leader d\'ingénierie civile dans la région. Notre engagement envers la qualité, l\'innovation et la satisfaction client nous a valu une réputation d\'excellence.',
      mission: 'Livrer des projets de construction exceptionnels qui dépassent les attentes des clients tout en maintenant les plus hauts standards de sécurité et de durabilité.',
      vision: 'Être l\'entreprise d\'ingénierie civile la plus fiable et innovante de la région.'
    },
    services: {
      title: 'Nos Services',
      description: 'Nous offrons une gamme complète de services de construction et d\'ingénierie.'
    },
    contact: {
      title: 'Contactez-Nous',
      description: 'Nous sommes là pour vous aider avec vos projets de construction.',
      address: '123 Rue Principale, Ville, Pays',
      phone: '+966 50 123 4567',
      email: 'info@buildpro.com'
    },
    sections: {
      hero: {
        title: 'Excellence en Construction',
        subtitle: 'Construire l\'avenir avec innovation et qualité'
      }
    }
  });

  const tabs = [
    { id: 'about', name: 'À Propos', icon: Info },
    { id: 'services', name: 'Services', icon: Briefcase },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'sections', name: 'Sections', icon: Layout }
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call would go here
      // await contentAPI.updateContent(contentData);
      console.log('Saving content:', contentData);
      setTimeout(() => {
        setLoading(false);
        alert('Contenu sauvegardé avec succès!');
      }, 1000);
    } catch (error) {
      console.error('Failed to save content:', error);
      setLoading(false);
    }
  };

  const updateContent = (section: keyof ContentData, field: string, value: string) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderAboutSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section À Propos</h3>
        <p className="text-sm text-gray-600 mb-6">Modifiez le contenu de la page à propos de votre entreprise</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la Section</label>
        <div className="relative">
          <div className="min-h-[40px] p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div 
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => updateContent('about', 'title', e.currentTarget.textContent || '')}
            >
              À Propos de BuildPro Engineering
            </div>
          </div>
          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <div className="relative">
          <div className="min-h-[120px] p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div 
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => updateContent('about', 'description', e.currentTarget.textContent || '')}
            >
              Avec plus de 20 ans d'expérience dans l'industrie de la construction, BuildPro Engineering s'est établi comme une entreprise leader d'ingénierie civile dans la région. Notre engagement envers la qualité, l'innovation et la satisfaction client nous a valu une réputation d'excellence.
            </div>
          </div>
          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Déclaration de Mission</label>
        <div className="relative">
          <div className="min-h-[80px] p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div 
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => updateContent('about', 'mission', e.currentTarget.textContent || '')}
            >
              Livrer des projets de construction exceptionnels qui dépassent les attentes des clients tout en maintenant les plus hauts standards de sécurité et de durabilité.
            </div>
          </div>
          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Déclaration de Vision</label>
        <div className="relative">
          <div className="min-h-[60px] p-3 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div 
              contentEditable
              suppressContentEditableWarning
              className="outline-none"
              onBlur={(e) => updateContent('about', 'vision', e.currentTarget.textContent || '')}
            >
              Être l'entreprise d'ingénierie civile la plus fiable et innovante de la région.
            </div>
          </div>
          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-900 text-white flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder les Modifications
        </Button>
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section Services</h3>
        <p className="text-sm text-gray-600 mb-6">Modifiez le contenu de la page services</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la Section</label>
        <Input
          value={contentData.services.title}
          onChange={(e) => updateContent('services', 'title', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <Textarea
          value={contentData.services.description}
          onChange={(e) => updateContent('services', 'description', e.target.value)}
          rows={4}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section Contact</h3>
        <p className="text-sm text-gray-600 mb-6">Modifiez les informations de contact</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la Section</label>
        <Input
          value={contentData.contact.title}
          onChange={(e) => updateContent('contact', 'title', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <Textarea
          value={contentData.contact.description}
          onChange={(e) => updateContent('contact', 'description', e.target.value)}
          rows={3}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
          <Input
            value={contentData.contact.address}
            onChange={(e) => updateContent('contact', 'address', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <Input
            value={contentData.contact.phone}
            onChange={(e) => updateContent('contact', 'phone', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <Input
          value={contentData.contact.email}
          onChange={(e) => updateContent('contact', 'email', e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderSectionsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sections du Site</h3>
        <p className="text-sm text-gray-600 mb-6">Modifiez les sections principales du site web</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre Principal</label>
        <Input
          value={contentData.sections.hero.title}
          onChange={(e) => updateContent('sections', 'title', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
        <Input
          value={contentData.sections.hero.subtitle}
          onChange={(e) => updateContent('sections', 'subtitle', e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return renderAboutSection();
      case 'services':
        return renderServicesSection();
      case 'contact':
        return renderContactSection();
      case 'sections':
        return renderSectionsTab();
      default:
        return renderAboutSection();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Gestion de Contenu
        </h1>
        <p className="text-gray-600">
          Gérez le contenu de votre site web et les sections
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-slate-800 hover:bg-slate-900 text-white flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Sauvegarde...' : 'Sauvegarder les Modifications'}
        </Button>
      </div>
    </div>
  );
};

export default Content;