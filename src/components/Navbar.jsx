import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-purple-600">🧠 روان‌شناس هوشمند</div>
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">خانه</Link>
            <Link to="/content" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">کتابخانه</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">داشبورد</Link>
                <button onClick={handleLogout} className="text-red-600">خروج</button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg">ورود</Link>
                <Link to="/register" className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg">ثبت‌نام</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
