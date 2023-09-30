import { createHash } from 'crypto'
import fs from 'fs'
import path from 'path'

import sharp from 'sharp'

// import externalImagesDownloader from './external-images'
import type { Config } from '../utils/getConfig'
import getConfig from '../utils/getConfig'
import processManifest from '../utils/processManifest'
import type { Manifest } from './types'
import type { CacheImages } from './utils/cache'
import {
  createCacheDir,
  defaultCacheDir,
  readCacheManifest,
  writeCacheManifest
} from './utils/cache'
import formatValidate from './utils/formatValidate'
import uniqueItems from './utils/uniqueItems'

type GetOptimizeResultProps = {
  destDir: string
  noCache: boolean
  cacheImages: CacheImages
  cacheDir: string
  cacheMeasurement: () => void
  nonCacheMeasurement: () => void
  errorMeasurement: () => void
  pushInvalidFormatAssets: (asset: string) => void
  cliProgressBarIncrement: () => void
  originalFilePath: string
  sharpOptions?: Config['sharpOptions']
} & Manifest[number]
type GetOptimizeResult = (
  getOptimizeResultProps: GetOptimizeResultProps
) => Promise<void>

const getOptimizeResult: GetOptimizeResult = async ({
  destDir,
  noCache,
  cacheImages,
  cacheDir,
  cacheMeasurement,
  nonCacheMeasurement,
  errorMeasurement,
  pushInvalidFormatAssets,
  cliProgressBarIncrement,
  originalFilePath,
  output,
  width,
  quality,
  extension,
  sharpOptions
}) => {
  if (formatValidate(extension)) {
    try {
      const filePath = path.join(destDir, output)
      if (!fs.existsSync(filePath))
        fs.mkdirSync(path.dirname(filePath), { recursive: true })

      const outputPath = path.join(cacheDir, output)
      if (!fs.existsSync(outputPath))
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })

      const imageBuffer = fs.readFileSync(originalFilePath)

      // Cache process
      if (!noCache) {
        const cacheImagesFindIndex = cacheImages.findIndex(
          cacheImage => cacheImage.output === output
        )
        const hash = createHash('sha256')
          .update(imageBuffer)
          .digest('hex')

        if (cacheImagesFindIndex === -1) {
          cacheImages.push({ output, hash })
        } else {
          const currentCacheImage = cacheImages[cacheImagesFindIndex]
          if (currentCacheImage?.hash === hash) {
            fs.copyFileSync(outputPath, filePath)
            cacheMeasurement()
            cliProgressBarIncrement()
            return
          } else {
            if (currentCacheImage !== undefined) currentCacheImage.hash = hash
          }
        }
      }

      const image = sharp(imageBuffer, { sequentialRead: true, animated: true })

      // image.rotate().resize({ width, withoutEnlargement: true })
      image.rotate().resize({ width })

      switch (extension) {
        case 'jpeg':
          await image.jpeg({ quality, ...sharpOptions?.jpg }).toFile(outputPath)
          break
        case 'jpg':
          await image.jpeg({ quality, ...sharpOptions?.jpg }).toFile(outputPath)
          break
        case 'png':
          await image.png({ quality, ...sharpOptions?.png }).toFile(outputPath)
          break
        case 'webp':
          await image
            .webp({ quality, ...sharpOptions?.webp })
            .toFile(outputPath)
          break
        case 'svg':
          await image
            .webp({ quality, ...sharpOptions?.webp })
            .toFile(outputPath)
          break
        // case 'avif':
        //   await image.avif({ quality, ...sharpOptions?.avif }).toFile(outputPath)
        //   break
      }

      fs.copyFileSync(outputPath, filePath)

      nonCacheMeasurement()
      cliProgressBarIncrement()
    } catch (error) {
      console.warn(error)
      cliProgressBarIncrement()
      errorMeasurement()
    }
  } else {
    try {
      const filePath = path.join(destDir, output)
      if (!fs.existsSync(filePath))
        throw new Error(`Path: ${filePath} doesn't exist`)

      fs.copyFileSync(originalFilePath, filePath)

      pushInvalidFormatAssets(originalFilePath)
      cliProgressBarIncrement()
    } catch (error) {
      console.warn(error)
      cliProgressBarIncrement()
      errorMeasurement()
    }
  }
}

const cwd = process.cwd()

type OptimizeImagesProps = {
  manifestJsonPath: string
  noCache: boolean
  config: Config
  terse?: boolean
}

const optimizeImages = async ({
  manifestJsonPath,
  noCache,
  config,
  terse = false
}: OptimizeImagesProps) => {
  const destDir = path.resolve(cwd, config.outDir ?? 'out')

  let manifest: Manifest
  try {
    manifest = uniqueItems(
      processManifest(fs.readFileSync(manifestJsonPath, 'utf-8'))
    )
  } catch (error) {
    throw Error(typeof error === 'string' ? error : 'Unexpected error.')
  }

  // External image if present
  // if (manifest.some(({ externalUrl }) => externalUrl !== undefined)) {
  //   await externalImagesDownloader({ terse, manifest, destDir })
  // }

  if (!terse) console.log(`\n- Image Optimization -`)

  let cacheImages: CacheImages = []

  if (!noCache) {
    await createCacheDir()
    cacheImages = readCacheManifest()
  }

  const promises: Promise<void>[] = []

  let measuredCache = 0
  let measuredNonCache = 0
  let measuredError = 0
  const invalidFormatAssets = new Set<string>([])

  const cacheMeasurement = () => (measuredCache += 1)
  const nonCacheMeasurement = () => (measuredNonCache += 1)
  const errorMeasurement = () => (measuredError += 1)
  const pushInvalidFormatAssets = (asset: string) =>
    invalidFormatAssets.add(asset)

  for (const item of manifest) {
    const originalFilePath = path.join(destDir, item.src)

    promises.push(
      getOptimizeResult({
        destDir,
        noCache,
        cacheImages,
        cacheDir: defaultCacheDir,
        cacheMeasurement,
        nonCacheMeasurement,
        errorMeasurement,
        pushInvalidFormatAssets,
        cliProgressBarIncrement: terse
          ? () => undefined
          : () => process.stdout.write('.'),
        originalFilePath,
        sharpOptions: config.sharpOptions ?? {},
        ...item
      })
    )
  }

  await Promise.all(promises)

  if (!noCache) {
    writeCacheManifest(cacheImages)
  }

  if (!terse) {
    // eslint-disable-next-line no-console
    console.log(
      `\nCache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}, Error assets: ${measuredError}`
    )

    if (invalidFormatAssets.size !== 0) {
      // eslint-disable-next-line no-console
      console.log(
        `\nThe following images are in a non-optimized format and a simple copy was applied.\n`,
        Array.from(invalidFormatAssets).join('\n')
      )
    }

    // eslint-disable-next-line no-console
    console.log('\nSuccessful optimization!')
  }
}

type Run = (args: {
  customManifestJsonPath?: string
  noCache?: boolean
}) => void

export const run: Run = ({ customManifestJsonPath, noCache = false }) => {
  // eslint-disable-next-line no-console
  console.log('\nnext-export-optimize-images: Optimize images.')

  const config = getConfig()
  const manifestJsonPath = path.resolve(
    cwd,
    customManifestJsonPath ?? '.next/custom-optimized-images.nd.json'
  )

  if (fs.existsSync(manifestJsonPath))
    optimizeImages({ manifestJsonPath, noCache, config })
  else {
    // eslint-disable-next-line no-console
    console.log(`\nNo images were found to optimize.
(Maybe you never used the image component.)`)
  }
}
