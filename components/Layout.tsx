import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  title?: string,
  path?: string
}

const Layout: React.FC<Props> = ({
  children,
  title = 'YouTube Captions',
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
        <div
          className="max-w-screen-lg mx-auto py-xs px-md flex justify-between items-center"
        >
          {path === '/'
            ? <h1 className="text-xl text-gray-800">YouTube Captions</h1>
            : <p className="text-xl text-gray-800">
              <Link href="/">
                <a>YouTube Captions</a>
              </Link>
            </p>
          }
          <p style={{
            width: '24px'
          }}>
            <a
              href="https://github.com/kimulaco/youtube-captions"
              target="_blank"
              rel="noopener noreferrer"
            ><img src="/img/icon/icon-github.svg" alt="Github"/></a>
          </p>
        </div>
      </header>

      <main className="my-xl">
        <div className="max-w-screen-lg mx-auto py-xs px-md">
          {children}
        </div>
      </main>

      <footer className="mt-auto">
        <div className="max-w-screen-lg mx-auto p-md">
          <p className="text-sm text-gray-600">
            &copy; 2020 YouTube Captions, created by <a className="underline" href="https://twitter.com/kimulaco" target="_blank" rel="noopener noreferrer">@kimulaco</a>.
          </p>
        </div>
      </footer>
    </div>
  </div>
)

export default Layout
