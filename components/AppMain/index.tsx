import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css'

type Props = {
  type?: string
}

const AppMain: React.FC<Props> = ({
  children,
  type = '',
}) => {
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        {children}
      </div>
    </main>
  )
}

export default AppMain
