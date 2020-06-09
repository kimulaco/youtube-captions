import React from 'react'
import styles from './index.module.css'

type Props = {
  id?: string
  value?: string
  checked?: boolean
  onChange?: (value: string) => void
}

const RadioButton: React.FC<Props> = ({
  children,
  id = '',
  value = '',
  checked = false,
  onChange = () => {},
}) => {
  return (
    <label>
      <input
        type="radio"
        id={id}
        name={id}
        value={value}
        checked={checked}
        onChange={() => {
          if (typeof onChange === 'function') onChange(value)
        }}
      />
      <span className={styles.label}>{children}</span>
    </label>
  )
}

export default RadioButton
