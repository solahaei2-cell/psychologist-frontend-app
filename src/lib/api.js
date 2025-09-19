import axios from 'axios';
import { useAuthStore } from './store/auth';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://psychologist-ai-fhcp.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// مدیریت خودکار توکن
api.interceptors.request.use(config => {
  const authStore = useAuthStore.getState();
  const token = authStore.token || localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (!token) {
    console.error('[API] No token available - redirecting to login');
    window.location.href = '/login?auth_error=no_token';
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  
  if (import.meta.env.DEV) {
    console.debug('[API] Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token
    });
  }
  
  return config;
});

// مدیریت خطاهای سرور
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('[API] 401 Error - Invalid/Expired token');
      useAuthStore.getState().logout();
      
      if (window.location.pathname !== '/login') {
        window.location.replace('/login?session_expired=true');
      }
    }
    
    return Promise.reject(error);
  }
);

export { api };
