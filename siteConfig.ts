/**
 * @file siteConfig.ts
 * @description This file contains the main configuration for the website.
 * It centralizes various settings to allow for easy customization and templating.
 * All values here should be replaced with your specific website details.
 */

export const siteConfig = {
  // Company Information
  companyName: "Your Company Name", // Replace with your company's name
  companySlogan: "Your Company Slogan Here", // A short slogan or tagline for your company
  phoneNumbers: ["+1234567890"], // Replace with your company's phone numbers (can be multiple)
  email: "info@yourcompany.com", // Replace with your company's email
  address: "Your Company Address", // Replace with your company's address (general)
  addressDetails: { // Detailed address for structured data (e.g., Schema.org)
    streetAddress: "Your Street Address",
    addressLocality: "Your City",
    postalCode: "Your Postal Code",
    addressCountry: "Your Country Code (e.g., US, SA)",
  },
  websiteUrl: "https://www.yourcompany.com", // Your company's website URL

  // Geographic Coordinates for Schema.org
  geoCoordinates: {
    latitude: 0.0, // Replace with your company's latitude
    longitude: 0.0, // Replace with your company's longitude
  },

  // Branding & Assets
  logoLight: "/images/logo-light.avif", // Path to your light mode logo
  logoDark: "/images/logo-dark.avif", // Path to your dark mode logo
  heroBackgroundImage: "/images/hero-bg.avif", // Path to the hero section background image
  heroImageAlt: "Your Company Name - Professional Service", // Alt text for the hero background image
  
  // SEO Metadata
  siteTitle: "Your Website Title", // Main title for the website, used in browser tabs and search results
  siteDescription: "A brief description of your website for SEO purposes.", // Meta description for search engines
  siteKeywords: "keyword1, keyword2, keyword3", // Keywords for SEO
  ogImage: "/images/og-image.avif", // Open Graph image for social media sharing

  // Social Media Links
  socialLinks: {
    facebook: "https://facebook.com/yourcompany", // Your company's Facebook page URL
    twitter: "https://twitter.com/yourcompany",   // Your company's Twitter profile URL
    instagram: "https://instagram.com/yourcompany", // Your company's Instagram profile URL
    linkedin: "https://linkedin.com/company/yourcompany", // Your company's LinkedIn profile URL
    whatsapp: "https://wa.me/1234567890", // Your company's WhatsApp link
    // Add more social media links as needed (e.g., tiktok, snapchat)
  },

  // Navigation Links
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    // Add more navigation links as needed
  ],

  // Internationalization (i18n)
  defaultLang: "en", // Default language for the website (e.g., "en", "ar")
  direction: "ltr", // Text direction: "ltr" for Left-to-Right, "rtl" for Right-to-Left

  // API Endpoints
  apiEndpoints: {
    contactForm: "/api/contact", // Endpoint for the contact form submission
    // Add more API endpoints as needed
  },

  // Theme Configuration (Example - adjust as per your Tailwind CSS setup)
  theme: {
    primaryColor: "#007bff", // Example primary color
    secondaryColor: "#6c757d", // Example secondary color
    fontFamily: "Arial, sans-serif", // Example font family
  },

  // Features Toggle
  features: {
    darkMode: true, // Enable/disable dark mode toggle
    notifications: true, // Enable/disable site-wide notifications
    analytics: false, // Enable/disable analytics tracking
  },

  // Website Version
  version: "1.0.0", // Current version of the template
  
  // Content Sections (Dynamic content for various sections of the website)
  services: [
    {
      name: "Residential Cleaning",
      description: "Comprehensive cleaning services for homes and apartments, ensuring a spotless and healthy living environment.",
      image: "/images/residential.avif",
      icon: "🏠"
    },
    {
      name: "Commercial Cleaning",
      description: "Professional cleaning solutions for offices, businesses, and commercial spaces, maintaining a pristine work environment.",
      image: "/images/commercial.avif",
      icon: "🏢"
    },
    {
      name: "Deep Cleaning",
      description: "Intensive cleaning services that go beyond the surface, tackling grime and dirt in every corner for a truly fresh space.",
      image: "/images/deep-cleaning.avif",
      icon: "✨"
    },
    {
      name: "Move In/Out Cleaning",
      description: "Thorough cleaning for properties before moving in or after moving out, ensuring a clean slate for new occupants.",
      image: "/images/move-cleaning.avif",
      icon: "📦"
    },
    {
      name: "Water Tank Cleaning",
      description: "Specialized cleaning and disinfection of water tanks to ensure clean and safe water supply.",
      image: "/images/tank-cleaning.avif",
      icon: "🛢️"
    },
    {
      name: "Pest Control",
      description: "Effective pest management solutions to eliminate and prevent infestations, ensuring a pest-free environment.",
      image: "/images/pest-control.avif",
      icon: "🐜"
    },
    {
      name: "Steam Cleaning",
      description: "Eco-friendly steam cleaning for carpets, upholstery, and hard surfaces, removing dirt and sanitizing without harsh chemicals.",
      image: "/images/steam-cleaning.avif",
      icon: "🛋️"
    },
    {
      name: "AC Duct Cleaning",
      description: "Cleaning and sanitization of air conditioning ducts to improve air quality and system efficiency.",
      image: "/images/ac-cleaning.avif",
      icon: "❄️"
    },
    {
      name: "Marble Polishing",
      description: "Professional marble polishing services to restore the shine and elegance of your marble floors and surfaces.",
      image: "/images/marble-polishing.avif",
      icon: "🪞"
    },
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      content: "The team provided an exceptional deep cleaning service for my home. Every corner was spotless, and they paid attention to every detail. Highly recommended for anyone looking for thorough and reliable cleaning!",
      author: "Sarah M.",
      date: "2024-03-15",
    },
    {
      id: 2,
      rating: 5,
      content: "I used their commercial cleaning service for my office, and I'm extremely impressed. The space looks brand new, and the team was efficient and professional. Our employees appreciate the clean environment.",
      author: "Ahmed K.",
      date: "2024-02-28",
    },
    {
      id: 3,
      rating: 5,
      content: "Their move-out cleaning service was a lifesaver! They made sure the apartment was immaculate, which helped me get my full deposit back. Very reliable and great value for money.",
      author: "Fatima A.",
      date: "2024-01-20",
    },
  ],
  faqs: [
    {
      question: "What cleaning services do you offer?",
      answer: "We offer house cleaning, office cleaning, deep cleaning, move-in/move-out cleaning, and more."
    },
    {
      question: "Do you use eco-friendly products?",
      answer: "Yes, we use safe and eco-friendly cleaning products."
    },
    {
      question: "How can I book a service?",
      answer: "You can book through the website or contact us directly."
    },
    {
      question: "What are your business hours?",
      answer: "We operate from 8 AM to 5 PM, Sunday to Thursday and Saturday."
    }
  ],
};
