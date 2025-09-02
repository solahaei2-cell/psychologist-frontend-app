import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion" // اضافه کردن برای انیمیشن

export default function ContentCard({ item, onLike, onComplete }) {
  const [liked, setLiked] = useState(false)

  const typeIcons = {
    مقاله: "📄",
    ویدیو: "🎥",
    صوتی: "🎧",
    تمرین: "🧘",
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="text-xl">{typeIcons[item.type]}</span>
          <h3 className="font-bold text-purple-600 dark:text-purple-400">{item.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-200 text-sm mt-2">{item.description}</p>
        <p className="text-gray-500 dark:text-gray-300 text-xs mt-2">
          {item.duration} • {item.level}
        </p>
        <div className="flex justify-between text-gray-500 dark:text-gray-300 text-xs mt-2">
          <span>بازدید: {item.views}</span>
          <span>لایک: {item.likes}</span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Link
          to={`/content/${item.id}`}
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          مشاهده
        </Link>
        <div className="flex space-x-2 space-x-reverse">
          <motion.button
            onClick={() => {
              setLiked(!liked)
              onLike(item)
            }}
            whileTap={{ scale: 1.2, rotate: 10 }} // انیمیشن bounce
            className={`text-sm ${liked ? "text-red-500" : "text-gray-500 dark:text-gray-300"}`}
          >
            {liked ? "❤️" : "🤍"}
          </motion.button>
          <motion.button
            onClick={() => onComplete(item)}
            whileTap={{ scale: 1.2 }} // انیمیشن pulse
            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 dark:bg-purple-500"
          >
            تکمیل شد
          </motion.button>
        </div>
      </div>
    </div>
  )
}