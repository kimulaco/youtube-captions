import * as React from 'react'
import Head from 'next/head'
import AppHeader from '../AppHeader/'
import AppMain from '../AppMain/'
import AppFooter from '../AppFooter/'
import styles from './index.module.scss'

type Props = {
  title?: string,
  path?: string
  type?: string
}

const Layout: React.FC<Props> = ({
  children,
  title = 'YouTube Captions',
  path = '/',
  type = '',
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    </Head>

    <div className={styles.root}>
      <AppHeader path={path} />

      <AppMain type={type}>
        {children}
      </AppMain>

      <AppFooter />
    </div>
  </>
)

export default Layout
