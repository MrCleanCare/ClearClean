// components/AboutSection.js
// This component displays the "About Us" content, which is typically shown in a modal or a dedicated page.
// The content is fully localized using next-i18next.

import { useTranslation } from 'next-i18next';

export default function AboutSection() {
  const { t } = useTranslation('translation'); // For internationalization of about section text
  return (
    <div className="container mx-auto px-4 py-8">
      {/* About section title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary-700 dark:text-primary-200 text-center">
        {t('about.title')} {/* Localized about title */}
      </h2>
      {/* About section paragraphs */}
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p>{t('about.p1')}</p> {/* Localized paragraph 1 */}
        <p>{t('about.p2')}</p> {/* Localized paragraph 2 */}
        <p>{t('about.p3')}</p> {/* Localized paragraph 3 */}
        <p>{t('about.p4')}</p> {/* Localized paragraph 4 */}
      </div>
    </div>
  );
}
