import React from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

export default function ScoreChart({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-500">هنوز داده‌ای وجود ندارد</p>

  const formatted = data.map(d => ({
    name: new Date(d.date).toLocaleDateString("fa-IR"),
    score: d.score,
  }))

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-bold text-purple-700 mb-4">نمودار پیشرفت</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#7e22ce" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
