import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://psychologist-ai-fhcp.onrender.com';

const guestApi = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// مدیریت خطاهای سرور (بدون مدیریت توکن)
guestApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('[GuestAPI] 401 Error - This is expected for guest users');
      // برای کاربران مهمان، 401 را به عنوان یک خطای معمولی扱 می‌کنیم
      return Promise.reject(new Error('این عملیات نیاز به ورود به سیستم دارد'));
    }

    return Promise.reject(error);
  }
);

export { guestApi };
