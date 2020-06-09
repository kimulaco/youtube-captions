import React from 'react'
import styles from './index.module.scss'

type Props = {}

const Spinner: React.FC<Props> = ({
  children,
}) => {
  return (
    <p className={styles.root}>
      {children}
    </p>
  )
}

export default Spinner
