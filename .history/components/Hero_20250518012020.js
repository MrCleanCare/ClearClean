import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation('translation');

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Professional cleaning service"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('hero.cta')}
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t('hero.services')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 