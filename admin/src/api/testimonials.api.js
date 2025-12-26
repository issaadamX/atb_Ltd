const API_BASE_URL = 'http://localhost:5000/api';

export const testimonialsAPI = {
  getAllTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    return response.json();
  },

  createTestimonial: async (testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!response.ok) {
      throw new Error('Failed to create testimonial');
    }

    return response.json();
  },

  updateTestimonial: async (id, testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!response.ok) {
      throw new Error('Failed to update testimonial');
    }

    return response.json();
  },

  deleteTestimonial: async (id) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }

    return response.json();
  },
};
