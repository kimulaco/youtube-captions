import querystring from 'querystring'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default () => {
  const [videoId, setVideoId] = useState('')
  const [video, setVideo] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    setVideoId(router.query.id)
    const initialize = async () => {
      const { data } = await axios.get(`/api/video/${router.query.id}`)
      setVideo(data.video)
    }
    initialize()
  }, [router.query.id])

  return (
    <Layout>
      { video && <div>
        <h1>{video.title || ''}</h1>
        <iframe
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        />
        <p>{video.description || ''}</p>
      </div>}
    </Layout>
  )
}
