import React, { useState, useEffect } from "react"
import ContentCard from "../components/ContentCard"
import toast from "react-hot-toast"
import api from "../lib/api"

export default function ContentLibrary() {
  const [filterCategory, setFilterCategory] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterLevel, setFilterLevel] = useState("")
  const [search, setSearch] = useState("")
  const [contents, setContents] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // فرض: API واقعی استفاده می‌شه
    api.get(`/api/content?page=${page}`)
      .then(res => {
        setContents(prev => [...prev, ...res.data])
        setHasMore(res.data.length > 0)
      })
      .catch(() => setHasMore(false))
  }, [page])

  const filteredContents = contents.filter((item) => {
    return (
      (filterCategory ? item.category === filterCategory : true) &&
      (filterType ? item.type === filterType : true) &&
      (filterLevel ? item.level === filterLevel : true) &&
      (search
        ? item.title.includes(search) || item.description.includes(search)
        : true)
    )
  })

  const handleLike = async (item) => {
    try {
      const token = localStorage.getItem("token")
      await api.post("/api/content/like", { contentId: item.id }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      toast.success(`لایک شد: ${item.title} ❤️`)
    } catch {
      toast.error("خطا در ثبت لایک ❌")
    }
  }

  const handleComplete = async (item) => {
    try {
      const token = localStorage.getItem("token")
      await api.post("/api/content/complete", { contentId: item.id }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      toast.success(`🎉 محتوای "${item.title}" تکمیل شد! +۱۰ امتیاز`)
    } catch {
      toast.error("خطا در ثبت تکمیل محتوا ❌")
    }
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6">کتابخانه محتوا</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو..."
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">دسته‌بندی</option>
          <option value="استرس">استرس</option>
          <option value="افسردگی">افسردگی</option>
          <option value="آرام‌سازی">آرام‌سازی</option>
          <option value="روابط">روابط</option>
          <option value="مراقبت از خود">مراقبت از خود</option>
        </select>
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">نوع محتوا</option>
          <option value="مقاله">مقاله</option>
          <option value="ویدیو">ویدیو</option>
          <option value="صوتی">صوتی</option>
          <option value="تمرین">تمرین</option>
        </select>
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="">سطح</option>
          <option value="مبتدی">مبتدی</option>
          <option value="متوسط">متوسط</option>
          <option value="پیشرفته">پیشرفته</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredContents.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onLike={handleLike}
            onComplete={handleComplete}
          />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-500 transition"
          >
            بارگذاری بیشتر
          </button>
        </div>
      )}
    </div>
  )
}