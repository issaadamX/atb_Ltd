const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return response.json();
  },
};
