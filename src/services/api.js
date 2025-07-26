// API configuration and service functions for Home Decor frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// API client with default configuration
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('homeDecorToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('homeDecorToken', token);
    } else {
      localStorage.removeItem('homeDecorToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    if (response.success && response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.success && response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    apiClient.setToken(null);
    return response;
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiClient.get('/users/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiClient.put('/users/profile', profileData);
  },

  // Get all users (admin only)
  getUsers: async (params = {}) => {
    return apiClient.get('/users', params);
  },

  // Get user by ID (admin only)
  getUserById: async (userId) => {
    return apiClient.get(`/users/${userId}`);
  },

  // Update user (admin only)
  updateUser: async (userId, userData) => {
    return apiClient.put(`/users/${userId}`, userData);
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    return apiClient.delete(`/users/${userId}`);
  },
};

// Project API
export const projectAPI = {
  // Create new project
  createProject: async (projectData) => {
    return apiClient.post('/projects', projectData);
  },

  // Get projects
  getProjects: async (params = {}) => {
    return apiClient.get('/projects', params);
  },

  // Get project by ID
  getProjectById: async (projectId) => {
    return apiClient.get(`/projects/${projectId}`);
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    return apiClient.put(`/projects/${projectId}`, projectData);
  },

  // Delete project
  deleteProject: async (projectId) => {
    return apiClient.delete(`/projects/${projectId}`);
  },

  // Add project feedback
  addFeedback: async (projectId, feedback) => {
    return apiClient.post(`/projects/${projectId}/feedback`, feedback);
  },
};

// Appointment API
export const appointmentAPI = {
  // Create new appointment
  createAppointment: async (appointmentData) => {
    return apiClient.post('/appointments', appointmentData);
  },

  // Get appointments
  getAppointments: async (params = {}) => {
    return apiClient.get('/appointments', params);
  },

  // Get appointment by ID
  getAppointmentById: async (appointmentId) => {
    return apiClient.get(`/appointments/${appointmentId}`);
  },

  // Update appointment
  updateAppointment: async (appointmentId, appointmentData) => {
    return apiClient.put(`/appointments/${appointmentId}`, appointmentData);
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId) => {
    return apiClient.delete(`/appointments/${appointmentId}`);
  },

  // Get designer availability
  getDesignerAvailability: async (designerId, date) => {
    return apiClient.get(`/appointments/designer/${designerId}/availability`, { date });
  },
};

// Design API
export const designAPI = {
  // Get all designs
  getDesigns: async (params = {}) => {
    return apiClient.get('/designs', params);
  },

  // Get design by ID
  getDesignById: async (designId) => {
    return apiClient.get(`/designs/${designId}`);
  },

  // Create new design (admin/designer only)
  createDesign: async (designData) => {
    return apiClient.post('/designs', designData);
  },

  // Update design
  updateDesign: async (designId, designData) => {
    return apiClient.put(`/designs/${designId}`, designData);
  },

  // Delete design
  deleteDesign: async (designId) => {
    return apiClient.delete(`/designs/${designId}`);
  },

  // Like/unlike design
  toggleLike: async (designId) => {
    return apiClient.post(`/designs/${designId}/like`);
  },

  // Add review to design
  addReview: async (designId, review) => {
    return apiClient.post(`/designs/${designId}/review`, review);
  },

  // Get designs by designer
  getDesignsByDesigner: async (designerId, params = {}) => {
    return apiClient.get(`/designs/designer/${designerId}`, params);
  },
};

// Contact API
export const contactAPI = {
  // Send contact form
  sendContactForm: async (contactData) => {
    return apiClient.post('/contact', contactData);
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (subscriptionData) => {
    return apiClient.post('/contact/newsletter', subscriptionData);
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiClient.get('/health');
  },
};

// Export API client for direct use if needed
export { apiClient };

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!apiClient.token;
  },

  // Get stored token
  getToken: () => {
    return apiClient.token;
  },

  // Clear authentication
  clearAuth: () => {
    apiClient.setToken(null);
  },

  // Handle API errors
  handleError: (error) => {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.message.includes('401') || error.message.includes('unauthorized')) {
      // Clear invalid token
      apiClient.setToken(null);
      // Redirect to login if needed
      window.location.href = '/login';
    }
    
    return error.message || 'An error occurred';
  },
};

export default apiClient;