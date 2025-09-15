import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "../store/auth";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ContentList from "../pages/ContentLibrary.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";

function Nav() {
  const { token, logout } = useAuthStore();
  const loc = useLocation();
  return (
    <header className="backdrop-blur bg-white/5 border-b border-white/10 sticky top-0 z-40">
      <nav className="container flex items-center gap-3 py-3">
        <Link to="/" className="font-bold text-lg">🧠 روان‌شناس هوشمند</Link>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/content" className={linkCls(loc, "/content")}>
            محتوا
          </Link>
          <Link to="/chat" className={linkCls(loc, "/chat")}>
            چت
          </Link>
          {token ? (
            <>
              <Link to="/profile" className={linkCls(loc, "/profile")}>
                پروفایل
              </Link>
              <button onClick={logout} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20">
                خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkCls(loc, "/login")}>
                ورود
              </Link>
              <Link to="/register" className={linkCls(loc, "/register")}>
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

const linkCls = (loc, path) =>
  `px-3 py-1.5 rounded-xl ${
    loc.pathname.startsWith(path) ? "bg-primary/30" : "hover:bg-white/10"
  }`;

function Protected({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Nav />
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/content" element={<ContentList />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/chat" element={<Protected><Chat /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster richColors position="top-center" />
    </>
  );
}
