const API_BASE_URL = 'http://localhost:5000/api';

interface Appointment {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
  status: string;
  scheduledAt?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const appointmentAPI = {
  getAllAppointments: async (params?: any): Promise<ApiResponse<{ appointments: Appointment[] }>> => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/appointments${queryString ? `?${queryString}` : ''}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  },

  getAppointmentById: async (id: number): Promise<ApiResponse<Appointment>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointment');
    }

    return response.json();
  },

  acceptAppointment: async (id: number, data: { scheduledDate?: string; scheduledTime?: string; message?: string }): Promise<ApiResponse<Appointment>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to accept appointment');
    }

    return response.json();
  },

  declineAppointment: async (id: number, reason: string): Promise<ApiResponse<Appointment>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/decline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      throw new Error('Failed to decline appointment');
    }

    return response.json();
  },

  postponeAppointment: async (id: number, newDate: string, newTime: string): Promise<ApiResponse<Appointment>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/postpone`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ newDate, newTime }),
    });

    if (!response.ok) {
      throw new Error('Failed to postpone appointment');
    }

    return response.json();
  },

  updateAppointmentStatus: async (id: number, status: string): Promise<ApiResponse<Appointment>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update appointment status');
    }

    return response.json();
  },

  deleteAppointment: async (id: number): Promise<ApiResponse<null>> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }

    return response.json();
  },
};
