// API Service for Backend Communication
// Handles all API calls to Netlify Functions

const API_BASE = import.meta.env.PROD 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('adminToken');

// Helper for authenticated requests
const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    throw new Error('Authentication failed. Please login again.');
  }

  return response;
};

// ============ ADMIN AUTH ============

export const adminAPI = {
  // Login admin
  login: async (username, password) => {
    const response = await fetch(`${API_BASE}/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    
    // Store token and user in localStorage
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  // Check if logged in
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },
};

// ============ CSC SERVICES ============

export const cscServicesAPI = {
  // Get all services (public)
  getAll: async () => {
    const response = await fetch(`${API_BASE}/csc-services`);
    const data = await response.json();
    return data.services;
  },

  // Create service (admin only)
  create: async (serviceData) => {
    const response = await authenticatedFetch(`${API_BASE}/csc-services`, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create service');
    }

    const data = await response.json();
    return data.service;
  },

  // Update service (admin only)
  update: async (serviceData) => {
    const response = await authenticatedFetch(`${API_BASE}/csc-services`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update service');
    }

    const data = await response.json();
    return data.service;
  },

  // Delete service (admin only)
  delete: async (id) => {
    const response = await authenticatedFetch(
      `${API_BASE}/csc-services?id=${id}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete service');
    }

    return true;
  },
};

// ============ MOBILE ACCESSORIES ============

export const accessoriesAPI = {
  // Get all accessories (public)
  getAll: async () => {
    const response = await fetch(`${API_BASE}/mobile-accessories`);
    const data = await response.json();
    return data.accessories;
  },

  // Create accessory (admin only)
  create: async (accessoryData) => {
    const response = await authenticatedFetch(`${API_BASE}/mobile-accessories`, {
      method: 'POST',
      body: JSON.stringify(accessoryData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create accessory');
    }

    const data = await response.json();
    return data.accessory;
  },

  // Update accessory (admin only)
  update: async (accessoryData) => {
    const response = await authenticatedFetch(`${API_BASE}/mobile-accessories`, {
      method: 'PUT',
      body: JSON.stringify(accessoryData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update accessory');
    }

    const data = await response.json();
    return data.accessory;
  },

  // Delete accessory (admin only)
  delete: async (id) => {
    const response = await authenticatedFetch(
      `${API_BASE}/mobile-accessories?id=${id}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete accessory');
    }

    return true;
  },
};

// ============ MOBILE REPAIRING ============

export const repairingAPI = {
  // Get all repair services (public)
  getAll: async () => {
    const response = await fetch(`${API_BASE}/mobile-repairing`);
    const data = await response.json();
    return data.services;
  },

  // Create repair service (admin only)
  create: async (serviceData) => {
    const response = await authenticatedFetch(`${API_BASE}/mobile-repairing`, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create service');
    }

    const data = await response.json();
    return data.service;
  },

  // Update repair service (admin only)
  update: async (serviceData) => {
    const response = await authenticatedFetch(`${API_BASE}/mobile-repairing`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update service');
    }

    const data = await response.json();
    return data.service;
  },

  // Delete repair service (admin only)
  delete: async (id) => {
    const response = await authenticatedFetch(
      `${API_BASE}/mobile-repairing?id=${id}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete service');
    }

    return true;
  },
};
