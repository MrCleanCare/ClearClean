import { useTranslation } from 'next-i18next';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation('translation');

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="relative h-10 w-auto">
              <Image
                src="/images/logo-light.avif"
                alt={t('companyName')}
                className="block dark:hidden"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <Image
                src="/images/logo-dark.avif"
                alt={t('companyName')}
                className="hidden dark:block"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {t('footer.description')}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {t('footer.contact')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=21.5652855,39.1422406"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-3 text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {t('address')}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <a
                      href="tel:+966920033223"
                      className="mr-3 text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      920033223
                    </a>
                  </li>
                  <li className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <a
                      href="mailto:info@mastercleancare.sa"
                      className="mr-3 text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      info@mastercleancare.sa
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {t('footer.legal')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <button
                      onClick={() => window.openPrivacyPolicyModal()}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {t('footer.privacyPolicy')}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.openTermsAndConditionsModal()}
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {t('footer.terms')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-500 text-center">
            &copy; {new Date().getFullYear()} {t('companyName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
