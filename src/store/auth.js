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

          // پشتیبانی از کلیدهای مختلف توکن
          let token = res.data?.token
            || res.data?.accessToken
            || res.data?.data?.token
            || res.data?.data?.accessToken
            || null;

          // fallback: دریافت از هدر Authorization
          if (!token) {
            const authHeader = res.headers?.authorization || res.headers?.Authorization;
            if (authHeader && String(authHeader).toLowerCase().startsWith('bearer ')) {
              token = String(authHeader).slice(7);
            }
          }

          if (!token) {
            throw new Error("توکن احراز هویت از سرور دریافت نشد");
          }

          console.debug('[auth.store] login token len:', token.length);

          // ذخیره توکن هم در وضعیت برنامه و هم در storage مرورگر برای اینترسپتور axios
          set({ token });
          try {
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
          } catch {}

          // بلافاصله روی axios قرار بده تا درخواست بعدی همزمان درست برود
          try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } catch {}

          toast.success("ورود موفق");

          await get().fetchMe();
          return true;
        } catch (e) {
          console.error('[auth.store] login error:', e);
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
