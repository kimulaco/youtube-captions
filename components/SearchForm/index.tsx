import React, { useState } from 'react'
import styles from './index.module.css'

type Props = {
  id: string,
  value: string,
  placeholder: string
  onSubmit?: (value: string) => void
}

const SearchForm: React.FC<Props> = ({
  id = '',
  value = '',
  placeholder = '',
  onSubmit = () => {}
}) => {
  const [localValue, setLocalValue] = useState<string>(value)

  return (
    <form
      className={styles.root}
      onSubmit={(event: any) => {
        event.preventDefault()
        onSubmit(localValue)
      }}
    >
      <div className={styles.left}>
        <input
          className={styles.input}
          id={id}
          name={id}
          type="text"
          value={localValue}
          placeholder={placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLocalValue(event.target.value)
          }}
        />
      </div>
      <div className={styles.right}>
        <button
          className={styles.btn}
          type="submit"
        >
          <img src="/img/icon/icon-search.svg" alt=""/>
          {/* <SearchIcon /> */}
          <span className={styles.submit}>検索</span>
        </button>
      </div>
    </form>
  )
}

export default SearchForm
