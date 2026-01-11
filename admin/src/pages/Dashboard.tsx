import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../api/appointment.api';
import { dashboardAPI } from '../api/dashboard.api';
import { projectsAPI } from '../api/projects.api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Building2, 
  Calendar, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  RotateCcw,
  TrendingUp
} from 'lucide-react';

interface Appointment {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'postponed';
  createdAt: string;
}

interface DashboardStats {
  projects: number;
  services: number;
  testimonials: number;
  appointments: {
    total: number;
    pending: number;
    accepted: number;
    declined: number;
    postponed: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  pendingAppointments: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, statsRes] = await Promise.all([
        appointmentAPI.getAllAppointments(),
        dashboardAPI.getStats()
      ]);

      if (appointmentsRes.success) {
        setAppointments(appointmentsRes.data.appointments || appointmentsRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!selectedAppointment) return;

    try {
      setActionLoading(selectedAppointment.id);
      const response = await appointmentAPI.acceptAppointment(selectedAppointment.id, {
        scheduledDate,
        scheduledTime,
        message: adminMessage
      });
      if (response.success) {
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === selectedAppointment.id ? { ...apt, status: 'accepted' } : apt
          )
        );
        setShowAcceptModal(false);
        setSelectedAppointment(null);
        setScheduledDate('');
        setScheduledTime('');
        setAdminMessage('');
        alert('Rendez-vous accepté et email envoyé!');
      }
    } catch (error) {
      console.error('Failed to accept appointment:', error);
      alert('Échec de l\'acceptation du rendez-vous');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async () => {
    if (!selectedAppointment || !declineReason.trim()) return;

    try {
      setActionLoading(selectedAppointment.id);
      const response = await appointmentAPI.declineAppointment(selectedAppointment.id, declineReason);
      if (response.success) {
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === selectedAppointment.id ? { ...apt, status: 'declined' } : apt
          )
        );
        setShowDeclineModal(false);
        setSelectedAppointment(null);
        setDeclineReason('');
        alert('Appointment declined successfully!');
      }
    } catch (error) {
      console.error('Failed to decline appointment:', error);
      alert('Failed to decline appointment');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePostpone = async () => {
    if (!selectedAppointment || !newDate || !newTime) return;

    try {
      setActionLoading(selectedAppointment.id);
      const response = await appointmentAPI.postponeAppointment(selectedAppointment.id, newDate, newTime);
      if (response.success) {
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === selectedAppointment.id ? { ...apt, status: 'postponed' } : apt
          )
        );
        setShowPostponeModal(false);
        setSelectedAppointment(null);
        setNewDate('');
        setNewTime('');
        alert('Appointment postponed successfully!');
      }
    } catch (error) {
      console.error('Failed to postpone appointment:', error);
      alert('Failed to postpone appointment');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300';
      case 'accepted': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300';
      case 'declined': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300';
      case 'postponed': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '⏳ En attente';
      case 'accepted': return '✓ Accepté';
      case 'declined': return '✕ Refusé';
      case 'postponed': return '📅 Reporté';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Bon retour, Admin
        </h1>
        <p className="text-gray-600">
          Voici ce qui se passe avec vos projets aujourd'hui.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Properties */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Propriétés</h3>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.projects}</div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Rendez-vous</h3>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.appointments.total}</div>
          </div>

          {/* Pending Appointments */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">En Attente</h3>
              <h3 className="text-sm font-medium text-gray-600">Rendez-vous</h3>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.pendingAppointments}</div>
          </div>

          {/* New Inquiries */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Nouvelles Demandes</h3>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">2</div>
          </div>

          {/* Completed Projects */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Projets Terminés</h3>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500 font-medium">12% depuis le mois dernier</span>
            </div>
          </div>

          {/* Ongoing Projects */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Projets En Cours</h3>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">2</div>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Nouvelle demande de rendez-vous de John Doe</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Projet "Villa Moderne" terminé</p>
                  <p className="text-xs text-gray-500">Il y a 1 jour</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Nouvelle demande reçue</p>
                  <p className="text-xs text-gray-500">Il y a 2 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Actions Rapides</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/appointments')}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Voir Tous les Rendez-vous
              </Button>
              <Button 
                onClick={() => navigate('/portfolio')}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Gérer les Propriétés
              </Button>
              <Button 
                onClick={() => navigate('/inquiries')}
                className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Vérifier les Demandes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;