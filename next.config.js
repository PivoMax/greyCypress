/** @type {import('next').NextConfig} */
const redirects = require('./redirects');
const { patchWebpackConfig } = require('next-global-css');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

const nextConfig = {
  reactStrictMode: true,
  env: {
    CMS_CONTENTFUL_DELIVERY_API_KEY:
      process.env.CMS_CONTENTFUL_DELIVERY_API_KEY,
    CMS_CONTENTFUL_PREVIEW_API_KEY: process.env.CMS_CONTENTFUL_PREVIEW_API_KEY,
    CMS_CONTENTFUL_ENDPOINT: `https://graphql.contentful.com/content/v1/spaces/${process.env.CMS_CONTENTFUL_SPACE_ID}/environments/${process.env.CMS_CONTENTFUL_ENV_ID}`,
    GA_GTM_SCRIPT_PARAMS: process.env.GA_GTM_SCRIPT_PARAMS,
    GA_API_KEY: process.env.GA_API_KEY,
    OT_ACCOUNT_ID: process.env.OT_ACCOUNT_ID,
    HOST_PUBLIC: process.env.HOST_PUBLIC,
    SITEMAP_MAXAGE: process.env.SITEMAP_MAXAGE,
  },
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  optimizeFonts: false,
  webpack: (config, options) => {
    if (process.env.CYPRESS === 'true') {
      //Allows importing the global.css file in cypress/support/component.ts
      patchWebpackConfig(config, options);
    }
    return config;
  },
};
module.exports = nextConfig;
