"use client";
import { useRouter } from 'next/router';

export const LanguageToggle = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

const changeLanguage = (lng) => {
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <button onClick={() => changeLanguage(locale === 'ar' ? 'en' : 'ar')}>
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
};
