import '../lib/i18n';
import { appWithTranslation } from 'next-i18next';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export const ThemeContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Dynamically update <html> dir and lang on locale change
  useEffect(() => {
    const locale = router.locale || 'ar';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [router.locale]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default appWithTranslation(MyApp); 