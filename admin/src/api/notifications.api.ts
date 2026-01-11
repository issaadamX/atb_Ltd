const API_BASE_URL = 'http://localhost:5000/api';

interface Notification {
  id: number;
  type: 'appointment' | 'inquiry' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  relatedId?: number;
  createdAt: string;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const notificationsAPI = {
  getAllNotifications: async (params?: {
    isRead?: boolean;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<NotificationsResponse>> => {
    const queryParams = new URLSearchParams();
    if (params?.isRead !== undefined) queryParams.append('isRead', params.isRead.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/notifications?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    return response.json();
  },

  getUnreadCount: async (): Promise<APIResponse<{ count: number }>> => {
    const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unread count');
    }

    return response.json();
  },

  markAsRead: async (id: number): Promise<APIResponse<Notification>> => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }

    return response.json();
  },

  markAllAsRead: async (): Promise<APIResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }

    return response.json();
  },

  deleteNotification: async (id: number): Promise<APIResponse<void>> => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }

    return response.json();
  },
};