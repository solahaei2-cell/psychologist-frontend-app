import React, { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading } = useAuthStore();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const ok = await register({ fullName, email, password });
    if (ok) nav("/login");
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">ثبت‌نام</h2>
      <input className="w-full px-4 py-2 rounded-xl bg-white/10" placeholder="نام و نام‌خانوادگی" value={fullName} onChange={e=>setFullName(e.target.value)} />
      <input className="w-full px-4 py-2 rounded-xl bg-white/10" placeholder="ایمیل" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full px-4 py-2 rounded-xl bg-white/10" placeholder="رمز عبور" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button disabled={loading} className="w-full px-4 py-2 rounded-xl bg-primary">{loading? "صبر کن..." : "ثبت‌نام"}</button>
    </form>
  );
}
