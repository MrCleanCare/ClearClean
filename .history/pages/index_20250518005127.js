import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

 export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('translation');
  return (
    <>
      <NextSeo
        title="شركة التنظيف المحترفة | Professional Cleaning Company in KSA"
        description="نقدم خدمات تنظيف عالية الجودة في المملكة العربية السعودية | High-quality cleaning services across Saudi Arabia."
        openGraph={{
          type: 'website',
          locale: 'ar_SA',
          url: 'https://yourdomain.com/',
          site_name: 'شركة التنظيف',
          title: 'شركة التنظيف المحترفة',
          description: 'نقدم خدمات تنظيف عالية الجودة في المملكة العربية السعودية'
        }}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-12">
        <div className="flex justify-between">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
        <p>{t('description')}</p>
      </div>
    </>
  );
}
