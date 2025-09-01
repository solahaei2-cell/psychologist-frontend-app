import React, { useState, useMemo } from "react"
import QuestionGroup from "../../components/QuestionGroup"
import { GAD7_ITEMS, sum, interpretGAD7 } from "../../lib/tests"

export default function GAD7() {
  const [answers, setAnswers] = useState(Array(GAD7_ITEMS.length).fill(undefined))
  const [result, setResult] = useState(null)
  const allAnswered = useMemo(() => answers.every(v => Number.isFinite(v)), [answers])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!allAnswered) return
    const score = sum(answers)
    setResult({ score, interp: interpretGAD7(score) })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">پرسشنامه اضطراب GAD-7</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <QuestionGroup title="سؤالات" items={GAD7_ITEMS} answers={answers} setAnswers={setAnswers} />
        <button disabled={!allAnswered} className={`px-5 py-2 rounded-lg text-white ${allAnswered ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300"}`}>محاسبه</button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-5 rounded-xl shadow">
          <div>امتیاز کل: {result.score}</div>
          <div>شدت: {result.interp.level}</div>
        </div>
      )}
    </div>
  )
}
