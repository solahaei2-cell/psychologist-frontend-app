import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast' // اضافه کردن toast
import api from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/api/auth/login', { email: form.email, password: form.password })
      const token = res.data.token
      if (form.remember) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }
      toast.success('ورود با موفقیت انجام شد! 🎉')
      navigate('/dashboard')
    } catch {
      toast.error('ایمیل یا رمز عبور اشتباه است ❌')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">ورود</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="ml-2"
          />
          مرا به خاطر بسپار
        </label>
        <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 dark:bg-purple-500">
          ورود
        </button>
      </form>
    </div>
  )
}