import { useEffect, useState } from 'react'

export const isServer = typeof window === 'undefined'

export const useIsServer = () => {
  const [isSSR, setIsServer] = useState(true)

  useEffect(() => {
    if (!isServer) setIsServer(false)
  }, [])

  return isSSR
}

export const imageSizes = {
  // (max-width: 576px) 95vw, (max-width: 768px) 95vw, (max-width: 992px) 48vw, (max-width: 1200px) 48vw, (max-width: 1400px) 48vw, 1320px',
  md_6_col: '(max-width: 768px) 95vw, (max-width: 1400px) 48vw, 1320px',
  md_6_lg_4_col:
    '(max-width: 768px) 95vw, (max-width: 1200px) 48vw, (max-width: 1400px) 32vw, 1320px'
}

export const PopUpKey = 'emergency'
export const PopUpKeyValue = 'true'
