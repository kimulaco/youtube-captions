import { useState } from 'react'
import React from 'react'
import SearchIcon from '../assets/img/icon-search.svg'

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
      className="flex items-end relative"
      onSubmit={(event: any) => {
        event.preventDefault()
        onSubmit(localValue)
      }}
    >
      <div className="w-full">
        <input
          className="block h-12 w-full p-sm border rounded"
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
      <div className="h-12 absolute right-0 bottom-0">
        <button
          className="h-12 px-xs"
          type="submit"
        >
          <SearchIcon />
          <span className="hidden">検索</span>
        </button>
      </div>
    </form>
  )
}

export default SearchForm
