import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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
    </div>
  )
}
