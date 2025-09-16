import axios from 'axios';
import { useAuthStore } from '../store/auth';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://psychologist-ai-fhcp.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor برای اضافه کردن توکن به هر درخواست
api.interceptors.request.use(
  (config) => {
    let token = null;
    try {
      token = localStorage.getItem('token') || sessionStorage.getItem('token');
    } catch {}
    try {
      if (!token) token = useAuthStore.getState()?.token;
    } catch {}
    
    console.log('[DEBUG] Token found:', token ? 'YES' : 'NO');
    console.log('[DEBUG] Token value:', token ? token.substring(0, 20) + '...' : 'null');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    try {
      if (typeof console !== 'undefined') {
        const hasAuth = !!config.headers.Authorization;
        console.debug('[api] request', config.method?.toUpperCase(), config.url, 'auth:', hasAuth ? 'yes' : 'no');
      }
    } catch {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor برای handle کردن خطاهای authentication
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // حذف توکن نامعتبر
      try {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      } catch {}
      // Redirect فقط اگر در صفحات محافظت‌شده هستیم
      const protectedRoutes = ['/dashboard', '/profile', '/assessments', '/consultation', '/content', '/chat'];
      const isHashRouter = typeof window !== 'undefined' && !!window.location.hash && window.location.hash.startsWith('#/');
      const currentPath = isHashRouter ? window.location.hash.slice(1) : window.location.pathname;

      if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        if (isHashRouter) {
          window.location.hash = '#/login';
        } else {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
