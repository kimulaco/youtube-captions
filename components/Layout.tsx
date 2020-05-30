import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({
  children,
  title = 'YouTube Caption Search',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    </Head>

    <header>
      <div>
        <h1>YouTube Caption Search</h1>
      </div>
    </header>

    <main>
      <div>
        {children}
      </div>
    </main>

    <footer>
      <div>
        <p>&copy; 2020 YouTube Caption Search.</p>
      </div>
    </footer>
  </div>
)

export default Layout
