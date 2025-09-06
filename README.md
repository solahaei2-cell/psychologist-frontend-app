روان‌شناس هوشمند 🧠
اپلیکیشن وب برای بهبود سلامت روان با ابزارهای علمی شامل تست‌های روان‌شناسی، محتوای آموزشی، و مشاوره آنلاین.
ویژگی‌ها

تست‌های روان‌شناسی: شامل GAD-7، PHQ-9، و تست سریع.
کتابخانه محتوا: مقالات، ویدیوها، فایل‌های صوتی، و تمرین‌های آموزشی.
مشاوره آنلاین: درخواست جلسات عمومی، تخصصی، و اورژانسی.
ویژگی‌های تعاملی: امتیازدهی، مدال‌ها، روزهای متوالی فعالیت، و پیشنهادات شخصی‌سازی‌شده.
رابط کاربری شیک: دارک مود، انیمیشن‌های نرم، و پالت رنگی آرام‌بخش (بنفش و آبی).
اعلانات: موفقیت (سبز)، خطا (قرمز)، هشدار (زرد)، و اطلاعاتی (آبی).

نصب و راه‌اندازی

مخزن را کلون کنید:git clone <repository-url>


پکیج‌ها را نصب کنید:npm install


پروژه را اجرا کنید:npm run dev



API Endpoints

POST /api/auth/login: ورود کاربر ({ email, password })
POST /api/auth/register: ثبت‌نام ({ fullName, email, password })
GET /api/users/profile: اطلاعات کاربر
GET /api/users/stats: آمار کاربر (امتیاز، streak، تست‌ها)
GET /api/assessments/history: تاریخچه تست‌ها
POST /api/assessments/submit: ارسال نتایج تست
GET /api/recommendations: پیشنهادات شخصی‌سازی‌شده
GET /api/content: لیست محتوا (با پارامتر page)
POST /api/content/like: لایک محتوا ({ contentId })
POST /api/content/complete: تکمیل محتوا ({ contentId })
POST /api/consultation/request: درخواست مشاوره ({ type, date, time, description })

بهینه‌سازی‌ها

Lazy loading برای محتوا با Intersection Observer
SEO با متا تگ‌های پویا (react-helmet-async)
دسترسی‌پذیری با aria-label و keyboard navigation
تست‌های واحد با Jest و React Testing Library

تکنولوژی‌ها

React, Tailwind CSS, Framer Motion, React Hot Toast, SWR, React Helmet Async
فونت: Vazir
API: RESTful با احراز هویت Bearer Token
