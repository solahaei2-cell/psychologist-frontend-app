import React from "react"
import { Routes, Route } from "react-router-dom"
import { motion } from "framer-motion" // اضافه کردن برای انیمیشن‌های شیک
import Navbar from "./components/Navbar"

// صفحات اصلی
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

// کتابخانه محتوا
import ContentLibrary from "./pages/ContentLibrary"

// تست‌ها
import Assessments from "./pages/assessments/Assessments"
import GAD7 from "./pages/assessments/GAD7"
import PHQ9 from "./pages/assessments/PHQ9"
import Quick from "./pages/assessments/Quick"

// مشاوره
import Consultation from "./pages/Consultation"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900"> {/* پشتیبانی dark mode */}
      <Navbar />
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} // انیمیشن نرم برای ورود صفحه
      >
        <Routes>
          {/* صفحات اصلی */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* کتابخانه محتوا */}
          <Route path="/content" element={<ContentLibrary />} />

          {/* تست‌ها */}
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/gad7" element={<GAD7 />} />
          <Route path="/assessments/phq9" element={<PHQ9 />} />
          <Route path="/assessments/quick" element={<Quick />} />

          {/* مشاوره */}
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
      </motion.main>
    </div>
  )
}