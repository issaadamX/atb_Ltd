const API_BASE_URL = 'http://localhost:5000/api';

interface SystemSettings {
  id: number;
  siteName: string;
  siteDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  bookingEnabled: boolean;
  maxAppointmentsPerDay: number;
  unavailableDates?: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  companyLogo?: string;
  address?: string;
  workingHours?: {
    start: string;
    end: string;
    days: string[];
  };
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalProjects: number;
  totalAppointments: number;
  pendingAppointments: number;
  newInquiries: number;
  recentActivities: Array<{
    id: number;
    type: string;
    title: string;
    message: string;
    createdAt: string;
  }>;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const settingsAPI = {
  getSystemSettings: async (): Promise<APIResponse<SystemSettings>> => {
    const response = await fetch(`${API_BASE_URL}/settings/system`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch system settings');
    }

    return response.json();
  },

  updateSystemSettings: async (settings: Partial<SystemSettings>): Promise<APIResponse<SystemSettings>> => {
    const response = await fetch(`${API_BASE_URL}/settings/system`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error('Failed to update system settings');
    }

    return response.json();
  },

  getAdminProfile: async (): Promise<APIResponse<AdminProfile>> => {
    const response = await fetch(`${API_BASE_URL}/settings/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin profile');
    }

    return response.json();
  },

  updateAdminProfile: async (profileData: FormData): Promise<APIResponse<AdminProfile>> => {
    const response = await fetch(`${API_BASE_URL}/settings/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: profileData,
    });

    if (!response.ok) {
      throw new Error('Failed to update admin profile');
    }

    return response.json();
  },

  getDashboardStats: async (): Promise<APIResponse<DashboardStats>> => {
    const response = await fetch(`${API_BASE_URL}/settings/dashboard-stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
  },
};