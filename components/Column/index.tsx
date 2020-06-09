import React from 'react'
import styles from './index.module.scss'

type Props = {
  size?: number
  margin?: string
}

const Column: React.FC<Props> = ({
  children,
  size = 4,
  margin = '24px',
}) => {
  return (
    <div className={styles.root} style={{
      width: `calc((100% / ${size}) - ${margin})`,
      margin: `${margin} 0 0 ${margin}`,
    }}>
      {children}
    </div>
  )
}

export default Column
