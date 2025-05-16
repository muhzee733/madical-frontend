import axios from 'axios';
import { ACCESS_TOKEN } from './token';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/chat";

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;