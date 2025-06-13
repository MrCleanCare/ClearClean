import { useTranslation } from 'next-i18next';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { FaInstagram, FaWhatsapp, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';
import { ThemeContext } from '../pages/_app'; // Correct path to ThemeContext
import AboutSection from './AboutSection'; // Import AboutSection
import ContactFormSection from './ContactFormSection';

export default function Layout({
  children,
  openModal,
  openPrivacyPolicyModal,
  openTermsAndConditionsModal,
  openAboutUsModal,
  form,
  setForm,
  handleSubmit,
  loading,
  submitted,
  formMessage
}) {
  const { t } = useTranslation('translation');
  const [activeSection, setActiveSection] = useState('');
  const { isDark, mounted: themeMounted } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Function to update active section
    const handleScroll = () => {
      const sections = ['services', 'reviews', 'satisfaction', 'faq', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight / 3);

      const activeSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset;
        return scrollPosition >= offsetTop && scrollPosition < (offsetTop + rect.height);
      });

      if (activeSection) {
        setActiveSection(activeSection);
        // Update URL hash without scrolling
        const url = new URL(window.location);
        url.hash = activeSection;
        window.history.replaceState({}, '', url);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Handle smooth scrolling for anchor links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  // Don't render anything until both component and theme are mounted
  if (!mounted || !themeMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "CleaningService",
              "name": "Master Clean Care",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "شارع الأمير سلطان، حي النهضة",
                "addressLocality": "Jeddah",
                "postalCode": "23423",
                "addressCountry": "SA"
              },
              "telephone": ["+966561062662", "+966501266260"],
              "url": "https://masterclean-care.com",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 21.54333,
                "longitude": 39.17278
              }
            }`
          }}
        />
      </Head>
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 via-primary-100/30 to-primary-50/50 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-primary-900/30"></div>
        <nav className="container mx-auto px-4 py-4 relative">
          <div className="flex flex-wrap justify-between items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center text-2xl font-bold text-primary-600 dark:text-primary-400 hover:opacity-90 transition-all duration-300">
              <Image
                src={isDark ? "/images/logo-dark.avif" : "/images/logo-light.avif"}
                alt={t('companyName') + ' - Logo - Saudi Arabia Cleaning Services'}
                width={120}
                height={48}
                priority
                className="h-10 w-auto hover:transform hover:scale-105 transition-transform duration-300"
                style={{display: 'block'}}
                unoptimized={true}
              />
            </Link>
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, 'services')}
                className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium ${
                  activeSection === 'services' ? 'font-bold text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : ''
                }`}
              >
                {t('nav.services')}
              </a>
              <button
                onClick={() => {
                  const content = <AboutSection />;
                  openModal(t('nav.about'), content);
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                  if (contactSection) {
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {t('nav.contact')}
              </button>
              <div className="flex items-center gap-4">
                <LanguageToggle />
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-[72px]">
        {children}
      </main>

      <footer className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">{t('footer.contact')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <i className="fas fa-map-marker-alt mt-1 text-primary-300"></i>
                  <a 
                    href="https://maps.google.com/?q=21.54333,39.17278" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-100 hover:text-white transition-colors duration-200"
                  >
                    {t('footer.address')}
                  </a>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <i className="fas fa-phone mt-1 text-primary-300"></i>
                  <div className="space-y-1">
                    <a 
                      href="tel:+966561062662" 
                      className="block text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      +966 56 106 2662
                    </a>
                    <a 
                      href="tel:+966501266260" 
                      className="block text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      +966 50 126 6260
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <i className="fas fa-envelope mt-1 text-primary-300"></i>
                  <a 
                    href="mailto:info@masterclean-care.com" 
                    className="text-gray-100 hover:text-white transition-colors duration-200"
                  >
                    info@masterclean-care.com
                  </a>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <i className="fas fa-clock mt-1 text-primary-300"></i>
                  <span className="text-gray-100">{t('footer.hours')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">{t('footer.services')}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-gray-100 hover:text-white transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <i className="fas fa-chevron-right text-sm text-primary-300"></i>
                    <span>{t('services.residential')}</span>
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-100 hover:text-white transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <i className="fas fa-chevron-right text-sm text-primary-300"></i>
                    <span>{t('services.commercial')}</span>
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-100 hover:text-white transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <i className="fas fa-chevron-right text-sm text-primary-300"></i>
                    <span>{t('services.deep')}</span>
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-100 hover:text-white transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <i className="fas fa-chevron-right text-sm text-primary-300"></i>
                    <span>{t('services.move')}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">{t('footer.follow')}</h3>
              <div className="space-y-4">
                <a 
                  href={t('footer.whatsapp')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-whatsapp text-xl text-primary-300"></i>
                  <span>WhatsApp</span>
                </a>
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={openPrivacyPolicyModal} 
                    className="block text-gray-100 hover:text-white transition-colors duration-200"
                  >
                    {t('footer.privacyPolicy')}
                  </button>
                  <button 
                    onClick={openTermsAndConditionsModal} 
                    className="block text-gray-100 hover:text-white transition-colors duration-200"
                  >
                    {t('footer.termsAndConditions')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-500/30 text-center">
            <p className="text-gray-100">
              &copy; {new Date().getFullYear()} {t('companyName')}. {t('footer.rights')}
            </p>
          </div>
        </div>

        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50"
            aria-label="Back to top"
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        )}
      </footer>
    </div>
    {/* Removed about-tail div as it's no longer needed with modal approach */}
    </>
  );
}
