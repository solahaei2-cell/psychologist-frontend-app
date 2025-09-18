import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token);
        toast.success('ورود با موفقیت انجام شد');
        navigate('/content');
      } else {
        toast.error(res.data.message || 'خطا در ورود');
      }
    } catch (err) {
      toast.error('خطا در ارتباط با سرور');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">ورود</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'} transition-colors`}
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link to="/register" className="text-blue-600 hover:underline">حساب کاربری ندارید؟ ثبت‌نام کنید</Link>
      </div>
    </div>
  );
}
