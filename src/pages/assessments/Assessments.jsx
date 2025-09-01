import React from "react"
import { Link } from "react-router-dom"

const cards = [
  { title: "غربالگری سریع", to: "/assessments/quick", desc: "۵ سؤال ساده – حدود ۲ دقیقه" },
  { title: "GAD-7 (اضطراب)", to: "/assessments/gad7", desc: "۷ سؤال استاندارد – ارزیابی اضطراب" },
  { title: "PHQ-9 (افسردگی)", to: "/assessments/phq9", desc: "۹ سؤال استاندارد – ارزیابی افسردگی" },
]

export default function Assessments() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">ارزیابی‌های روان‌شناسی</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <Link key={i} to={c.to} className="block bg-white rounded-2xl shadow p-5 hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-gray-800">{c.title}</h3>
            <p className="text-gray-600 text-sm">{c.desc}</p>
            <div className="mt-3 text-purple-600 text-sm">شروع →</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
