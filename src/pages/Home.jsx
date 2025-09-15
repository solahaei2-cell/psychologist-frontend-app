import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Home() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    assessments: 0,
    content: 0,
    satisfaction: '0%'
  })

  useEffect(() => {
    // نمایش آمار ثابت برای صفحه اصلی (بدون نیاز به authentication)
    setStats({
      activeUsers: 150,
      assessments: 1200,
      content: 45,
      satisfaction: '95%'
    })
  }, [])

  return (
    <div className="text-center">
      <header className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">به روان‌شناس هوشمند خوش آمدید</h1>
        <p className="text-lg mb-6">ارزیابی دقیق، محتوای علمی، مشاوره تخصصی</p>
        <div className="space-x-4 space-x-reverse">
          <Link to="/dashboard" className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">شروع ارزیابی</Link>
          <Link to="/content" className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition">مطالعه محتوا</Link>
        </div>
      </header>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { title: 'ارزیابی دقیق', desc: 'تست‌های معتبر برای سنجش روانی شما' },
          { title: 'هوش مصنوعی', desc: 'تحلیل نتایج و پیشنهادات شخصی‌سازی شده' },
          { title: 'مشاوره تخصصی', desc: 'ارتباط با مشاوران و روان‌شناسان' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-purple-600 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">آمار پلتفرم</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'کاربران فعال', value: stats.activeUsers, emoji: '👥' },
            { title: 'ارزیابی‌ها', value: stats.assessments, emoji: '📊' },
            { title: 'محتوا', value: stats.content, emoji: '📚' },
            { title: 'رضایت', value: stats.satisfaction, emoji: '😊' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <h3 className="text-lg font-bold text-purple-600">{stat.title}</h3>
              <p className="text-gray-600 text-xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}