const API_BASE_URL = 'http://localhost:5000/api';

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

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const inquiriesAPI = {
  getAllInquiries: async (params?: any): Promise<ApiResponse<{ inquiries: Inquiry[] }>> => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/inquiries${queryString ? `?${queryString}` : ''}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inquiries');
    }

    return response.json();
  },

  getInquiryById: async (id: number): Promise<ApiResponse<Inquiry>> => {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inquiry');
    }

    return response.json();
  },

  updateInquiryStatus: async (id: number, data: { status?: string; response?: string }): Promise<ApiResponse<Inquiry>> => {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update inquiry status');
    }

    return response.json();
  },

  deleteInquiry: async (id: number): Promise<ApiResponse<null>> => {
    const response = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete inquiry');
    }

    return response.json();
  },
};