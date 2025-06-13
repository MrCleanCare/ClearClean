import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Head from 'next/head';

function Error({ statusCode }) {
  const { t } = useTranslation('translation');

  return (
    <>
      <Head>
        <title>{statusCode ? `${statusCode} - ${t('error.title')}` : t('error.clientError')}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400">
              {statusCode || '???'}
            </h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              {statusCode
                ? t('error.serverError')
                : t('error.clientError')}
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              {t('error.description')}
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
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
