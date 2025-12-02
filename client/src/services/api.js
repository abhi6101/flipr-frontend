import axios from 'axios';

const api = axios.create({
  // CHANGE THIS: Point to your live Render backend
  // Note: We keep '/api' at the end because your previous code had it.
  baseURL: 'https://flipr-backend-n9mi.onrender.com/api', 
});

// Automatically add the JWT Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;