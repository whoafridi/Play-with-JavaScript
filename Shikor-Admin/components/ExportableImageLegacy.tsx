import LegacyImage from 'next/image'
import type {
  ImageProps as LegacyImageProps,
  StaticImageData
} from 'next/image'

import exportableLoader from '../libs/next-export-optimize-images/exportableLoader'

const ExportableImageLegacy = (props: LegacyImageProps) => (
  <LegacyImage
    {...props}
    loader={props.loader || exportableLoader}
    blurDataURL={
      props.blurDataURL ||
      (props.placeholder === 'blur' &&
        !props.loader &&
        (typeof (props.src as StaticImageData)?.blurDataURL === 'string'
          ? (props.src as StaticImageData)?.blurDataURL
          : typeof props.src === 'string'
          ? exportableLoader({ src: props.src, width: 8, quality: 10 })
          : typeof (props.src as StaticImageData)?.src === 'string'
          ? exportableLoader({
              src: (props.src as StaticImageData)?.src,
              width: 8,
              quality: 10
            })
          : ''))
    }
  />
)

export * from 'next/image'
export default ExportableImageLegacy
