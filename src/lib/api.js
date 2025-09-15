import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://psychologist-ai-fhcp.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor برای اضافه کردن توکن به هر درخواست
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // redirect به صفحه login فقط اگر در صفحات محافظت شده باشیم
      const protectedRoutes = ['/dashboard', '/profile', '/assessments', '/consultation'];
      const currentPath = window.location.pathname;
      
      if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
