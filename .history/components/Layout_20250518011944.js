import { useTranslation } from 'next-i18next';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Layout({ children }) {
  const { t } = useTranslation('translation');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {t('companyName')}
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/services" className="hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.services')}
              </Link>
              <Link href="/about" className="hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.about')}
              </Link>
              <Link href="/contact" className="hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.contact')}
              </Link>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
              <p>{t('footer.phone')}</p>
              <p>{t('footer.email')}</p>
              <p>{t('footer.address')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
              <ul className="space-y-2">
                <li>{t('services.residential')}</li>
                <li>{t('services.commercial')}</li>
                <li>{t('services.deep')}</li>
                <li>{t('services.move')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.follow')}</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
                  {t('footer.social.facebook')}
                </a>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
                  {t('footer.social.instagram')}
                </a>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">
                  {t('footer.social.twitter')}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} {t('companyName')}. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 