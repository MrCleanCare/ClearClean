
# 🧼 Cleaning Company One-Page Website Template (Reusable Version)

This is a **centralized, fully customizable one-page website** template built with **Next.js + Tailwind CSS** and designed for **cleaning companies** — now converted into a **reusable website template** for any local business.

---

## 🚀 Features

- ✅ One-page layout (all sections in `index.tsx`)
- 🌐 Bilingual support (Arabic + English) using `next-i18next`
- 🧩 Configurable via `siteConfig.ts`
- 🧼 Interactive Services section with modal details
- 💬 Testimonials section (configurable)
- 📍 Embedded Google Maps in Contact section
- 📲 WhatsApp & Call Now sticky buttons
- 📁 All content centralized — no routing needed
- 🌓 Auto theme switch (dark/light logos)
- 💡 Fully responsive design
- 🧠 Easily brandable for any service business

---

## 🔧 How to Use

1. **Edit Config:**

Update branding and content via:
```ts
// siteConfig.ts
export const siteConfig = {
  companyName: "Your Company",
  primaryColor: "#yourColor",
  phoneNumber: "+9665XXXXXXX",
  ...
};
```

2. **Run Locally:**
```bash
npm install
npm run dev
```

3. **Build for Production:**
```bash
npm run build
npm start
```

4. **Deploy to Vercel / Netlify**

---

## 🌍 Directory Structure

```
Cleaning_OnePage_Final_Deployable-main/
├── siteConfig.ts          # 🔧 Central config for logo, colors, services, reviews
├── components/            # React components for each section
├── pages/index.tsx        # One-page site
├── public/                # Assets (images, icons, logos)
│   └── locales/           # i18n translations for ar/en
├── styles/                # Tailwind global styles
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind theme setup
├── package.json
└── README.md              # This file
```

---

## 🧩 Optional Future Enhancements

- Supabase CMS integration (editable without code)
- QR code + dynamic links per client
- Admin dashboard for client creation
- Subdomain / `?client=` support for multi-tenant

---

## 📄 License

Free to use for commercial and personal projects.

---

Made with ❤️ for service-based businesses.
