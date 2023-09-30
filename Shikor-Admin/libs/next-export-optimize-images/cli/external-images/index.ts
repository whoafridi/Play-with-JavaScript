import path from 'path'
import fs from 'fs'

import type { Manifest } from '../types'

type ExternalImagesDownloaderArgs = {
  terse?: boolean
  manifest: Manifest
  destDir: string
}

const externalImagesDownloader = async ({
  terse = false,
  manifest,
  destDir
}: ExternalImagesDownloaderArgs) => {
  if (!terse) {
    // eslint-disable-next-line no-console
    console.log('\n- Download external images -')
  }

  const promises: Promise<void>[] = []
  const downloadedImages: string[] = []

  for (const { src, externalUrl } of manifest) {
    if (externalUrl === undefined) continue

    if (downloadedImages.some(image => image === externalUrl)) continue

    promises.push(
      (async () => {
        downloadedImages.push(externalUrl)

        const outputPath = path.join(destDir, src)
        if (!fs.existsSync(outputPath))
          throw new Error(`Path: ${outputPath} doesn't exist`)

        await new Promise(async (resolve, reject) => {
          try {
            const readStream = await fetch(externalUrl).then(r => r.body)
            const writeStream = fs.createWriteStream(outputPath)

            // readStream.pipe(writeStream)

            writeStream.on('finish', () => {
              if (!terse) {
                // eslint-disable-next-line no-console
                console.log(`\`${externalUrl}\` has been downloaded.`)
              }
              resolve(undefined)
            })
          } catch (e) {
            reject(e)
          }
        })
      })()
    )
  }

  await Promise.all(promises)
}

// export default externalImagesDownloader
