import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  title?: string,
  path?: string
}

const Layout: React.FC<Props> = ({
  children,
  title = 'YouTube Caption Search',
  path = '/'
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    </Head>

    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 shadow-sm">
        <div className="max-w-screen-md mx-auto py-xs px-md">
          {path === '/'
            ? <h1 className="text-xl text-gray-800">YouTube Caption Search</h1>
            : <p className="text-xl text-gray-800">
              <Link href="/">
                <a>YouTube Caption Search</a>
              </Link>
            </p>
          }
        </div>
      </header>

      <main className="my-xl">
        <div className="max-w-screen-md mx-auto py-xs px-md">
          {children}
        </div>
      </main>

      <footer className="mt-auto">
        <div className="max-w-screen-md mx-auto p-md">
          <p className="text-sm text-gray-600">
            &copy; 2020 YouTube Caption Search.
          </p>
        </div>
      </footer>
    </div>
  </div>
)

export default Layout
