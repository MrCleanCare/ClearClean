import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function WhyChooseUs() {
  const { t } = useTranslation('translation');

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
            <Image
              src="/images/why-choose-us.avif"
              alt="Professional cleaning team"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{objectFit: 'cover'}}
              priority={false}
            />
            <div className="absolute inset-0 bg-primary-800/20 dark:bg-primary-900/40" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary-700 dark:text-primary-200 drop-shadow">{t('whyUs.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('whyUs.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
