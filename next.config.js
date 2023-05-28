/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const { i18n } = require("./next-i18next.config");

module.exports = nextConfig
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  i18n,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    return config
  }
}
