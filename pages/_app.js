// pages/_app.js
// This file is used to initialize pages. It's a top-level component which is common across all the different pages.
// It can be used to keep state when navigating between pages, inject global styles, or add a custom layout.

import { appWithTranslation, useTranslation } from 'next-i18next';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { Inter, Cairo } from 'next/font/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import { siteConfig } from '../siteConfig'; // Import site configuration

// Initialize Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

// Create a ThemeContext for managing theme state across components
export const ThemeContext = createContext();

function MyApp({ Component, pageProps }) {
  // State for dark mode, mounted status, and scroll position
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('translation'); // For i18n, though some SEO is now from siteConfig
  const [scrollPosition, setScrollPosition] = useState(null);

  // SEO metadata from siteConfig for global application
  const seoTitle = siteConfig.siteTitle;
  const seoDescription = siteConfig.siteDescription;
  const seoKeywords = siteConfig.siteKeywords;
  const ogImage = siteConfig.ogImage;

  // Effect to handle theme initialization from localStorage or system preference
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

  // Effect to apply theme class to documentElement and save to localStorage
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

  // Effect to set document language and direction based on router locale
  useEffect(() => {
    if (!mounted) return;
    // Use siteConfig.direction for default if locale doesn't explicitly define it
    const locale = router.locale || siteConfig.defaultLang; 
    document.documentElement.lang = locale;
    document.documentElement.dir = siteConfig.direction; // Use siteConfig for global direction
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

  // Render nothing until component is mounted to prevent hydration mismatches
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Head component for SEO and meta tags */}
      <Head>
        <title>{seoTitle}</title> {/* Dynamic site title */}
        <meta name="description" content={seoDescription} /> {/* Dynamic site description */}
        <meta name="keywords" content={seoKeywords} /> {/* Dynamic site keywords */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content={siteConfig.theme.primaryColor} /> {/* Theme color from siteConfig */}
        
        {/* Open Graph Meta Tags for social media sharing */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
      </Head>
      {/* Global CSS variables for fonts */}
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-cairo: ${cairo.style.fontFamily};
        }
      `}</style>
      {/* ThemeProvider for managing theme state */}
      <ThemeProvider>
        <ThemeContext.Provider value={{ isDark, setIsDark, mounted }}>
          {/* ErrorBoundary to catch and display UI errors gracefully */}
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
}

// Wrap the MyApp component with appWithTranslation for i18n support
export default appWithTranslation(MyApp);
