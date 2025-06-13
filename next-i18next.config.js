module.exports = {
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  ns: ['common', 'translation'],
  defaultNS: 'translation',
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
};
