import React, { useState } from "react";
import ContentCard from "../components/ContentCard";

export default function ContentLibrary() {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [search, setSearch] = useState("");

  // محتوای نمونه
  const contents = [
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
  ];

  const filteredContents = contents.filter((item) => {
    return (
      (filterCategory ? item.category === filterCategory : true) &&
      (filterType ? item.type === filterType : true) &&
      (filterLevel ? item.level === filterLevel : true) &&
      (search
        ? item.title.includes(search) || item.description.includes(search)
        : true)
    );
  });

  const handleLike = (item) => {
    console.log("Liked:", item.title);
  };

  const handleComplete = (item) => {
    console.log("Completed:", item.title);
  };

  return (
    <div className="p-6">
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
        </select>
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">نوع محتوا</option>
          <option value="مقاله">مقاله</option>
          <option value="ویدیو">ویدیو</option>
          <option value="تمرین">تمرین</option>
          <option value="صوتی">صوتی</option>
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
    </div>
  );
}
