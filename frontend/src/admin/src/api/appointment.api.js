import axios from './axios';

export const appointmentAPI = {
  getAll: async () => {
    const response = await axios.get('/appointments');
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`/appointments/${id}`);
    return response.data;
  },

  create: async (appointment) => {
    const response = await axios.post('/appointments', appointment);
    return response.data;
  },

  update: async (id, appointment) => {
    const response = await axios.put(`/appointments/${id}`, appointment);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`/appointments/${id}`);
    return response.data;
  },
};
