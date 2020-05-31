import React from 'react'

type Props = {
  videoId: string
}

const YoutubePlayer: React.FC<Props> = ({
  children,
  videoId = '',
}) => {
  return (
    <div className="YoutubePlayer">
      <iframe
        className="YoutubePlayer_iframe"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
      />
      <style jsx>{`
        .YoutubePlayer {
          width: 100%;
          padding-bottom: 56.25%;
          height: 0px;
          position: relative;
        }
        .YoutubePlayer_iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default YoutubePlayer
