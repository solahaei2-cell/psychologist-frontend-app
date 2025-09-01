import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    gender: '',
    acceptTerms: false
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) return setError('رمز عبور باید حداقل ۸ کاراکتر باشد')
    if (!form.acceptTerms) return setError('باید قوانین را بپذیرید')
    try {
      await api.post('/api/auth/register', form)
      navigate('/login')
    } catch {
      setError('خطا در ثبت‌نام')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">ثبت‌نام</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" placeholder="نام کامل" value={form.fullName} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="email" type="email" placeholder="ایمیل" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="mobile" type="tel" placeholder="موبایل" value={form.mobile} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="رمز عبور" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">جنسیت</option>
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>
        <label className="flex items-center">
          <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={handleChange} className="ml-2" />
          قوانین را می‌پذیرم
        </label>
        <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">ثبت‌نام</button>
      </form>
    </div>
  )
}
