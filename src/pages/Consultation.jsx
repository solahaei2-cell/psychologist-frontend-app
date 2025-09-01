import React, { useState } from "react"
import DatePickerFa from "../components/DatePickerFa"
import api from "../lib/api"

export default function Consultation() {
  const [form, setForm] = useState({
    type: "",
    date: "",
    time: "",
    description: ""
  })
  const [msg, setMsg] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.type || !form.date || !form.time || !form.description) {
      return setMsg("لطفاً همه فیلدها را پر کنید")
    }
    try {
      const token = localStorage.getItem("token")
      await api.post("/api/consultation/request", form, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      setMsg("✅ درخواست با موفقیت ثبت شد")
      setForm({ type: "", date: "", time: "", description: "" }) // ریست فرم
    } catch {
      setMsg("❌ خطا در ارسال درخواست")
    }
  }

  const tariffs = [
    { type: "مشاوره عمومی", price: "۱۰۰,۰۰۰ تومان" },
    { type: "درمان تخصصی", price: "۱۵۰,۰۰۰ تومان" },
    { type: "ارزیابی تشخیصی", price: "۱۲۰,۰۰۰ تومان" },
    { type: "اورژانس", price: "۲۰۰,۰۰۰ تومان" },
    { type: "پیگیری", price: "۸۰,۰۰۰ تومان" }
  ]

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">درخواست مشاوره آنلاین</h2>
      {msg && <p className="mb-3 text-center">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* نوع جلسه */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">انتخاب نوع جلسه</option>
          <option value="general">مشاوره عمومی</option>
          <option value="therapy">درمان تخصصی</option>
          <option value="diagnosis">ارزیابی تشخیصی</option>
          <option value="emergency">اورژانس</option>
          <option value="followup">پیگیری</option>
        </select>

        {/* انتخاب تاریخ شمسی */}
        <DatePickerFa value={form.date} onChange={(val) => setForm({ ...form, date: val?.toString() })} />

        {/* انتخاب زمان */}
        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">انتخاب زمان</option>
          <option value="morning">صبح</option>
          <option value="afternoon">بعدازظهر</option>
          <option value="evening">عصر</option>
        </select>

        {/* شرح مشکل */}
        <textarea
          name="description"
          placeholder="شرح مشکل..."
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          ارسال درخواست
        </button>
      </form>

      <div className="mt-6 bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold text-purple-700 mb-2">مزایای مشاوره آنلاین</h3>
        <ul className="list-disc pr-5 text-sm space-y-1">
          <li>دسترسی سریع به مشاور متخصص</li>
          <li>صرفه‌جویی در زمان و هزینه</li>
          <li>امکان پیگیری جلسات</li>
        </ul>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-blue-700 mb-2">تعرفه جلسات</h3>
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 text-right">نوع جلسه</th>
              <th className="p-2 text-right">هزینه</th>
            </tr>
          </thead>
          <tbody>
            {tariffs.map((tariff, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{tariff.type}</td>
                <td className="p-2">{tariff.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-red-50 p-3 rounded-lg text-red-700">
        ⚠️ در شرایط اورژانس روانی لطفاً با شماره ۱۱۵ تماس بگیرید
      </div>
    </div>
  )
}