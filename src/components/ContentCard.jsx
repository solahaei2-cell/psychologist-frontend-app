import React, { useState } from 'react'

export default function ContentCard({ item, onLike, onComplete }) {
  const [likes, setLikes] = useState(item.likes || 0)
  const [views, setViews] = useState(item.views || 0)
  const [completed, setCompleted] = useState(false)

  const icons = {
    مقاله: '📄',
    ویدیو: '🎥',
    صوتی: '🎧',
    تمرین: '📝'
  }

  const handleLike = () => {
    setLikes(likes + 1)
    if (onLike) onLike(item)
  }

  const handleComplete = () => {
    setCompleted(true)
    if (onComplete) onComplete(item)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-purple-600 mb-2">
          {icons[item.type]} {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>بازدید: {views}</span>
          <span>لایک: {likes}</span>
        </div>
        <div className="text-xs text-gray-400">
          دسته: {item.category} | سطح: {item.level} | مدت: {item.duration}
        </div>
      </div>

      <div className="flex space-x-2 space-x-reverse mt-4">
        <button
          onClick={handleLike}
          className="bg-purple-100 text-purple-600 px-3 py-1 rounded hover:bg-purple-200"
        >
          لایک
        </button>
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-3 py-1 rounded ${
            completed
              ? 'bg-green-300 text-white cursor-not-allowed'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {completed ? '✅ تکمیل شد' : 'تکمیل شد'}
        </button>
      </div>
    </div>
  )
}
