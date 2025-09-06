import React, { useState, useEffect, useRef } from "react"
import ContentCard from "../components/ContentCard"
import toast from "react-hot-toast"
import useSWR from "swr" // برای caching
import api from "../lib/api"

const fetcher = (url, token) => api.get(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(res => res.data)

export default function ContentLibrary() {
  const [filterCategory, setFilterCategory] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterLevel, setFilterLevel] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [contents, setContents] = useState([])
  const observerRef = useRef(null)

  const { data, error } = useSWR([`/api/content?page=${page}`, localStorage.getItem("token")], fetcher)

  useEffect(() => {
    if (data) {
      setContents(prev => [...prev, ...data])
    }
    if (error || (data && data.length === 0)) {
      observerRef.current = null
    }
  }, [data, error])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && observerRef.current) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )
    if (observerRef.current) observer.observe(observerRef.current)
    return () => observerRef.current && observer.unobserve(observerRef.current)
  }, [])

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
          aria-label="جستجوی محتوا"
        />
        <select
          className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="فیلتر دسته‌بندی"
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
          aria-label="فیلتر نوع محتوا"
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
          aria-label="فیلتر سطح دشواری"
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
      {observerRef.current && (
        <div ref={observerRef} className="h-10" />
      )}
    </div>
  )
}