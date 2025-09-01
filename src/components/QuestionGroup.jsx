import React from "react"

const SCALE = [
  { label: "هیچ‌وقت", value: 0 },
  { label: "چند روز", value: 1 },
  { label: "بیش از نصف روزها", value: 2 },
  { label: "تقریباً هر روز", value: 3 },
]

export default function QuestionGroup({ title, items, answers, setAnswers }) {
  const onChange = (idx, val) => {
    const copy = [...answers]
    copy[idx] = Number(val)
    setAnswers(copy)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-700">{title}</h3>
      {items.map((q, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <div className="font-medium mb-3">{i + 1}. {q}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SCALE.map(opt => (
              <label key={opt.value} className={`border rounded-lg p-3 cursor-pointer hover:border-purple-400 ${answers[i]===opt.value ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-200"}`}>
                <input
                  type="radio"
                  name={`q_${i}`}
                  className="hidden"
                  value={opt.value}
                  checked={answers[i] === opt.value}
                  onChange={e => onChange(i, e.target.value)}
                  required
                />
                <div className="text-sm">{opt.label}</div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
