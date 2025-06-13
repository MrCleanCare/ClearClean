import { appWithTranslation, useTranslation } from 'next-i18next';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { Inter, Cairo } from 'next/font/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export const ThemeContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('translation');
  const [scrollPosition, setScrollPosition] = useState(null);

  const seoTitle = t('seo.title');
  const seoDescription = t('seo.description');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const locale = router.locale || 'ar';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [router.locale, mounted]);

  // Save scroll position before language/theme change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to save current scroll position and section
    const saveScrollPosition = () => {
      const currentHash = window.location.hash;
      const currentScroll = window.pageYOffset;
      setScrollPosition({ hash: currentHash, scroll: currentScroll });
    };

    // Save position before language change
    router.events.on('beforeHistoryChange', saveScrollPosition);

    return () => {
      router.events.off('beforeHistoryChange', saveScrollPosition);
    };
  }, [router]);

  // Restore scroll position after language/theme change
  useEffect(() => {
    if (typeof window === 'undefined' || !scrollPosition) return;

    // Wait for the page to rerender and elements to be available
    const timer = setTimeout(() => {
      if (scrollPosition.hash) {
        const element = document.querySelector(scrollPosition.hash);
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'instant'
          });
        }
      } else {
        window.scrollTo({
          top: scrollPosition.scroll,
          behavior: 'instant'
        });
      }
      // Clear the saved position after restoration
      setScrollPosition(null);
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollPosition, router.locale]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content={isDark ? '#111827' : '#ffffff'} />
      </Head>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-cairo: ${cairo.style.fontFamily};
        }
      `}</style>
      <ThemeProvider>
        <ThemeContext.Provider value={{ isDark, setIsDark, mounted }}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
