const API_BASE_URL = 'http://localhost:5000/api';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
  created_at: string;
}

export const servicesAPI = {
  getAllServices: async (): Promise<Service[]> => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    return response.json();
  },

  createService: async (serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    return response.json();
  },

  updateService: async (id: number, serviceData: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<Service> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }

    return response.json();
  },

  deleteService: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete service');
    }
  },
};
