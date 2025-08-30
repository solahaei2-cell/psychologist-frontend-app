import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../utils/api";
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
          if (res.success === false) throw new Error(res.message || "خطا در ورود");

          const token = res.token || res.data?.token;
          set({ token });
          toast.success("ورود موفق");

          await get().fetchMe();
          return true;
        } catch (e) {
          console.error(e);
          toast.error(e.message || "ورود ناموفق");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      async register(payload) {
        try {
          set({ loading: true });
          const res = await api.post("/api/auth/register", payload);
          if (res.success === false) throw new Error(res.message || "ثبت‌نام ناموفق");

          toast.success("ثبت‌نام با موفقیت");
          return true;
        } catch (e) {
          console.error(e);
          toast.error(e.message || "ثبت‌نام ناموفق");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      async fetchMe() {
        try {
          const token = get().token;
          if (!token) return;
          const res = await api.get("/api/auth/me", token);
          if (res.success === false) throw new Error(res.message || "خطا در دریافت اطلاعات کاربر");

          set({ user: res.user || res.data?.user || res.data });
        } catch (e) {
          console.error(e);
        }
      },

      logout() {
        set({ token: null, user: null });
        toast("خارج شدی");
      },
    }),
    { name: "psychologist-auth" }
  )
);
