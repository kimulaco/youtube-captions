import React from 'react'
import styles from './index.module.scss'

type Props = {
  value?: string
}

const CaptionField: React.FC<Props> = ({
  value = '',
}) => {
  return (
    <textarea
      className={styles.root}
      value={value}
      readOnly
    />
  )
}

export default CaptionField
