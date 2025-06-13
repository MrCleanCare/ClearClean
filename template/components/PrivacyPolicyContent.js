import React from 'react';
import { useTranslation } from 'next-i18next';

const PrivacyPolicyContent = () => {
  const { t } = useTranslation('translation');

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{t('privacyPolicy.title')}</h1>
      <p>{t('privacyPolicy.p1')}</p>
      <p>{t('privacyPolicy.p2')}</p>
      <p>{t('privacyPolicy.p3')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('privacyPolicy.h1')}</h2>
      <p>{t('privacyPolicy.p4')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('privacyPolicy.h2')}</h2>
      <p>{t('privacyPolicy.p5')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('privacyPolicy.h3')}</h2>
      <p>{t('privacyPolicy.p6')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('privacyPolicy.h4')}</h2>
      <p>{t('privacyPolicy.p7')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('privacyPolicy.h5')}</h2>
      <p>{t('privacyPolicy.p8')}</p>
    </div>
  );
};

export default PrivacyPolicyContent;
