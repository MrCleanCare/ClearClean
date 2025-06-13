import { useTranslation } from 'next-i18next';

export default function AboutSection() {
  const { t } = useTranslation('translation');
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary-700 dark:text-primary-200 text-center">
        {t('about.title')}
      </h2>
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
        <p>{t('about.p4')}</p>
      </div>
    </div>
  );
}
