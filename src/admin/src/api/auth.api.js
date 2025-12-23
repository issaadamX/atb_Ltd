import axios from './axios';

export const authAPI = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/auth/profile');
    return response.data;
  },
};
