import React from 'react'
import styles from './index.module.scss'

type Props = {}

const Heading: React.FC<Props> = ({
  children,
}) => {
  return (
    <h2 className={styles.root}>
      {children}
    </h2>
  )
}

export default Heading
