const API_BASE_URL = 'http://localhost:5000/api';

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

export const appointmentAPI = {
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  },

  getAppointmentById: async (id: number): Promise<Appointment> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointment');
    }

    return response.json();
  },

  updateAppointmentStatus: async (id: number, status: string): Promise<Appointment> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update appointment status');
    }

    return response.json();
  },

  deleteAppointment: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }
  },
};
