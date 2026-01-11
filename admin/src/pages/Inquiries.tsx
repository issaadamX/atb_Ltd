import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, User, Eye, Reply, Trash2, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { inquiriesAPI } from '../api/inquiries.api';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  response?: string;
  createdAt: string;
  updatedAt: string;
}

const Inquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params: any = { page: 1, limit: 10 };
      if (selectedStatus !== 'all') params.status = selectedStatus;
      
      const response = await inquiriesAPI.getAllInquiries(params);
      if (response.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setResponse(inquiry.response || '');
    setShowModal(true);

    // Mark as read if it's new
    if (inquiry.status === 'new') {
      try {
        await inquiriesAPI.updateInquiryStatus(inquiry.id, { status: 'read' });
        fetchInquiries();
      } catch (error) {
        console.error('Failed to mark inquiry as read:', error);
      }
    }
  };

  const handleRespond = async () => {
    if (!selectedInquiry || !response.trim()) return;

    try {
      await inquiriesAPI.updateInquiryStatus(selectedInquiry.id, {
        status: 'responded',
        response: response.trim()
      });
      setShowModal(false);
      fetchInquiries();
    } catch (error) {
      console.error('Failed to respond to inquiry:', error);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inquiry.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Demandes Clients
        </h1>
        <p className="text-gray-600">
          Gérer les messages de votre formulaire de contact
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tous Statuts</option>
          <option value="new">Nouveau</option>
          <option value="read">Lu</option>
          <option value="responded">Répondu</option>
        </select>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="p-6 hover:bg-gray-50 cursor-pointer" onClick={() => handleViewInquiry(inquiry)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">
                        {inquiry.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        inquiry.status === 'new' ? 'bg-orange-100 text-orange-800' :
                        inquiry.status === 'read' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {inquiry.status === 'new' ? 'nouveau' :
                         inquiry.status === 'read' ? 'lu' : 'répondu'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{new Date(inquiry.createdAt).toLocaleDateString('fr-FR', {
                        month: 'short',
                        day: 'numeric'
                      })}, {new Date(inquiry.createdAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{inquiry.email}</p>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
                
                <div className="ml-4 flex items-center">
                  {inquiry.status === 'responded' ? (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      ✓ Marquer Répondu
                    </span>
                  ) : (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      ✓ Marquer Répondu
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredInquiries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Aucune demande trouvée</div>
          <p className="text-gray-500">Essayez d'ajuster votre recherche ou vos filtres</p>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Détails de la Demande
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedInquiry.status === 'new' ? 'bg-orange-100 text-orange-800' :
                  selectedInquiry.status === 'read' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  <span className="capitalize">
                    {selectedInquiry.status === 'new' ? 'nouveau' :
                     selectedInquiry.status === 'read' ? 'lu' : 'répondu'}
                  </span>
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedInquiry.email}</p>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedInquiry.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedInquiry.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sujet</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedInquiry.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>

                {selectedInquiry.response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Réponse Précédente</label>
                    <div className="mt-1 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.response}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Réponse</label>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Tapez votre réponse ici..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </Button>
                <Button
                  onClick={handleRespond}
                  disabled={!response.trim()}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Envoyer Réponse
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;