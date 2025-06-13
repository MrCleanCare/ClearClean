import Document, { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { locale } = ctx;

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

    const currentLocale = locale || 'ar';
    const dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
    return {
      ...initialProps,
      locale: currentLocale,
      dir,
    };
  }

  render() {
    const { locale, dir } = this.props;

    return (
      <Html lang={locale} dir={dir}>
        <Head>
          <link rel="preload" as="image" href="/images/hero-bg.avif" />
          {/* Open Graph & Twitter Card meta tags for link preview */}
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          {/* Prevent theme flash of wrong color mode */}
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
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
