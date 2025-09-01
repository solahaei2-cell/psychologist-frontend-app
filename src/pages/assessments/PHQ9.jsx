import React, { useState, useMemo } from "react"
import QuestionGroup from "../../components/QuestionGroup"
import { PHQ9_ITEMS, sum, interpretPHQ9 } from "../../lib/tests"

export default function PHQ9() {
  const [answers, setAnswers] = useState(Array(PHQ9_ITEMS.length).fill(undefined))
  const [result, setResult] = useState(null)
  const allAnswered = useMemo(() => answers.every(v => Number.isFinite(v)), [answers])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!allAnswered) return
    const score = sum(answers)
    setResult({ score, interp: interpretPHQ9(score), suicideRisk: answers[8] > 0 })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">پرسشنامه افسردگی PHQ-9</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <QuestionGroup title="سؤالات" items={PHQ9_ITEMS} answers={answers} setAnswers={setAnswers} />
        <button disabled={!allAnswered} className={`px-5 py-2 rounded-lg text-white ${allAnswered ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300"}`}>محاسبه</button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-5 rounded-xl shadow space-y-2">
          <div>امتیاز کل: {result.score}</div>
          <div>شدت: {result.interp.level}</div>
          {result.suicideRisk && <div className="text-red-600 font-bold">⚠️ خطر خودکشی – لطفاً فوراً به متخصص مراجعه کنید</div>}
        </div>
      )}
    </div>
  )
}
