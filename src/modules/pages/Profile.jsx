import React, { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

export default function Profile() {
  const { user, fetchMe } = useAuthStore();
  useEffect(() => { fetchMe(); }, []);

  if (!user) return <p>درحال گرفتن اطلاعات...</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">پروفایل</h2>
      <div className="rounded-2xl bg-white/5 p-4 border border-white/10 space-y-2">
        <p><b>نام:</b> {user.full_name || user.fullName || "-"}</p>
        <p><b>ایمیل:</b> {user.email}</p>
        <p><b>وضعیت:</b> {user.is_verified ? "تأییدشده" : "تأییدنشده"}</p>
      </div>
    </div>
  );
}
