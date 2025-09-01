import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../lib/api"
import HistoryList from "../components/HistoryList"
import ScoreChart from "../components/ScoreChart"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState([])
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    api.get("/api/users/profile", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setUserData(res.data))
      .catch(() => setUserData(null))

    api.get("/api/users/stats", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setStats(res.data))
      .catch(() => setStats(null))

    api.get("/api/assessments/history", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setHistory(res.data))
      .catch(() => setHistory([]))

    api.get("/api/recommendations", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setRecommendations(res.data))
      .catch(() => setRecommendations([]))
  }, [])

  if (!userData || !stats) {
    return <div className="text-center text-gray-500">در حال بارگذاری...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">داشبورد</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>نام:</strong> {userData.fullName}</p>
          <p><strong>ایمیل:</strong> {userData.email}</p>
          <p><strong>امتیاز کل:</strong> {stats.totalScore}</p>
          <p><strong>محتوای مطالعه‌شده:</strong> {stats.contentCompleted || 0}</p>
        </div>
        <Link
          to="/assessments"
          className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          شروع ارزیابی جدید
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-purple-700">روزهای متوالی فعالیت</h3>
          <p className="text-2xl">{stats.streakDays}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-blue-700">تعداد ارزیابی‌ها</h3>
          <p className="text-2xl">{stats.assessmentsCount}</p>
        </div>
      </div>

      <ScoreChart data={history} />

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-purple-700 mb-4">پیشنهادات شخصی‌سازی‌شده</h3>
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-lg transition">
                <h4 className="font-bold text-purple-600">{rec.title}</h4>
                <p className="text-gray-600 text-sm">{rec.description}</p>
                <Link
                  to={rec.type === "assessment" ? `/assessments/${rec.id}` : `/content/${rec.id}`}
                  className="text-purple-600 text-sm mt-2 inline-block"
                >
                  {rec.type === "assessment" ? "انجام تست" : "مشاهده محتوا"} →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">هیچ پیشنهادی موجود نیست</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-700 mb-4">تاریخچه ارزیابی‌ها</h3>
        <HistoryList assessments={history} />
      </div>
    </div>
  )
}