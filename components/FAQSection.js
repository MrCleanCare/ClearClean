// components/FAQSection.js
// This component displays a list of Frequently Asked Questions (FAQs),
// with questions and answers pulled from siteConfig and localized via next-i18next.

import { useTranslation } from 'next-i18next';
import { siteConfig } from '../siteConfig'; // Import site configuration

export default function FAQSection() {
  const { t } = useTranslation('translation'); // For internationalization of FAQ titles and content

  // Use FAQs data from siteConfig
  // The question and answer are localized using t() based on their keys in the translation files.
  const faqs = siteConfig.faqs.map(faq => ({
    question: t(`faqs.${faq.question.toLowerCase().replace(/[^a-z0-9]/g, '')}`), // Create a simple key for translation
    answer: t(`faqs.${faq.answer.toLowerCase().replace(/[^a-z0-9]/g, '')}`), // Create a simple key for translation
  }));

  return (
    // FAQ section container
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-primary-700 dark:text-primary-200 drop-shadow">
          {t('faqs.title')} {/* Localized FAQ title */}
        </h2>
        {/* FAQ items */}
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-primary-700 dark:text-primary-200">{faq.question}</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
