const path = require('path')
const fs = require('fs')

const copyConfig = require('./utils/copyConfig')

/** @typedef {{configPath?: string}} Options */
/** @typedef {import('next').NextConfig} NextConfig */

/** @returns {NextConfig} */
const withExportImages = (
  /** @type {NextConfig} */ nextConfig = {},
  /** @type {Options} */ options
) => {
  if (nextConfig.images && nextConfig.images.unoptimized)
    throw Error(
      'The `images.unoptimized` is not supported. If you use this option, consider not using `next-export-optimize-images`.'
    )

  const resolvedConfigPath = path.join(
    __dirname,
    options && options.configPath
      ? options.configPath
      : 'export-images.config.js'
  )
  copyConfig(resolvedConfigPath)
  console.log(
    `info - [next-export-optimize-images]: ${
      fs.existsSync(resolvedConfigPath)
        ? `Configuration loaded from \`${resolvedConfigPath}\`.`
        : `Configuration was not loaded. (This is optional.)`
    }`
  )

  /** @type {NextConfig} */
  const customConfig = {
    images: {
      ...nextConfig.images,
      loader: 'custom'
    }
    // ,
    // webpack(config, option) {
    //   config.resolve.alias['next/image'] =
    //     'next-export-optimize-images/dist/image'
    //   config.resolve.alias['next/legacy/image'] =
    //     'next-export-optimize-images/dist/legacy-image'
    //   delete config.resolve.alias['next']

    //   config.resolve.fallback = { ...config.resolve.fallback, fs: false }

    //   return nextConfig.webpack ? nextConfig.webpack(config, option) : config
    // }
  }

  return Object.assign({}, nextConfig, customConfig)
}

module.exports = withExportImages
