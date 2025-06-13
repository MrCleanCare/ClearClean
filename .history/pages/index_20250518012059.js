import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('translation');

  return (
    <Layout>
      <NextSeo
        title={t('seo.title')}
        description={t('seo.description')}
        openGraph={{
          type: 'website',
          locale: 'ar_SA',
          url: 'https://yourdomain.com/',
          site_name: t('companyName'),
          title: t('seo.title'),
          description: t('seo.description'),
          images: [
            {
              url: '/images/og-image.jpg',
              width: 1200,
              height: 630,
              alt: t('companyName'),
            },
          ],
        }}
      />
      <Hero />
      <Services />
      <WhyChooseUs />
    </Layout>
  );
}
