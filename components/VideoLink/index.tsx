import React from 'react'
import styles from './index.module.css'

type Props = {
  videoId: string
  title: string
  description: string
  thumbnail: string
  onClick?: (videoId: string) => void | null
}

const VideoLink: React.FC<Props> = ({
  videoId = '',
  title = '',
  description = '',
  thumbnail = '',
  onClick = null,
}) => {
  return (
    <section className={styles.root}>
      <a
        href={`/video/${videoId}`}
        className={styles.link}
        onClick={(event: any) => {
          if (onClick) {
            event.preventDefault()
            onClick(videoId)
          }
        }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.desc}>
            {description}
          </p>
        </div>
        <div className={styles.thumbnail}>
          <img src={thumbnail} alt="" />
        </div>
      </a>
      <ul className={styles.action}>
        <li>
          <a
            className={styles.btn}
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icon/icon-youtube.png" alt="Open YouTube" />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default VideoLink
