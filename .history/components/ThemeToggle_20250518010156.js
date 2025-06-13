"use client";
import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

export default function ThemeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
