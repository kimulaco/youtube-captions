import React from 'react'

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
    <div className="Column">
      {children}
      <style jsx>{`
        .Column {
          display: flex;
          width: calc((100% / ${size}) - ${margin});
          margin: ${margin} 0 0 ${margin};
        }
      `}</style>
    </div>
  )
}

export default Column
