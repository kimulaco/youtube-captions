import querystring from 'querystring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import ColumnList from '../../components/ColumnList'
import Column from '../../components/Column'
import VideoLink from '../../components/VideoLink'
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
        console.log(data.items)
      } catch (error) {
        console.error(error)
      }
    }
    initialize()
  }, [router.query.q])

  return (
    <Layout path="/search">
      <ColumnList>
        {videos.map((video: Video) => {
          return (
            <Column key={video.videoId}>
              <VideoLink
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnails.medium.url}
                href="/video/[id]"
                as={`/video/${video.videoId}`}
              />
            </Column>
          )
        })}
      </ColumnList>
    </Layout>
  )
}
