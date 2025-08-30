import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="grid sm:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed">
          سلام! 👋 به <span className="text-primary">روان‌شناس هوشمند</span> خوش اومدی
        </h1>
        <p className="text-white/80">
          اینجا می‌تونی به محتواهای آموزش سلامت روان دسترسی داشته باشی و با دستیار چت کنی.
        </p>
        <div className="flex gap-3">
          <Link to="/content" className="px-4 py-2 rounded-2xl bg-primary hover:bg-primary-700">شروع با محتوا</Link>
          <Link to="/chat" className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20">گفت‌وگو</Link>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6">
        <ul className="grid gap-3">
          <li className="p-4 rounded-2xl bg-white/5">✅ ساده، سریع و واکنش‌گرا</li>
          <li className="p-4 rounded-2xl bg-white/5">🔐 ورود با JWT و محافظت مسیرها</li>
          <li className="p-4 rounded-2xl bg-white/5">🧩 اتصال مستقیم به بک‌اند Render</li>
        </ul>
      </div>
    </section>
  );
}
