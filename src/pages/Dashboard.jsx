import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { useAuthStore } from '../store/auth';
import StatsCard from '../components/StatsCard';
import AssessmentHistory from '../components/AssessmentHistory';
import Recommendations from '../components/Recommendations';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }

    const fetchData = async () => {
      try {
        const [profile, stats, history, recommendations] = await Promise.all([
          api.get('/api/users/profile'),
          api.get('/api/users/stats'),
          api.get('/api/assessments/history'),
          api.get('/api/recommendations')
        ]);

        setDashboardData({
          profile: profile.data,
          stats: stats.data,
          history: history.data,
          recommendations: recommendations.data
        });
      } catch (error) {
        toast.error('خطا در دریافت اطلاعات داشبورد');
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size={8} />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">خطا در بارگذاری اطلاعات داشبورد</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          خوش آمدید، {dashboardData.profile.fullName}
        </h1>
        <p className="text-gray-600">وضعیت امروز شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="امتیاز کلی"
          value={dashboardData.stats.totalScore}
          icon="🏆"
          color="bg-blue-100"
        />
        <StatsCard
          title="تست‌های انجام شده"
          value={dashboardData.stats.assessmentsCount}
          icon="📊"
          color="bg-green-100"
        />
        <StatsCard
          title="روزهای متوالی"
          value={dashboardData.stats.streakDays}
          icon="🔥"
          color="bg-yellow-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssessmentHistory data={dashboardData.history} />
        </div>
        <div>
          <Recommendations data={dashboardData.recommendations} />
        </div>
      </div>
    </div>
  );
}
