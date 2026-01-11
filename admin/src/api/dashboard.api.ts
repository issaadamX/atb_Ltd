const API_BASE_URL = 'http://localhost:5000/api';

export interface DashboardStats {
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

export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard API error:', error);
      return { success: false, error: 'Failed to fetch dashboard stats' };
    }
  }
};