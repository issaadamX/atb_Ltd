declare module './dashboard.api' {
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
    pendingAppointments: number; // Keep for backward compatibility
  }

  export const dashboardAPI: {
    getStats: () => Promise<DashboardStats>;
    getRecentAppointments: () => Promise<any[]>;
  };
}
