import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL  'httplocalhost5000';

const api = axios.create({
  baseURL API_BASE,
  withCredentials true,
});

const token = localStorage.getItem('token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
