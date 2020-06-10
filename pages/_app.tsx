import { useEffect } from 'react'
import Router from 'next/router'
import { sendPageview } from '../utils/ga'
import '../assets/css/main.scss'

export default ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendPageview(url)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
