import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { Video } from '../../interfaces/youtube'

export default () => {
  const [videoId, setVideoId] = useState<string>('')
  const [video, setVideo] = useState<Video | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const videoId = Array.isArray(router.query.id)
      ? router.query.id[0]
      : router.query.id
    const initialize = async () => {
      const { data } = await axios.get(`/api/video/${router.query.id}`)
      setVideo(data.video)
    }
    setVideoId(videoId)
    initialize()
  }, [router.query.id])

  return (
    <Layout path="/video/">
      { video && <div>
        <h1>{video?.title || ''}</h1>
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
        <p>{video?.description || ''}</p>
      </div>}
    </Layout>
  )
}
