import querystring from 'querystring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import SearchForm from '../../components/SearchForm'
import ColumnList from '../../components/ColumnList'
import Column from '../../components/Column'
import VideoLink from '../../components/VideoLink'
import { Video } from '../../interfaces/youtube'
import { queryToString } from '../../utils/'

export default () => {
  const [keyword, setKeyword] = useState<string>('')
  const [videos, setVideos] = useState<Video[]>([])
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

    setKeyword(queryToString(router.query.q))

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
      <div className="mb-xl">
        <SearchForm
          id="q"
          value={keyword}
          placeholder="カンファレンス..."
          onSubmit={(value: string) => {
            router.push(`/search?q=${value}`)
          }}
        />
      </div>
      <ColumnList>
        {videos.map((video: Video) => {
          return (
            <Column key={video.videoId}>
              <VideoLink
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnails.medium.url}
              />
            </Column>
          )
        })}
      </ColumnList>
    </Layout>
  )
}
