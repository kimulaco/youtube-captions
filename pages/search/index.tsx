import querystring from 'querystring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroller';
import Layout from '../../components/Layout/'
import SearchForm from '../../components/SearchForm/'
import ColumnList from '../../components/ColumnList/'
import Column from '../../components/Column/'
import VideoLink from '../../components/VideoLink/'
import Spinner from '../../components/Spinner/'
import { Video } from '../../interfaces/youtube'
import { queryToString } from '../../utils/'
import { delayFetch } from '../../utils/fetcher'
import { sendEvent } from '../../utils/ga'

export default () => {
  const [keyword, setKeyword] = useState<string>('')
  const [videos, setVideos] = useState<Video[]>(Array(12).fill({}))
  const [nextPageToken, setNextPageToken] = useState<string>('')
  const router = useRouter()

  const updateVideos = async (params: any) => {
    if (!params.q) {
      return
    }

    setKeyword(queryToString(params.q))

    try {
      const data = await delayFetch(
        `/api/search?${querystring.stringify({
          ...params,
          pageToken: nextPageToken || null,
        })}`
      )

      if (!data.items) {
        throw data
      }

      if (videos[0].videoId) {
        setVideos(videos.concat(data.items))
      } else {
        setVideos(data.items)
      }

      setNextPageToken(data.nextPageToken || '')
    } catch (error) {
      setNextPageToken('')

      if (error.statusCode === 403) {
        sendEvent({
          action: 'forbidden',
          category: 'error',
        })
        router.push('/error?type=forbidden')
      }
    }
  }

  useEffect(() => {
    updateVideos(router.query)
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
      <InfiniteScroll
        pageStart={Math.ceil(videos.length / 12)}
        loadMore={() => { updateVideos(router.query) }}
        hasMore={Boolean(nextPageToken)}
        loader={<Spinner key={0}>Loading...</Spinner>}
      >
        <ColumnList>
          {videos.map((video: Video, index: number) => {
            return (
              <Column key={`video-${index}`}>
                <VideoLink
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnails?.medium?.url}
                  onClick={(videoId: string) => {
                    router.push(`/video/${videoId}`)
                  }}
                />
              </Column>
            )
          })}
        </ColumnList>
      </InfiniteScroll>
    </Layout>
  )
}
