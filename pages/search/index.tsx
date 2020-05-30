import querystring from 'querystring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { Video } from '../../interfaces/youtube'

export default () => {
  const [videos, setVideos] = useState([])
  const router = useRouter()

  const searchVideos = async (params: any) => {
    const response = await fetch(`/api/search?${querystring.stringify(params)}`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (!router.query.q) {
      return
    }

    const initialize = async () => {
      try {
        const data = await searchVideos(router.query)
        setVideos(data.items)
      } catch (error) {
        console.error(error)
      }
    }
    initialize()
  }, [router.query.q])

  return (
    <Layout path="/search">
      {videos.map((video: Video) => {
        return (
          <section key={video.videoId}>
            <Link href="/video/[id]" as={`/video/${video.videoId}`}>
              <a>
                <div>
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                </div>
                <div>
                  <img src={video.thumbnails.medium.url} alt="" />
                </div>
              </a>
            </Link>
          </section>
        )
      })}
    </Layout>
  )
}
