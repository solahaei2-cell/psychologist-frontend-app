import axios from 'axios';

export const API_URL = 'https://psychologist-ai-fhcp.onrender.com';


const api = axios.create({
  baseURL API_BASE,
  withCredentials true,
});

const token = localStorage.getItem('token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
