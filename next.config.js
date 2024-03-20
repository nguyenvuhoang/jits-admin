/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const { i18n } = require("./next-i18next.config");

module.exports = nextConfig
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})


module.exports = withNextra({
  trailingSlash: true,
  reactStrictMode: false,
  i18n,
  productionBrowserSourceMaps: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    return config
  }
})
