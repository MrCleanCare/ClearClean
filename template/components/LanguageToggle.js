"use client";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';

export default function LanguageToggle() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (lng) => {
    Cookies.set('next-i18next', lng, { expires: 365 });
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <button
      onClick={() => changeLanguage(locale === 'ar' ? 'en' : 'ar')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
