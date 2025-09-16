import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../lib/api"
import HistoryList from "../components/HistoryList"
import ScoreChart from "../components/ScoreChart"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState([])
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    console.log('Fetching user profile...');
    api.get("/api/users/profile")
      .then(res => {
        console.log('Profile data:', res.data);
        setUserData(res.data);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setUserData(null);
      });

    console.log('Fetching user stats...');
    api.get("/api/users/stats")
      .then(res => {
        console.log('Stats data:', res.data);
        setStats(res.data);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setStats(null);
      });

    console.log('Fetching assessment history...');
    api.get("/api/assessments/history")
      .then(res => {
        console.log('History data:', res.data);
        setHistory(res.data);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
        setHistory([]);
      });

    console.log('Fetching recommendations...');
    api.get("/api/recommendations")
      .then(res => {
        console.log('Recommendations data:', res.data);
        setRecommendations(res.data);
      })
      .catch(err => {
        console.error('Error fetching recommendations:', err);
        setRecommendations([]);
      })
  }, [])

  const showWarning = () =>
    toast("لطفاً پروفایل خود را کامل کنید ⚠️", {
      id: "warning",
      style: { background: "#FEF9C3", color: "#854D0E" }
    })

  const showInfo = () =>
    toast("جدید: دوره‌های آموزشی اضافه شد! ℹ️", {
      id: "info",
      style: { background: "#DBEAFE", color: "#1E40AF" }
    })

  // تعریف مدال‌ها بر اساس stats
  const medals = []
  if (stats?.assessmentsCount >= 1) medals.push({ icon: "🏅", title: "اولین تست", description: "اولین تست روان‌شناسی را انجام دادید!" })
  if (stats?.contentCompleted >= 5) medals.push({ icon: "📚", title: "مطالعه‌گر", description: "۵ محتوای آموزشی را مطالعه کردید!" })
  if (stats?.streakDays >= 7) medals.push({ icon: "🔥", title: "فعالیت مداوم", description: "۷ روز متوالی فعالیت داشتید!" })

  // محاسبه درصد پیشرفت (فرض: حداکثر ۱۰ تست و ۲۰ محتوا)
  const maxAssessments = 10
  const maxContent = 20
  const progressPercent = stats
    ? Math.min(
        ((stats.assessmentsCount / maxAssessments) + (stats.contentCompleted / maxContent)) * 50,
        100
      ).toFixed(0)
    : 0

  // بررسی وجود توکن
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (!token) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">احراز هویت مورد نیاز</h2>
        <p className="text-gray-600 mb-4">برای دسترسی به داشبورد باید وارد شوید</p>
        <Link 
          to="/login" 
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          ورود به حساب کاربری
        </Link>
      </div>
    );
  }

  if (!userData || !stats) {
    return <div className="text-center text-gray-500 dark:text-gray-300">در حال بارگذاری...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">داشبورد</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>نام:</strong> {userData.fullName}</p>
          <p><strong>ایمیل:</strong> {userData.email}</p>
          <p><strong>امتیاز کل:</strong> {stats.totalScore}</p>
          <p><strong>محتوای مطالعه‌شده:</strong> {stats.contentCompleted || 0}</p>
        </div>
        <Link
          to="/assessments"
          className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-500 transition"
        >
          شروع ارزیابی جدید
        </Link>
        <div className="mt-4 space-x-4 space-x-reverse">
          <button onClick={showWarning} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">تست هشدار</button>
          <button onClick={showInfo} className="bg-blue-500 text-white px-4 py-2 rounded-lg">تست اطلاعاتی</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">پیشرفت شما</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
          <div
            className="bg-purple-600 dark:bg-purple-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">{progressPercent}% از فعالیت‌های پیشنهادی تکمیل شده</p>
      </div>

      {/* مدال‌ها */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-4">مدال‌های شما</h3>
        {medals.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {medals.map((medal, index) => (
              <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg shadow text-center">
                <span className="text-3xl">{medal.icon}</span>
                <h4 className="font-bold text-purple-600 dark:text-purple-400 mt-2">{medal.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">{medal.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">هنوز مدالی کسب نکرده‌اید! تست یا محتوا انجام دهید 🏅</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">روزهای متوالی فعالیت</h3>
          <p className="text-2xl">{stats.streakDays}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">تعداد ارزیابی‌ها</h3>
          <p className="text-2xl">{stats.assessmentsCount}</p>
        </div>
      </div>

      <ScoreChart data={history} />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">پیشنهادات شخصی‌سازی‌شده</h3>
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg shadow hover:shadow-lg transition">
                <h4 className="font-bold text-purple-600 dark:text-purple-400">{rec.title}</h4>
                <p className="text-gray-600 dark:text-gray-200 text-sm">{rec.description}</p>
                <Link
                  to={rec.type === "assessment" ? `/assessments/${rec.id}` : `/content/${rec.id}`}
                  className="text-purple-600 dark:text-purple-400 text-sm mt-2 inline-block"
                >
                  {rec.type === "assessment" ? "انجام تست" : "مشاهده محتوا"} →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">هیچ پیشنهادی موجود نیست</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">تاریخچه ارزیابی‌ها</h3>
        <HistoryList assessments={history} />
      </div>
    </div>
  )
}
