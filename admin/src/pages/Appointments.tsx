import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, XCircle, Pause, Search, Eye, Check, X, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { appointmentAPI } from '../api/appointment.api';

interface Appointment {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'postponed';
  adminNotes?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'decline' | 'postpone' | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [selectedStatus]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = selectedStatus !== 'all' ? { status: selectedStatus } : {};
      const response = await appointmentAPI.getAllAppointments(params);
      
      if (response.success) {
        setAppointments(response.data.appointments || response.data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (appointment: Appointment, action: 'accept' | 'decline' | 'postpone') => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setAdminNotes('');
    setScheduledDate('');
    setScheduledTime('');
    setShowModal(true);
  };

  const handleDeleteAppointment = async (appointmentId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous refusé ?')) return;
    
    try {
      const response = await appointmentAPI.deleteAppointment(appointmentId);
      if (response.success) {
        setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
        alert('Rendez-vous supprimé avec succès!');
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const submitAction = async () => {
    if (!selectedAppointment || !actionType) return;

    try {
      const updateData: any = { status: actionType };
      if (adminNotes) updateData.adminNotes = adminNotes;
      if (scheduledDate && scheduledTime) {
        updateData.scheduledAt = `${scheduledDate}T${scheduledTime}:00Z`;
      }

      let response;
      if (actionType === 'accept') {
        response = await appointmentAPI.acceptAppointment(selectedAppointment.id, {
          scheduledDate,
          scheduledTime,
          message: adminNotes
        });
      } else if (actionType === 'decline') {
        response = await appointmentAPI.declineAppointment(selectedAppointment.id, adminNotes);
      } else if (actionType === 'postpone') {
        response = await appointmentAPI.postponeAppointment(selectedAppointment.id, scheduledDate, scheduledTime);
      }
      
      if (response?.success) {
        setShowModal(false);
        fetchAppointments();
      }
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'postponed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      case 'postponed': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Demandes de Rendez-vous
        </h1>
        <p className="text-gray-600">
          Gérer et répondre aux rendez-vous clients
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
          <option value="pending">En Attente</option>
          <option value="accepted">Accepté</option>
          <option value="declined">Refusé</option>
          <option value="postponed">Reporté</option>
        </select>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date et Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments
                .filter(appointment => {
                  const matchesSearch = appointment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
                  return matchesSearch && matchesStatus;
                })
                .map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {appointment.scheduledAt 
                        ? new Date(appointment.scheduledAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) + ' at ' + new Date(appointment.scheduledAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          })
                        : 'Non programmé'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'pending' ? 'en attente' :
                      appointment.status === 'accepted' ? 'accepté' :
                      appointment.status === 'declined' ? 'refusé' :
                      appointment.status === 'postponed' ? 'reporté' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status === 'pending' ? 'en attente' :
                       appointment.status === 'accepted' ? 'accepté' :
                       appointment.status === 'declined' ? 'refusé' :
                       appointment.status === 'postponed' ? 'reporté' : appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAction(appointment, 'accept')}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Accepter"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAction(appointment, 'decline')}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Refuser"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAction(appointment, 'postpone')}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Reporter"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {appointment.status === 'declined' && (
                        <button
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="text-gray-600 hover:text-gray-900 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Voir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {appointments
          .filter(appointment => {
            const matchesSearch = appointment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
            return matchesSearch && matchesStatus;
          }).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Aucun rendez-vous trouvé</div>
            <p className="text-gray-500">Essayez d'ajuster votre recherche ou vos filtres</p>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {actionType === 'accept' && 'Accept Appointment'}
                {actionType === 'decline' && 'Decline Appointment'}
                {actionType === 'postpone' && 'Postpone Appointment'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Client:</strong> {selectedAppointment.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Service:</strong> {selectedAppointment.service}
                  </p>
                </div>

                {(actionType === 'accept' || actionType === 'postpone') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <Input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <Input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add any notes or comments..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={submitAction}>
                  Confirm {actionType}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;