import React from 'react'
import styles from './index.module.scss'

type Props = {
  type?: string
}

const AppMain: React.FC<Props> = ({
  children,
  type = '',
}) => {
  return (
    <main className={styles.root}>
      <div className={styles[type === 'small' ? 'inner-small' : 'inner']}>
        {children}
      </div>
    </main>
  )
}

export default AppMain
