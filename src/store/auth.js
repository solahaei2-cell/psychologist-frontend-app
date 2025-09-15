import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";
import { toast } from "sonner";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,

      async login(email, password) {
        try {
          set({ loading: true });
          const res = await api.post("/api/auth/login", { email, password });
          if (res.data?.success === false) throw new Error(res.data?.message || "خطا در ورود");

          const token = res.data?.token;
          // ذخیره توکن هم در وضعیت برنامه و هم در storage مرورگر برای اینترسپتور axios
          set({ token });
          try {
            localStorage.setItem('token', token);
          } catch {}
          toast.success("ورود موفق");

          await get().fetchMe();
          return true;
        } catch (e) {
          console.error(e);
          toast.error(e.response?.data?.message || e.message || "ورود ناموفق");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      async register(payload) {
        try {
          set({ loading: true });
          const res = await api.post("/api/auth/register", payload);
          if (res.data?.success === false) throw new Error(res.data?.message || "ثبت‌نام ناموفق");

          toast.success("ثبت‌نام با موفقیت");
          return true;
        } catch (e) {
          console.error(e);
          toast.error(e.response?.data?.message || e.message || "ثبت‌نام ناموفق");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      async fetchMe() {
        try {
          const token = get().token;
          if (!token) return;
          const res = await api.get("/api/auth/me");
          if (res.data?.success === false) throw new Error(res.data?.message || "خطا در دریافت اطلاعات کاربر");

          set({ user: res.data?.user || res.data });
        } catch (e) {
          console.error(e);
        }
      },

      logout() {
        set({ token: null, user: null });
        try {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
        } catch {}
        toast("خارج شدی");
      },
    }),
    { name: "psychologist-auth" }
  )
);
