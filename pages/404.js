import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404() {
  const { t } = useTranslation('translation');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {t('error.pageNotFound')}
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            {t('error.pageNotFoundDesc')}
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200"
          >
            {t('error.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
};
