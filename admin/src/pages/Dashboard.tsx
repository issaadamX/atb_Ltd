import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
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

export const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
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
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchAppointments();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
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
      console.error('Error fetching projects:', error);
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
      console.error('Error fetching services:', error);
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
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
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
          <p className="text-gray-600">Loading...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">ATB Ltd Admin Panel</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'projects', label: 'Projects', icon: Building },
              { id: 'services', label: 'Services', icon: Users },
              { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
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
                  Manage Appointments ({appointments.length})
                </h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New
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
                            {appointment.status === 'pending' ? 'Pending' :
                             appointment.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{appointment.email}</p>
                        {appointment.phone && <p className="text-sm text-gray-500">{appointment.phone}</p>}
                        <p className="text-sm text-gray-700 mt-2"><strong>Service:</strong> {appointment.service}</p>
                        {appointment.message && <p className="text-sm text-gray-600 mt-1">{appointment.message}</p>}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(appointment.created_at).toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <select
                          value={appointment.status}
                          onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No appointments found.</p>
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
                  Manage Projects ({projects.length})
                </h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
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
                          {new Date(project.created_at).toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No projects found.</p>
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
                  Manage Services ({services.length})
                </h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Service
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
                          <p className="text-xs text-gray-500">Features:</p>
                          <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                            {service.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(service.created_at).toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {services.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No services found.</p>
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
                  Manage Testimonials ({testimonials.length})
                </h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Testimonial
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
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
                        <p className="text-sm text-gray-600 mt-2">{testimonial.content}</p>
                        {testimonial.video_url && (
                          <p className="text-xs text-blue-600 mt-1">Video: {testimonial.video_url}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(testimonial.created_at).toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No testimonials found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
