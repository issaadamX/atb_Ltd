const API_BASE_URL = 'http://localhost:5000/api';

export const projectsAPI = {
  getAllProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
  },

  createProject: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    return response.json();
  },

  updateProject: async (id, projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    return response.json();
  },

  deleteProject: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    return response.json();
  },
};
