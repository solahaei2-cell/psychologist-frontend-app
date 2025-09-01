import React, { useState, useEffect } from "react"
import ContentCard from "../components/ContentCard"
import toast, { Toaster } from "react-hot-toast"

export default function ContentLibrary() {
  const [filterCategory, setFilterCategory] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterLevel, setFilterLevel] = useState("")
  const [search, setSearch] = useState("")
  const [contents, setContents] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // داده‌های استاتیک موقت تا وقتی API آماده بشه
    const staticContents = [
      {
        id: 1,
        title: "مدیریت استرس روزانه",
        description: "یاد بگیرید چطور در طول روز استرس خود را کنترل کنید.",
        type: "مقاله",
        category: "استرس",
        level: "مبتدی",
        duration: "۵ دقیقه",
        likes: 12,
        views: 180,
      },
      {
        id: 2,
        title: "تمرین‌های تنفس عمیق",
        description: "تمرین‌های ساده برای آرام‌سازی ذهن و بدن.",
        type: "تمرین",
        category: "آرام‌سازی",
        level: "متوسط",
        duration: "۱۰ دقیقه",
        likes: 8,
        views: 95,
      },
      {
        id: 3,
        title: "شناخت علائم افسردگی",
        description: "این ویدیو علائم اولیه افسردگی را توضیح می‌دهد.",
        type: "ویدیو",
        category: "افسردگی",
        level: "پیشرفته",
        duration: "۱۵ دقیقه",
        likes: 15,
        views: 200,
      },
      {
        id: 4,
        title: "بهبود روابط اجتماعی",
        description: "راهکارهایی برای تقویت ارتباطات اجتماعی.",
        type: "مقاله",
        category: "روابط",
        level: "متوسط",
        duration: "۸ دقیقه",
        likes: 10,
        views: 150,
      },
      {
        id: 5,
        title: "تکنیک‌های آرام‌سازی",
        description: "فایل صوتی برای کاهش استرس و آرامش ذهن.",
        type: "صوتی",
        category: "آرام‌سازی",
        level: "مبتدی",
        duration: "۲۰ دقیقه",
        likes: 20,
        views: 300,
      },
      {
        id: 6,
        title: "مراقبت از خود در دوران سخت",
        description: "راهنمایی برای خودمراقبتی در شرایط دشوار.",
        type: "مقاله",
        category: "مراقبت از خود",
        level: "پیشرفته",
        duration: "۱۲ دقیقه",
        likes: 14,
        views: 120,
      },
    ]
    setContents(staticContents)
    // TODO: جایگزین با API واقعی
    // api.get(`/api/content?page=${page}`)
    //   .then(res => {
    //     setContents(prev => [...prev, ...res.data])
    //     setHasMore(res.data.length > 0)
    //   })
    //   .catch(() => setHasMore(false))
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

  const handleLike = (item) => {
    console.log("Liked:", item.title)
    // TODO: ارسال به API برای ذخیره لایک
  }

  const handleComplete = (item) => {
    toast.success(`🎉 محتوای "${item.title}" تکمیل شد! +۱۰ امتیاز`, {
      position: "top-right",
      duration: 5000,
    })
    console.log("Completed:", item.title)
    // TODO: ارسال به API برای ثبت تکمیل و افزودن امتیاز
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold text-purple-700 mb-6">کتابخانه محتوا</h1>

      {/* فیلترها */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
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
          className="border p-2 rounded"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">نوع محتوا</option>
          <option value="مقاله">مقاله</option>
          <option value="ویدیو">ویدیو</option>
          <option value="صوتی">صوتی</option>
          <option value="تمرین">تمرین</option>
        </select>
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="">سطح</option>
          <option value="مبتدی">مبتدی</option>
          <option value="متوسط">متوسط</option>
          <option value="پیشرفته">پیشرفته</option>
        </select>
      </div>

      {/* نمایش کارت‌ها */}
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

      {/* دکمه بارگذاری بیشتر */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            بارگذاری بیشتر
          </button>
        </div>
      )}
    </div>
  )
}