import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  useEffect(() => {
    // بررسی اگر از صفحه لاگین با پیام انقضا آمده‌ایم
    if (location.search.includes('session_expired=true')) {
      toast.warning('نشست شما منقضی شده است. لطفاً مجدد وارد شوید.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('لطفاً ایمیل و رمز عبور را وارد کنید');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', form);
      
      if (data.token) {
        login(data.token);
        toast.success('ورود با موفقیت انجام شد');
        
        // ریدایرکت به صفحه قبلی یا داشبورد
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'خطا در ارتباط با سرور';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center text-gray-900">ورود به حساب کاربری</h1>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {loading ? <LoadingSpinner size={5} /> : 'ورود'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
