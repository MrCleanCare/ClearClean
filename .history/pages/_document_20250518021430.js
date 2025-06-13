import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // Next.js provides the locale on __NEXT_DATA__
    const currentLocale = this.props.__NEXT_DATA__.locale || 'en';
    const dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
    return (
      <Html lang={currentLocale} dir={dir}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 