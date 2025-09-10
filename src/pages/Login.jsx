import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      const res = await api.post('/api/auth/login', { email: form.email, password: form.password })
      if (res.data.success && res.data.token) {
        // ذخیره توکن برای درخواست‌های بعدی
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      } else {
        setError(res.data.message || 'خطا در ورود')
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('خطا در ورود')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">ورود</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="ایمیل" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="رمز عبور" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button disabled={loading} className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  )
}
