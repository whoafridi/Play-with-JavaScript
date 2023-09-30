const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withExportImages = require('./libs/next-export-optimize-images/withExportImages')

/**
 * @param {string} phase
 * @param {{defaultConfig: import('next').NextConfig}} config
 */
const nextConfig = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? '' : '/',
    poweredByHeader: false,
    serverRuntimeConfig: {},
    trailingSlash: true,
    images: {
      dangerouslyAllowSVG: true,
      // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      // deviceSizes: [576, 768, 992, 1200, 1400],
      deviceSizes: [540, 720, 960, 1140, 1320],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },
    swcMinify: true,
    experimental: {
      newNextLinkBehavior: true,
      forceSwcTransforms: true,
      swcMinify: true,
      // optimizeCss: true
      swcFileReading: true
    }
  }

  return withExportImages(nextConfig)
}

module.exports = nextConfig
