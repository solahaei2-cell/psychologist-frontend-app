import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ContentLibrary from "./pages/ContentLibrary"
import Assessments from "./pages/assessments/Assessments"
import GAD7 from "./pages/assessments/GAD7"
import PHQ9 from "./pages/assessments/PHQ9"
import Quick from "./pages/assessments/Quick"
import Consultation from "./pages/Consultation"

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // بررسی localStorage برای حالت ذخیره‌شده
    const saved = localStorage.getItem('darkMode')
    if (saved) return saved === 'true'
    // اگه چیزی ذخیره نشده، از تنظیمات سیستم استفاده کن
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // اعمال کلاس dark به html
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // ذخیره حالت در localStorage
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<ContentLibrary />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/gad7" element={<GAD7 />} />
          <Route path="/assessments/phq9" element={<PHQ9 />} />
          <Route path="/assessments/quick" element={<Quick />} />
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
      </motion.main>
    </div>
  )
}