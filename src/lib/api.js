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
  const token = useAuthStore.getState().token || localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // فقط در محیط توسعه لاگ بزن
  if (import.meta.env.DEV) {
    try {
      if (typeof console !== 'undefined') {
        const hasAuth = !!config.headers.Authorization;
        console.debug('[api] request', config.method?.toUpperCase(), config.url, 'auth:', hasAuth ? 'yes' : 'no');
      }
    } catch {}
  }
  return config;
});

// مدیریت خطاهای سرور
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
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
      } else if (window.location.pathname !== '/login') {
        window.location.replace('/login?session_expired=true');
      }
    }
    return Promise.reject(error);
  }
);

export { api };
