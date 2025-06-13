import React from 'react';
import { useTranslation } from 'next-i18next';

const TermsAndConditionsContent = () => {
  const { t } = useTranslation('translation');

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{t('termsAndConditions.title')}</h1>
      <p>{t('termsAndConditions.p1')}</p>
      <p>{t('termsAndConditions.p2')}</p>
      <p>{t('termsAndConditions.p3')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('termsAndConditions.h1')}</h2>
      <p>{t('termsAndConditions.p4')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('termsAndConditions.h2')}</h2>
      <p>{t('termsAndConditions.p5')}</p>
      <h2 className="text-2xl font-semibold mt-6 mb-3">{t('termsAndConditions.h3')}</h2>
      <p>{t('termsAndConditions.p6')}</p>
    </div>
  );
};

export default TermsAndConditionsContent;
