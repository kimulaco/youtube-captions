import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './index.module.scss'

type Props = {
  videoId: string | undefined
  title: string | undefined
  description: string | undefined
  thumbnail: string | undefined
  onClick?: (videoId: string) => void | null
}

const VideoLink: React.FC<Props> = ({
  videoId = undefined,
  title = undefined,
  description = undefined,
  thumbnail = undefined,
  onClick = null,
}) => {
  return (
    <section className={styles.root}>
      <a
        href={videoId ? `/video/${videoId}` : null}
        className={styles.link}
        onClick={(event: any) => {
          if (onClick && videoId) {
            event.preventDefault()
            onClick(videoId)
          }
        }}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>
            {typeof title === 'undefined' ?
              <Skeleton /> :
              title
            }
          </h2>
          <p className={styles.desc}>
            {typeof description === 'undefined' ?
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </> :
              description
            }
          </p>
        </div>
        <div className={styles.thumbnail}>
            {typeof thumbnail === 'undefined' ?
              <Skeleton height={127} /> :
              <img src={thumbnail} alt="" />
            }
        </div>
      </a>
      <ul className={styles.action}>
        <li>
          { typeof videoId === 'undefined' ?
            <Skeleton width={24} height={24} /> :
            <a
              className={styles.btn}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/icon/icon-youtube.png" alt="Open YouTube" />
            </a>
          }
        </li>
      </ul>
    </section>
  )
}

export default VideoLink
