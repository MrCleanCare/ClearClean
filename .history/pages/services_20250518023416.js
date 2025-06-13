import Layout from '@/components/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}

export default function Services() {
  const { t } = useTranslation('translation');
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">{t('services.title')}</h1>
        <p className="mb-8">{t('services.subtitle')}</p>
        {/* You can add more detailed service info here later */}
      </div>
    </Layout>
  );
} 