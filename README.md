# Next.js Website Template

This is a versatile Next.js template designed for quickly setting up new websites. It comes with a basic structure, internationalization support, and theme toggling.

## Getting Started

Follow these steps to get your new website up and running:

### 1. Clone the Repository

```bash
git clone [YOUR_REPOSITORY_URL] your-new-project-name
cd your-new-project-name
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Customize Site Configuration

Edit the `siteConfig.ts` file to update your company name, contact information, logos, and default language settings.

```typescript
// siteConfig.ts
export const siteConfig = {
  companyName: "Your Company Name",
  phoneNumber: "+1234567890",
  email: "info@yourcompany.com",
  address: "Your Company Address",
  logoLight: "/images/logo-light.avif",
  logoDark: "/images/logo-dark.avif",
  defaultLang: "en",
  direction: "ltr",
};
```

### 4. Update Content

*   **Pages:** Modify the content in the `pages/` directory to create your website's pages.
*   **Components:** Customize existing components in `components/` or add new ones.
*   **Public Assets:** Replace placeholder images in `public/images/` with your own assets (e.g., logos, hero images, service icons).
*   **Locales:** Update translation files in `public/locales/` for internationalization.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 6. Build for Production

```bash
npm run build
# or
yarn build
```

This command builds the application for production to the `.next` folder.

### 7. Deployment

This template is ready to be deployed on platforms like Vercel, Netlify, or any Node.js compatible hosting. Refer to the documentation of your chosen platform for specific deployment instructions.

## Project Structure

```
.
├── components/             # Reusable UI components
├── context/                # React Context for global state (e.g., ThemeContext)
├── lib/                    # Utility functions and helpers (e.g., i18n setup)
├── pages/                  # Next.js pages (routes)
│   ├── api/                # API routes
├── public/                 # Static assets (images, fonts, locales, etc.)
│   ├── images/
│   └── locales/
├── scripts/                # Utility scripts
├── styles/                 # Global CSS styles
├── .eslintrc.json          # ESLint configuration
├── jsconfig.json           # JavaScript configuration for VSCode
├── next-i18next.config.js  # Next.js i18n configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # This file
├── siteConfig.ts           # Centralized site configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Technologies Used

*   [Next.js](https://nextjs.org/) - React framework for production
*   [React](https://react.dev/) - JavaScript library for building user interfaces
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [next-i18next](https://github.com/i18next/next-i18next) - Internationalization for Next.js
*   [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
*   [Nodemailer](https://nodemailer.com/)- For sending emails (e.g., contact form)
*   [Heroicons](https://heroicons.com/) - SVG icons
*   [React Icons](https://react-icons.github.io/react-icons/) - Popular icon packs
*   [Axios](https://axios-http.com/) - Promise based HTTP client
*   [clsx](https://github.com/lukeed/clsx) - A tiny (229B) utility for constructing `className` strings conditionally.
*   [js-cookie](https://github.com/js-cookie/js-cookie) - A simple, lightweight JavaScript API for handling browser cookies.

## License

This project is open-sourced under the MIT License.
