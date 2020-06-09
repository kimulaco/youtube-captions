import React from 'react'
import styles from './index.module.scss'

type Props = {
  margin?: string
}

const ColumnList: React.FC<Props> = ({
  children,
  margin = '24px'
}) => {
  return (
    <div>
      <div
        className={styles.inner}
        style={{ margin: `-${margin} 0 0 -${margin}` }}
      >
        {children}
      </div>
    </div>
  )
}

export default ColumnList
