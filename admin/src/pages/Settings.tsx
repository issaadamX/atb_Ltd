import React, { useState } from 'react';
import { Upload, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'BuildPro Engineering',
    email: 'admin@buildpro.com',
    phone: '+966 11 234 5678',
    website: 'https://buildpro.com',
    address: 'King Fahd Road, Al-Olaya District, Riyadh, Saudi Arabia',
    taxId: 'SA-1234567890'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call would go here
      setTimeout(() => {
        setLoading(false);
        alert('Paramètres sauvegardés avec succès!');
      }, 1000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Paramètres
        </h1>
        <p className="text-gray-600">
          Gérez le profil de votre entreprise et les préférences
        </p>
      </div>

      {/* Company Logo Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Logo de l'Entreprise</h2>
        <p className="text-sm text-gray-600 mb-6">Téléchargez le logo de votre entreprise à afficher sur le site web</p>
        
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Télécharger Logo
            </Button>
            <p className="text-xs text-gray-500 mt-2">Taille recommandée: 200x200px. Taille max: 2MB</p>
          </div>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Informations de l'Entreprise</h2>
        <p className="text-sm text-gray-600 mb-6">Mettez à jour les détails de votre entreprise affichés dans le panneau d'administration</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'Entreprise</label>
            <Input
              value={companyData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
            <Input
              type="email"
              value={companyData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de Téléphone</label>
            <Input
              value={companyData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Web</label>
            <Input
              value={companyData.website}
              onChange={(e) => updateField('website', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse du Bureau</label>
            <Input
              value={companyData.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Fiscal / Numéro d'Enregistrement</label>
            <Input
              value={companyData.taxId}
              onChange={(e) => updateField('taxId', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-slate-800 hover:bg-slate-900 text-white flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Sauvegarde...' : 'Sauvegarder Tous les Changements'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;