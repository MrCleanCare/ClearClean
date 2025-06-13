import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import { FaWhatsapp } from 'react-icons/fa';
import PopupModal from '@/components/PopupModal';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import TermsAndConditionsContent from '@/components/TermsAndConditionsContent';
import Head from 'next/head';

const Services = dynamic(() => import('@/components/Services'));
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'));
const ContactFormSection = dynamic(() => import('@/components/ContactFormSection'));

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('translation');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalContent, setModalContent] = React.useState(null);
  const router = useRouter();

  // Handle scroll position restoration
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the hash from the URL (e.g., #services, #contact)
      const hash = window.location.hash;
      if (hash) {
        // Wait for the page to fully load
        setTimeout(() => {
          const element = document.querySelector(hash);
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'instant'
            });
          }
        }, 0);
      }
    }
  }, []);

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const openPrivacyPolicyModal = () => {
    openModal(t('privacyPolicy.title'), <PrivacyPolicyContent />);
  };

  const openTermsAndConditionsModal = () => {
    openModal(t('termsAndConditions.title'), <TermsAndConditionsContent />);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": t('companyName'),
    "image": "/images/logo-light.avif",
    "description": t('seo.description'),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع الأمير سلطان، حي النهضة",
      "addressLocality": "Jeddah",
      "postalCode": "23423",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.5652855,
      "longitude": 39.1422406
    },
    "url": "https://clearclean.info/",
    "telephone": "+966561062662",
    "areaServed": {
      "@type": "City",
      "name": "Jeddah"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.postConstruction'),
            "description": t('services.postConstructionDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.carpetUpholstery'),
            "description": t('services.carpetUpholsteryDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.tankCleaningInsulation'),
            "description": t('services.tankCleaningInsulationDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.pestControl'),
            "description": t('services.pestControlDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.standardCleaning'),
            "description": t('services.standardCleaningDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.officeWorkplaceCleaning'),
            "description": t('services.officeWorkplaceCleaningDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.movingClean'),
            "description": t('services.movingCleanDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.steamCleaning'),
            "description": t('services.steamCleaningDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.acCleaning'),
            "description": t('services.acCleaningDesc')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.marblePolishing'),
            "description": t('services.marblePolishingDesc')
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="keywords" content={t('seo.keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:image" content="/images/logo-light.avif" />
        <meta property="og:url" content="https://clearclean.info" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.title')} />
        <meta name="twitter:description" content={t('seo.description')} />
        <meta name="twitter:image" content="/images/logo-light.avif" />
        <link rel="canonical" href="https://clearclean.info" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preload" href="/images/logo-light.avif" as="image" />
        <link rel="preload" href="/images/logo-dark.avif" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
      </Head>
      <Layout
        openModal={openModal}
        openPrivacyPolicyModal={openPrivacyPolicyModal}
        openTermsAndConditionsModal={openTermsAndConditionsModal}
      >
        <Hero />
        <section id="introduction" className="section py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Introduction">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('introduction.title')}</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">{t('introduction.content')}</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{t('introduction.slogan')}</p>
          </div>
        </section>
        <section id="services" className="section py-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Services">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading services...</div>}>
            <Services openModal={openModal} />
          </Suspense>
        </section>
        <section id="why-choose-us" className="section py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Why Choose Us">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading...</div>}>
            <WhyChooseUs openModal={openModal} />
          </Suspense>
        </section>
        <section id="about" className="section py-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="About Us">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading about section...</div>}>
            <AboutSection openModal={openModal} />
          </Suspense>
        </section>
        <section id="our-message" className="section py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Our Message">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ourMessage.title')}</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">{t('ourMessage.content')}</p>
          </div>
        </section>
        <section id="our-vision" className="section py-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Our Vision">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ourVision.title')}</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">{t('ourVision.content')}</p>
          </div>
        </section>
        <section id="reviews" className="section py-20 min-h-[300px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Customer Reviews">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading reviews...</div>}>
            <ReviewsSection />
          </Suspense>
        </section>
        <section id="faq" className="section py-20 min-h-[300px] bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="FAQ">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading FAQ...</div>}>
            <FAQSection />
          </Suspense>
        </section>
        <section id="contact" className="section py-20 min-h-[300px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" aria-label="Contact">
          <Suspense fallback={<div style={{minHeight: 200}}>Loading contact form...</div>}>
            <ContactFormSection />
          </Suspense>
        </section>
        <a
          href="https://wa.me/966561062662"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
          style={{ boxShadow: '0 4px 24px #0002' }}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={32} />
        </a>
      </Layout>
      <PopupModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </PopupModal>
    </>
  );
}
