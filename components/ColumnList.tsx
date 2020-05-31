import React from 'react'

type Props = {
  margin?: string
}

const ColumnList: React.FC<Props> = ({
  children,
  margin = '24px'
}) => {
  return (
    <div className="ColumnList">
      <div className="ColumnList_inner flex flex-wrap">
        {children}
      </div>
      <style jsx>{`
        .ColumnList_inner {
          margin: -${margin} 0 0 -${margin};
        }
      `}</style>
    </div>
  )
}

export default ColumnList
