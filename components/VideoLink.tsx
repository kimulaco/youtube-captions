import { useState } from 'react'
import React from 'react'

type Props = {
  videoId: string
  title: string
  description: string
  thumbnail: string
  href: string
  as?: string | null
  onClick: (videoId: string) => void | null
}

const VideoLink: React.FC<Props> = ({
  videoId = '',
  title = '',
  description = '',
  thumbnail = '',
  href = '',
  as = null,
  onClick = null,
}) => {
  return (
    <section className="VideoLink">
      <a
        href={`/video/${videoId}`}
        className="VideoLink_inner w-full rounded-lg overflow-hidden"
        onClick={(event: any) => {
          if (onClick) {
            event.preventDefault()
            onClick(videoId)
          }
        }}
      >
        <div className="VideoLink_content p-sm pb-0">
          <h2 className="VideoLink_title text-lg font-bold leading-tight mb-xs">
            {title}
          </h2>
          <p className="VideoLink_desc leading-tight">
            {description}
          </p>
        </div>
        <div className="VideoLink_thumbnail">
          <img className="VideoLink_thumbnail-img w-full" src={thumbnail} alt="" />
        </div>
      </a>
      <ul className="VideoLink_action px-sm">
        <li>
          <a
            className="VideoLink_btn"
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icon/icon-youtube.png" alt="Open YouTube" />
          </a>
        </li>
      </ul>
      <style jsx>{`
        .VideoLink {
          display: flex;
          width: 100%;
          position: relative;
        }
        .VideoLink_inner {
          display: flex;
          flex-direction: column-reverse;
          justify-content: flex-end;
          padding-bottom: 40px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: 0.3s;
        }
        .VideoLink_inner:active,
        .VideoLink_inner:focus,
        .VideoLink_inner:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .VideoLink_desc {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .VideoLink_thumbnail {
          overflow: hidden;
        }
        .VideoLink_thumbnail-img {
          transition: 0.3s;
        }
        .VideoLink_inner:active .VideoLink_thumbnail-img,
        .VideoLink_inner:focus .VideoLink_thumbnail-img,
        .VideoLink_inner:hover .VideoLink_thumbnail-img {
          transform: scale(1.1);
        }
        .VideoLink_action {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 40px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .VideoLink_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          transition: 0.3s;
        }
        .VideoLink_btn:active,
        .VideoLink_btn:focus,
        .VideoLink_btn:hover {
          transform: scale(1.1);
        }
        .VideoLink_btn img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </section>
  )
}

export default VideoLink
