import Image from 'next/future/image'
import type { ImageProps, StaticImageData } from 'next/future/image'

import exportableLoader from '../libs/next-export-optimize-images/exportableLoader'

const ExportableImage = (props: ImageProps) => (
  <Image
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

export * from 'next/future/image'
export default ExportableImage
