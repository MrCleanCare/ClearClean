// components/Layout.js
// This component provides a consistent layout for all pages, including header, footer, and global elements.
// It also handles scroll-based active section highlighting and back-to-top functionality.

import { useTranslation } from 'next-i18next';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaSnapchatGhost, FaTiktok } from 'react-icons/fa'; // Import social media icons
import { ThemeContext } from '../pages/_app'; // Correct path to ThemeContext
import { siteConfig } from '../siteConfig'; // Import site configuration
import AboutSection from './AboutSection'; // Import AboutSection (for modal content)

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
  const { t } = useTranslation('translation'); // For internationalization
  const [activeSection, setActiveSection] = useState(''); // State for active section in navigation
  const { isDark, mounted: themeMounted } = useContext(ThemeContext); // Theme context for dark mode
  const [mounted, setMounted] = useState(false); // Component mount state

  // Ensure component is mounted before rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to handle scroll-based active section highlighting and URL hash updates
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      // Define sections to track for navigation highlighting
      const sections = ['services', 'reviews', 'satisfaction', 'faq', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight / 3); // Offset for better active section detection

      const currentActiveSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset;
        return scrollPosition >= offsetTop && scrollPosition < (offsetTop + rect.height);
      });

      if (currentActiveSection && currentActiveSection !== activeSection) {
        setActiveSection(currentActiveSection);
        // Update URL hash without causing a scroll jump
        const url = new URL(window.location);
        url.hash = currentActiveSection;
        window.history.replaceState({}, '', url);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [mounted, activeSection]); // Re-run when mounted or activeSection changes

  // Handle smooth scrolling for anchor links (e.g., from navigation)
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    const headerHeight = document.querySelector('header')?.offsetHeight || 0; // Account for fixed header height
    
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // State and effect for "Back to Top" button visibility
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setShowTop(window.scrollY > 300); // Show button after scrolling 300px
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  // Don't render anything until both component and theme are mounted to prevent layout shifts
  if (!mounted || !themeMounted) {
    return null;
  }

  return (
    <>
      {/* Head component for Schema.org structured data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CleaningService", // Or LocalBusiness, Organization, etc.
              "name": siteConfig.companyName,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.addressDetails.streetAddress,
                "addressLocality": siteConfig.addressDetails.addressLocality,
                "postalCode": siteConfig.addressDetails.postalCode,
                "addressCountry": siteConfig.addressDetails.addressCountry,
              },
              "telephone": siteConfig.phoneNumbers, // Array of phone numbers
              "url": siteConfig.websiteUrl,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": siteConfig.geoCoordinates.latitude,
                "longitude": siteConfig.geoCoordinates.longitude,
              },
              // Add more properties as needed, e.g., "openingHours", "priceRange", "image"
            })
          }}
        />
      </Head>
      {/* Main container for the entire layout */}
      <div className="min-h-screen flex flex-col">
        {/* Header section with fixed positioning and styling */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 via-primary-100/30 to-primary-50/50 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-primary-900/30"></div>
          <nav className="container mx-auto px-4 py-4 relative">
            <div className="flex flex-wrap justify-between items-center gap-4 md:gap-8">
              {/* Logo and Company Name */}
              <Link href="/" className="flex items-center text-2xl font-bold text-primary-600 dark:text-primary-400 hover:opacity-90 transition-all duration-300">
                <Image
                  src={isDark ? siteConfig.logoDark : siteConfig.logoLight} // Dynamic logo based on theme
                  alt={`${siteConfig.companyName} - ${siteConfig.companySlogan}`} // Dynamic alt text
                  width={120}
                  height={48}
                  priority
                  className="h-10 w-auto hover:transform hover:scale-105 transition-transform duration-300"
                  style={{display: 'block'}}
                  unoptimized={true}
                />
              </Link>
              {/* Navigation Links */}
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href.startsWith('/') ? link.href : `#${link.href}`} // Handle internal and anchor links
                    onClick={(e) => link.href.startsWith('#') ? handleSmoothScroll(e, link.href.substring(1)) : null}
                    className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium ${
                      activeSection === link.href.substring(1) ? 'font-bold text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' : ''
                    }`}
                  >
                    {t(`nav.${link.name.toLowerCase().replace(/\s/g, '')}`)} {/* Use i18n for nav names */}
                  </Link>
                ))}
                {/* Special handling for About Us and Contact if they open modals or scroll to sections */}
                {/* Example for About Us opening a modal */}
                <button
                  onClick={() => {
                    const content = <AboutSection />;
                    openModal(t('nav.aboutus'), content); // Use i18n key for About Us
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
                >
                  {t('nav.aboutus')}
                </button>
                {/* Example for Contact scrolling to section */}
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
                {/* Language and Theme Toggles */}
                <div className="flex items-center gap-4">
                  <LanguageToggle />
                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Main content area, with padding to account for fixed header */}
        <main className="flex-grow pt-[72px]">
          {children}
        </main>

        {/* Footer section with dynamic content */}
        <footer className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16 relative">
          {/* Decorative background grid */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{t('footer.contact')}</h3>
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <i className="fas fa-map-marker-alt mt-1 text-primary-300"></i>
                    <a 
                      href={`https://maps.google.com/?q=${siteConfig.geoCoordinates.latitude},${siteConfig.geoCoordinates.longitude}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      {siteConfig.address} {/* General address from siteConfig */}
                    </a>
                  </div>
                  {/* Phone Numbers */}
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <i className="fas fa-phone mt-1 text-primary-300"></i>
                    <div className="space-y-1">
                      {siteConfig.phoneNumbers.map((number, index) => (
                        <a 
                          key={index}
                          href={`tel:${number.replace(/\s/g, '')}`} // Remove spaces for tel: link
                          className="block text-gray-100 hover:text-white transition-colors duration-200"
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <i className="fas fa-envelope mt-1 text-primary-300"></i>
                    <a 
                      href={`mailto:${siteConfig.email}`} 
                      className="text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  {/* Business Hours (still using i18n) */}
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <i className="fas fa-clock mt-1 text-primary-300"></i>
                    <span className="text-gray-100">{t('footer.hours')}</span>
                  </div>
                </div>
              </div>

              {/* Services Section (still using i18n for service names) */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{t('footer.services')}</h3>
                <ul className="space-y-3">
                  {/* These can be made dynamic from siteConfig.services if implemented */}
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

              {/* Follow Us / Social Media Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{t('footer.follow')}</h3>
                <div className="space-y-4">
                  {/* Dynamically render social media links from siteConfig */}
                  {siteConfig.socialLinks.facebook && (
                    <a 
                      href={siteConfig.socialLinks.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaFacebook className="text-xl text-primary-300" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {siteConfig.socialLinks.twitter && (
                    <a 
                      href={siteConfig.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaTwitter className="text-xl text-primary-300" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {siteConfig.socialLinks.instagram && (
                    <a 
                      href={siteConfig.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaInstagram className="text-xl text-primary-300" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {siteConfig.socialLinks.linkedin && (
                    <a 
                      href={siteConfig.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaLinkedin className="text-xl text-primary-300" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {siteConfig.socialLinks.whatsapp && (
                    <a 
                      href={siteConfig.socialLinks.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaWhatsapp className="text-xl text-primary-300" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {/* Add more social media links here if needed, e.g., Snapchat, TikTok */}
                  {siteConfig.socialLinks.snapchat && (
                    <a 
                      href={siteConfig.socialLinks.snapchat} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaSnapchatGhost className="text-xl text-primary-300" />
                      <span>Snapchat</span>
                    </a>
                  )}
                  {siteConfig.socialLinks.tiktok && (
                    <a 
                      href={siteConfig.socialLinks.tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center space-x-3 rtl:space-x-reverse text-gray-100 hover:text-white transition-colors duration-200"
                    >
                      <FaTiktok className="text-xl text-primary-300" />
                      <span>TikTok</span>
                    </a>
                  )}

                  <div className="pt-4 space-y-3">
                    {/* Privacy Policy and Terms & Conditions buttons */}
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

            {/* Copyright Information */}
            <div className="mt-12 pt-8 border-t border-primary-500/30 text-center">
              <p className="text-gray-100">
                &copy; {new Date().getFullYear()} {siteConfig.companyName}. {t('footer.rights')}
              </p>
            </div>
          </div>

          {/* Back to Top Button */}
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
    </>
  );
}
