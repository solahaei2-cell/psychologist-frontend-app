// GAD-7: اضطراب تعمیم‌یافته
export const GAD7_ITEMS = [
  "احساس نگرانی، اضطراب یا تنش",
  "ناتوانی در متوقف کردن یا کنترل نگرانی",
  "نگرانی بیش از حد درباره موضوعات مختلف",
  "مشکل در آرام شدن",
  "بی‌قراری به حدی که نتوانید آرام بنشینید",
  "زود عصبانی یا تحریک‌پذیر شدن",
  "احساس ترس مثل اینکه اتفاق وحشتناکی ممکن است بیفتد",
]

// PHQ-9: افسردگی
export const PHQ9_ITEMS = [
  "بی‌علاقگی یا لذت نبردن از انجام کارها",
  "احساس غمگینی، افسردگی یا ناامیدی",
  "مشکل در خوابیدن یا خواب زیاد",
  "احساس خستگی یا کمبود انرژی",
  "کم‌اشتهایی یا پرخوری",
  "احساس بد درباره خود (شکست‌خورده یا مایه‌ی ناامیدی)",
  "مشکل در تمرکز (مثلاً خواندن یا تماشای تلویزیون)",
  "کندی یا بی‌قراری شدید در حرکت یا صحبت کردن",
  "افکار مرگ یا آسیب رساندن به خود",
]

// Quick Screen – غربالگری سریع
export const QUICK_ITEMS = [
  "تجربه استرس شدید که سخت قابل مدیریت است",
  "احساس اضطراب در موقعیت‌های روزمره",
  "احساس غم یا پایین بودن خلق بیشتر روزها",
  "مشکل در خوابیدن یا خواب بی‌کیفیت",
  "سختی در تمرکز بر کارها",
]

// Helpers
export function sum(arr = []) {
  return arr.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0)
}

export function interpretGAD7(score) {
  if (score <= 4) return { level: "حداقل اضطراب", color: "green" }
  if (score <= 9) return { level: "اضطراب خفیف", color: "yellow" }
  if (score <= 14) return { level: "اضطراب متوسط", color: "orange" }
  return { level: "اضطراب شدید", color: "red" }
}

export function interpretPHQ9(score) {
  if (score <= 4) return { level: "افسردگی حداقل", color: "green" }
  if (score <= 9) return { level: "افسردگی خفیف", color: "yellow" }
  if (score <= 14) return { level: "افسردگی متوسط", color: "orange" }
  if (score <= 19) return { level: "افسردگی نسبتاً شدید", color: "rose" }
  return { level: "افسردگی شدید", color: "red" }
}
