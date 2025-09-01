import React, { useState, useMemo } from "react"
import QuestionGroup from "../../components/QuestionGroup"
import { QUICK_ITEMS, sum } from "../../lib/tests"
import api from "../../lib/api"
import { Link } from "react-router-dom"

export default function Quick() {
  const [answers, setAnswers] = useState(Array(QUICK_ITEMS.length).fill(undefined))
  const [result, setResult] = useState(null)
  const allAnswered = useMemo(() => answers.every(v => Number.isFinite(v)), [answers])

  const recommendations = {
    "عالی": [
      "ادامه دهید! وضعیت خوبی دارید.",
      <Link to="/content" className="text-purple-600 hover:underline">مطالعه محتوای مثبت</Link>
    ],
    "خفیف": [
      "تمرین‌های آرام‌سازی را امتحان کنید.",
      <Link to="/content" className="text-purple-600 hover:underline">مشاهده محتوای آرام‌سازی</Link>
    ],
    "متوسط": [
      "توصیه می‌کنیم با یک مشاور صحبت کنید.",
      <Link to="/consultation" className="text-purple-600 hover:underline">درخواست مشاوره</Link>
    ],
    "نگران‌کننده": [
      "لطفاً فوراً به متخصص مراجعه کنید.",
      <Link to="/consultation" className="text-purple-600 hover:underline">درخواست مشاوره فوری</Link>
    ]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const score = sum(answers)
    const maxScore = QUICK_ITEMS.length * 3 // حداکثر امتیاز: 5 سوال × 3
    const percentage = ((score / maxScore) * 100).toFixed(1)
    let status = "عالی"
    if (score >= 5 && score <= 7) status = "خفیف"
    if (score >= 8 && score <= 11) status = "متوسط"
    if (score >= 12) status = "نگران‌کننده"
    const resultData = { score, percentage, status }
    setResult(resultData)

    try {
      const token = localStorage.getItem("token")
      await api.post(
        "/api/assessments/submit",
        { type: "Quick", score, date: new Date().toISOString() },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      )
    } catch (error) {
      console.error("Error saving assessment:", error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">غربالگری سریع</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <QuestionGroup title="سؤالات" items={QUICK_ITEMS} answers={answers} setAnswers={setAnswers} />
        <button
          disabled={!allAnswered}
          className={`px-5 py-2 rounded-lg text-white ${allAnswered ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300"}`}
        >
          محاسبه
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-5 rounded-xl shadow space-y-2">
          <div>امتیاز کل: {result.score} / {QUICK_ITEMS.length * 3}</div>
          <div>درصد: {result.percentage}%</div>
          <div>وضعیت: {result.status}</div>
          {result.score >= 12 && (
            <div className="text-red-600 font-bold">
              ⚠️ وضعیت نگران‌کننده – لطفاً فوراً به متخصص مراجعه کنید یا با شماره ۱۱۵ تماس بگیرید
            </div>
          )}
          <div className="mt-4">
            <h4 className="font-bold text-purple-600">توصیه‌ها:</h4>
            <ul className="list-disc pr-5 space-y-1">
              {recommendations[result.status].map((rec, i) => (
                <li key={i} className="text-gray-600">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}