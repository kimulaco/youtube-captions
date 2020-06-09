import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './index.module.scss'

type Props = {
  videoId: string
  show?: boolean
}

const YoutubePlayer: React.FC<Props> = ({
  videoId = '',
  show = true,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      { isLoaded && show ?
        null :
        <Skeleton height={320} />
      }
      <iframe
        style={{ visibility: isLoaded && show ? 'visible' : 'hidden' }}
        className={styles.iframe}
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        onLoad={() => { setIsLoaded(true) }}
      />
    </div>
  )
}

export default YoutubePlayer
