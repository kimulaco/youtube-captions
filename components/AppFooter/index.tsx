import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css'

type Props = {}

const AppFooter: React.FC<Props> = ({}) => {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          &copy; 2020 YouTube Captions, created by <a className={styles.link} href="https://twitter.com/kimulaco" target="_blank" rel="noopener noreferrer">@kimulaco</a>.
        </p>
      </div>
    </footer>
  )
}

export default AppFooter
