import React from "react"

export default function HistoryList({ assessments }) {
  if (!assessments || assessments.length === 0) {
    return <p className="text-gray-500">هیچ تستی انجام نشده است</p>
  }

  return (
    <ul className="space-y-2">
      {assessments.map((a, i) => (
        <li key={i} className="p-3 border rounded bg-white shadow-sm">
          <div className="font-medium text-purple-700">{a.type}</div>
          <div className="text-sm text-gray-600">
            امتیاز: {a.score} | تاریخ: {new Date(a.date).toLocaleDateString("fa-IR")}
          </div>
        </li>
      ))}
    </ul>
  )
}
