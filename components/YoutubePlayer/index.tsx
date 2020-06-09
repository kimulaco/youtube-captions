import React from 'react'
import styles from './index.module.css'

type Props = {
  videoId: string
}

const YoutubePlayer: React.FC<Props> = ({
  videoId = '',
}) => {
  return (
    <div className={styles.root}>
      <iframe
        className={styles.iframe}
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
      />
    </div>
  )
}

export default YoutubePlayer
