import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  isDark: false,
  setIsDark: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(null);

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark' || (!savedTheme && darkModeMediaQuery.matches));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Save scroll position before theme change
    const currentHash = window.location.hash;
    const currentScroll = window.pageYOffset;
    setScrollPosition({ hash: currentHash, scroll: currentScroll });

    // Apply theme
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);

    // Restore scroll position after theme change
    const timer = setTimeout(() => {
      if (scrollPosition?.hash) {
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
      } else if (scrollPosition?.scroll) {
        window.scrollTo({
          top: scrollPosition.scroll,
          behavior: 'instant'
        });
      }
      setScrollPosition(null);
    }, 100);

    return () => clearTimeout(timer);
  }, [isDark, mounted]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
} 