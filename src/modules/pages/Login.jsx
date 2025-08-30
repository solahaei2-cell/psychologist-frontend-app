import React, { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) nav("/content");
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">ورود</h2>
      <input className="w-full px-4 py-2 rounded-xl bg-white/10" placeholder="ایمیل" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full px-4 py-2 rounded-xl bg-white/10" placeholder="رمز عبور" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button disabled={loading} className="w-full px-4 py-2 rounded-xl bg-primary">{loading? "صبر کن..." : "ورود"}</button>
      <p className="text-sm text-white/70">حساب نداری؟ <Link to="/register" className="underline">ثبت‌نام</Link></p>
    </form>
  );
}
