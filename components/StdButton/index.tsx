import React from 'react'
import styles from './index.module.scss'

type Props = {
  onClick?: () => void
}

const StdButton: React.FC<Props> = ({
  children,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      className={styles.root}
      onClick={() => {
        if (typeof onClick === 'function') onClick()
      }}
    >
      {children}
    </button>
  )
}

export default StdButton
