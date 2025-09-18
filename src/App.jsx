// این فایل اصلی برای مسیریابی اپلیکیشن است.
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Login from './modules/pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ContentLibrary from './pages/ContentLibrary';
import Assessments from './pages/assessments/Assessments';
import GAD7 from './pages/assessments/GAD7';
import PHQ9 from './pages/assessments/PHQ9';
import Quick from './pages/assessments/Quick';
import Consultation from './pages/Consultation';
import { useAuthStore } from './store/auth';

// محافظ مسیرها بر اساس وجود توکن
function Protected({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} text-gray-800 font-sans rtl`}>
        <Helmet>
          <title>روان‌شناس هوشمند</title>
          <meta name="description" content="پلتفرم روان‌شناسی هوشمند برای ارزیابی، آموزش و مشاوره آنلاین با استفاده از هوش مصنوعی" />
          <meta name="keywords" content="روان‌شناسی, مشاوره آنلاین, ارزیابی روان‌شناختی, هوش مصنوعی, سلامت روان" />
          <meta property="og:title" content="روان‌شناس هوشمند" />
          <meta property="og:description" content="پلتفرم روان‌شناسی هوشمند برای ارزیابی، آموزش و مشاوره آنلاین" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="روان‌شناس هوشمند" />
          <meta name="twitter:description" content="پلتفرم روان‌شناسی هوشمند برای ارزیابی، آموزش و مشاوره آنلاین" />
        </Helmet>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: { fontFamily: 'Vazir', borderRadius: '8px', padding: '12px' },
            success: { style: { background: '#DCFCE7', color: '#166534' } },
            error: { style: { background: '#FEE2E2', color: '#991B1B' } },
            warning: { style: { background: '#FEF9C3', color: '#854D0E' } },
            info: { style: { background: '#DBEAFE', color: '#1E40AF' } },
          }}
        />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/content" element={<ContentLibrary />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/assessments/gad7" element={<GAD7 />} />
            <Route path="/assessments/phq9" element={<PHQ9 />} />
            <Route path="/assessments/quick" element={<Quick />} />
            <Route path="/consultation" element={<Consultation />} />
          </Routes>
        </motion.main>
      </div>
    </HelmetProvider>
  );
}

export default App;