/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mastercleancare.sa',
  generateRobotsTxt: false, // We already have a custom robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500', '/api/*'],
  alternateRefs: [
    {
      href: 'https://mastercleancare.sa',
      hreflang: 'x-default',
    },
    {
      href: 'https://mastercleancare.sa/ar',
      hreflang: 'ar',
    },
    {
      href: 'https://mastercleancare.sa/en',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
};
