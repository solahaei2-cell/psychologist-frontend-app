import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,   // 👈 مشکل اینجا بود، باید ":" می‌داشت
  withCredentials: true,
});

// اگر توکن ذخیره شده باشد، هدر Authorization را اضافه کن
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
