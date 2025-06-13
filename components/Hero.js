import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation('translation');

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    if (contactSection) {
      const targetPosition = contactSection.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.avif"
          alt="Professional cleaning service"
          fill
          sizes="100vw"
          style={{objectFit: 'cover', opacity: 0.2}}
          priority
        />
      </div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleContactClick}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('hero.cta')}
            </button>
            <Link
              href="#services"
              className="bg-primary-600 border-2 border-primary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {t('hero.services')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
