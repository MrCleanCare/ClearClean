// pages/_document.js
// This file is used to augment your application's <html> and <body> tags.
// It's useful for setting up global HTML attributes like lang and dir, and for injecting custom scripts.

import Document, { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '../siteConfig'; // Import site configuration

class MyDocument extends Document {
  // getInitialProps is used to load data for the document before rendering
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { locale } = ctx;

    // Load translations (though this might be better handled in _app.js or components)
    let translations = {};
    try {
      const enPath = path.resolve(process.cwd(), 'public/locales/en/translation.json');
      const arPath = path.resolve(process.cwd(), 'public/locales/ar/translation.json');
      const enTranslation = JSON.parse(fs.readFileSync(enPath, 'utf8'));
      const arTranslation = JSON.parse(fs.readFileSync(arPath, 'utf8'));
      translations = { en: enTranslation, ar: arTranslation };
    } catch (error) {
      console.error('Error loading translations in _document.js:', error);
    }

    // Determine current locale and text direction
    const currentLocale = locale || siteConfig.defaultLang; // Use siteConfig default language
    const dir = siteConfig.direction; // Use siteConfig for global direction

    return {
      ...initialProps,
      locale: currentLocale,
      dir,
    };
  }

  // Render method for the document structure
  render() {
    const { locale, dir } = this.props;

    return (
      // Set HTML language and direction based on detected locale and siteConfig
      <Html lang={locale} dir={dir}>
        <Head>
          {/* Preload hero background image for faster loading */}
          <link rel="preload" as="image" href="/images/hero-bg.avif" />
          
          {/* Open Graph & Twitter Card meta tags for link preview (can be overridden in _app.js or individual pages) */}
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          
          {/* Script to prevent theme flash of wrong color mode on page load */}
          <script defer dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }} />
        </Head>
        {/* Apply antialiased class to body for smoother font rendering */}
        <body className="antialiased">
          <Main /> {/* Main content of the application */}
          <NextScript /> {/* Next.js scripts for hydration and functionality */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
