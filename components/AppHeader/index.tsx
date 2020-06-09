import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'

type Props = {
  path?: string
}

const AppFooter: React.FC<Props> = ({
  path = '',
}) => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        {path === '/'
          ? <h1 className={styles.title}>YouTube Captions</h1>
          : <p className={styles.title}>
            <Link href="/">
              <a>YouTube Captions</a>
            </Link>
          </p>
        }
        <p className={styles.icon}>
          <a
            href="https://github.com/kimulaco/youtube-captions"
            target="_blank"
            rel="noopener noreferrer"
          ><img src="/img/icon/icon-github.svg" alt="Github"/></a>
        </p>
      </div>
    </header>
  )
}

export default AppFooter
