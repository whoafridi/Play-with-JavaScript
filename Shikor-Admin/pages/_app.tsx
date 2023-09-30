import type { AppProps } from 'next/app'

import '../assets/css/animate.css.css'
import '../assets/css/bootstrap.css'
import '../assets/css/style.css'
import '../assets/css/all.css'

const RosetechSiteApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { Layout } = Component as React.FunctionComponent

  const App = <Component {...pageProps} />

  if (Layout) return <Layout>{App}</Layout>
  return App
}

export default RosetechSiteApp
