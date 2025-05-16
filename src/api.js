import axios from 'axios';
import { ACCESS_TOKEN } from './token';

// Ensure we're using the correct API URL
const apiUrl = import.meta.env.VITE_API_URL;
console.log('Environment:', import.meta.env.MODE);
console.log('API URL:', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Add referrer policy for production
    if (import.meta.env.PROD) {
      config.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    }
    console.log('Request URL:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;