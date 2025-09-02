import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">🧠 روان‌شناس هوشمند</div>
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">خانه</Link>
            <Link to="/content" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">کتابخانه</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">داشبورد</Link>
                <button onClick={handleLogout} className="text-red-600 dark:text-red-400">خروج</button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg dark:bg-purple-500">ورود</Link>
                <Link to="/register" className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg dark:border-purple-400 dark:text-purple-400">ثبت‌نام</Link>
              </>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-700 dark:text-gray-200"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">خانه</Link>
              <Link to="/content" className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">کتابخانه</Link>
              {token ? (
                <>
                  <Link to="/dashboard" className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md">داشبورد</Link>
                  <button onClick={handleLogout} className="block text-red-600 dark:text-red-400 px-3 py-2">خروج</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block bg-purple-600 text-white px-3 py-2 rounded-lg dark:bg-purple-500">ورود</Link>
                  <Link to="/register" className="block border border-purple-600 text-purple-600 px-3 py-2 rounded-lg dark:border-purple-400 dark:text-purple-400">ثبت‌نام</Link>
                </>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="block text-gray-700 dark:text-gray-200 px-3 py-2"
              >
                {darkMode ? '☀️ حالت روشن' : '🌙 حالت تیره'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}