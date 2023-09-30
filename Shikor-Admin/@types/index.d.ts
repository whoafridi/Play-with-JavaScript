import 'react'

declare global {
  interface Window {}

  declare module '*.css' {
    const content: any

    export default content
  }

  declare module '*.svg' {
    const content: import('next/dist/client/image').StaticImageData

    export default content
  }

  namespace React {
    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
      referrerPolicy?: 'no-referrer' | 'origin' | 'unsafe-url'
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
      loading?: 'eager' | 'lazy'
    }

    interface HTMLAttributes<T> {
      page_id?: string
      attribution?: string
    }

    interface FunctionComponent<P = {}> {
      Layout?: React.FC<P>
      isPos?: boolean
    }
  }
}
