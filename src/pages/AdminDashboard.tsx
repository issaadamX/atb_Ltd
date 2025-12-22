import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { useToast } from '../hooks/use-toast';
import {
  Calendar,
  Building,
  Users,
  MessageSquare,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  Star
} from 'lucide-react';

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
  status: string;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  year: number;
  location: string;
  created_at: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
  created_at: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  type: string;
  video_url?: string;
  created_at: string;
}

export const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ type: string; id: number; name: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAppointments();
    fetchProjects();
    fetchServices();
    fetchTestimonials();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les rendez-vous.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: 'Statut mis à jour',
          description: 'Le statut du rendez-vous a été modifié.',
        });
        fetchAppointments();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut.',
        variant: 'destructive',
      });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets.',
        variant: 'destructive',
      });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        throw new Error('Failed to fetch services');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les services.',
        variant: 'destructive',
      });
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        throw new Error('Failed to fetch testimonials');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les témoignages.',
        variant: 'destructive',
      });
    }
  };

  // Projects CRUD
  const createProject = async (project: Omit<Project, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast({
          title: 'Projet créé',
          description: 'Le projet a été créé avec succès.',
        });
        fetchProjects();
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le projet.',
        variant: 'destructive',
      });
    }
  };

  const updateProject = async (id: number, project: Omit<Project, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast({
          title: 'Projet mis à jour',
          description: 'Le projet a été modifié avec succès.',
        });
        fetchProjects();
      } else {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le projet.',
        variant: 'destructive',
      });
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast({
          title: 'Projet supprimé',
          description: 'Le projet a été supprimé avec succès.',
        });
        fetchProjects();
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le projet.',
        variant: 'destructive',
      });
    }
  };

  // Services CRUD
  const createService = async (service: Omit<Service, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        toast({
          title: 'Service créé',
          description: 'Le service a été créé avec succès.',
        });
        fetchServices();
      } else {
        throw new Error('Failed to create service');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le service.',
        variant: 'destructive',
      });
    }
  };

  const updateService = async (id: number, service: Omit<Service, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        toast({
          title: 'Service mis à jour',
          description: 'Le service a été modifié avec succès.',
        });
        fetchServices();
      } else {
        throw new Error('Failed to update service');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le service.',
        variant: 'destructive',
      });
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast({
          title: 'Service supprimé',
          description: 'Le service a été supprimé avec succès.',
        });
        fetchServices();
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le service.',
        variant: 'destructive',
      });
    }
  };

  // Testimonials CRUD
  const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testimonial),
      });

      if (response.ok) {
        toast({
          title: 'Témoignage créé',
          description: 'Le témoignage a été créé avec succès.',
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to create testimonial');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le témoignage.',
        variant: 'destructive',
      });
    }
  };

  const updateTestimonial = async (id: number, testimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(testimonial),
      });

      if (response.ok) {
        toast({
          title: 'Témoignage mis à jour',
          description: 'Le témoignage a été modifié avec succès.',
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to update testimonial');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le témoignage.',
        variant: 'destructive',
      });
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast({
          title: 'Témoignage supprimé',
          description: 'Le témoignage a été supprimé avec succès.',
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to delete testimonial');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le témoignage.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast({
      title: 'Déconnexion',
      description: 'Vous avez été déconnecté.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Panneau d'Administration ATB Ltd</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'appointments', label: 'Rendez-vous', icon: Calendar },
              { id: 'projects', label: 'Projets', icon: Building },
              { id: 'services', label: 'Services', icon: Users },
              { id: 'testimonials', label: 'Témoignages', icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'appointments' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gestion des Rendez-vous ({appointments.length})
                </h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau
                </Button>
              </div>

              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{appointment.name}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status === 'pending' ? 'En attente' :
                             appointment.status === 'confirmed' ? 'Confirmé' : 'Annulé'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{appointment.email}</p>
                        {appointment.phone && <p className="text-sm text-gray-500">{appointment.phone}</p>}
                        <p className="text-sm text-gray-700 mt-2"><strong>Service:</strong> {appointment.service}</p>
                        {appointment.message && <p className="text-sm text-gray-600 mt-1">{appointment.message}</p>}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(appointment.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <select
                          value={appointment.status}
                          onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmer</option>
                          <option value="cancelled">Annuler</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun rendez-vous trouvé.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gestion des Projets ({projects.length})
                </h3>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Projet
                </Button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {project.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{project.location} - {project.year}</p>
                        <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                        <p className="text-xs text-blue-600 mt-1">Image: {project.image}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(project.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProject(project);
                            setShowProjectModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun projet trouvé.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gestion des Services ({services.length})
                </h3>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingService(null);
                    setShowServiceModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Service
                </Button>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{service.title}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {service.icon}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Fonctionnalités:</p>
                          <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                            {service.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(service.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingService(service);
                            setShowServiceModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {services.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun service trouvé.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gestion des Témoignages ({testimonials.length})
                </h3>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setShowTestimonialModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Témoignage
                </Button>
              </div>

              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-medium text-gray-900">{testimonial.name}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {testimonial.type}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
                        <p className="text-sm text-gray-600 mt-2">{testimonial.content}</p>
                        {testimonial.video_url && (
                          <p className="text-xs text-blue-600 mt-1">Vidéo: {testimonial.video_url}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(testimonial.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingTestimonial(testimonial);
                            setShowTestimonialModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun témoignage trouvé.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingProject ? 'Modifier le Projet' : 'Nouveau Projet'}
                  </h3>
                  <Button
                    onClick={() => {
                      setShowProjectModal(false);
                      setEditingProject(null);
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <ProjectForm
                  project={editingProject}
                  onSubmit={async (projectData) => {
                    if (editingProject) {
                      await updateProject(editingProject.id, projectData);
                    } else {
                      await createProject(projectData);
                    }
                    setShowProjectModal(false);
                    setEditingProject(null);
                  }}
                  onCancel={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingService ? 'Modifier le Service' : 'Nouveau Service'}
                  </h3>
                  <Button
                    onClick={() => {
                      setShowServiceModal(false);
                      setEditingService(null);
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <ServiceForm
                  service={editingService}
                  onSubmit={async (serviceData) => {
                    if (editingService) {
                      await updateService(editingService.id, serviceData);
                    } else {
                      await createService(serviceData);
                    }
                    setShowServiceModal(false);
                    setEditingService(null);
                  }}
                  onCancel={() => {
                    setShowServiceModal(false);
                    setEditingService(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Testimonial Modal */}
        {showTestimonialModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingTestimonial ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}
                  </h3>
                  <Button
                    onClick={() => {
                      setShowTestimonialModal(false);
                      setEditingTestimonial(null);
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <TestimonialForm
                  testimonial={editingTestimonial}
                  onSubmit={async (testimonialData) => {
                    if (editingTestimonial) {
                      await updateTestimonial(editingTestimonial.id, testimonialData);
                    } else {
                      await createTestimonial(testimonialData);
                    }
                    setShowTestimonialModal(false);
                    setEditingTestimonial(null);
                  }}
                  onCancel={() => {
                    setShowTestimonialModal(false);
                    setEditingTestimonial(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Form Component
const ProjectForm: React.FC<{
  project: Project | null;
  onSubmit: (data: Omit<Project, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}> = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    type: project?.type || '',
    description: project?.description || '',
    image: project?.image || '',
    year: project?.year || new Date().getFullYear(),
    location: project?.location || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <Input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <Input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Année</label>
        <Input
          type="number"
          value={formData.year.toString()}
          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Localisation</label>
        <Input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Annuler
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {project ? 'Modifier' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

// Service Form Component
const ServiceForm: React.FC<{
  service: Service | null;
  onSubmit: (data: Omit<Service, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}> = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    features: service?.features || [''],
    icon: service?.icon || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Icône</label>
        <Input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fonctionnalités</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              type="text"
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder="Fonctionnalité"
              required
            />
            <Button
              type="button"
              onClick={() => removeFeature(index)}
              variant="outline"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addFeature} variant="outline" size="sm" className="mt-2">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une fonctionnalité
        </Button>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Annuler
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {service ? 'Modifier' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

// Testimonial Form Component
const TestimonialForm: React.FC<{
  testimonial: Testimonial | null;
  onSubmit: (data: Omit<Testimonial, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}> = ({ testimonial, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    role: testimonial?.role || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    type: testimonial?.type || 'text',
    video_url: testimonial?.video_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <Input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenu</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Note (1-5)</label>
        <Input
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="text">Texte</option>
          <option value="video">Vidéo</option>
        </select>
      </div>
      {formData.type === 'video' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la vidéo</label>
          <Input
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            required
          />
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Annuler
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {testimonial ? 'Modifier' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};
