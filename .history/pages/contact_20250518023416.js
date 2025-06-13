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

export default function Contact() {
  const { t } = useTranslation('translation');
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">{t('nav.contact')}</h1>
        <ul className="mb-4">
          <li><strong>{t('footer.phone')}:</strong> {t('footer.phone')}</li>
          <li><strong>{t('footer.email')}:</strong> {t('footer.email')}</li>
          <li><strong>{t('footer.address')}:</strong> {t('footer.address')}</li>
        </ul>
        {/* You can add a contact form here later */}
      </div>
    </Layout>
  );
} 