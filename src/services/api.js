import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Directly target the backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API calls
export const registerForInternship = async (internshipData) => {
  try {
    console.log('Sending registration data to server...');
    const response = await api.post('/register', internshipData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });
    
    // Handle validation errors
    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors.map(err => err.msg || err.message).join(', ');
      throw new Error(errorMessages || 'Validation failed');
    }
    
    // Handle other errors
    throw new Error(error.response?.data?.message || error.message || 'Something went wrong. Please try again.');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getInternships = async () => {
  try {
    const response = await api.get('/internships');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  registerForInternship,
  login,
  getCurrentUser,
  getInternships,
};
