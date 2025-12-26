const API_BASE_URL = 'http://localhost:5000/api';

export const servicesAPI = {
  getAllServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    return response.json();
  },

  createService: async (serviceData) => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    return response.json();
  },

  updateService: async (id, serviceData) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }

    return response.json();
  },

  deleteService: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete service');
    }

    return response.json();
  },
};
