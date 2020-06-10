import querystring from 'querystring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import Layout from '../../components/Layout/'
import Heading from '../../components/Heading/'
import StdButton from '../../components/StdButton/'
import RadioButton from '../../components/RadioButton/'
import CaptionField from '../../components/CaptionField/'
import YoutubePlayer from '../../components/YoutubePlayer/'
import { copyToClipbord } from '../../utils/copy'
import { delayFetch } from '../../utils/fetcher'
import { Video, Lang } from '../../interfaces/youtube'

const findLang = (
  langs: any[],
  key: string,
  value: string | boolean | number
): Lang | null => {
  for (const lang of langs) {
    if (lang[key] === value) {
      return lang
    }
  }
  return null
}

export default () => {
  const [videoId, setVideoId] = useState<string>('')
  const [video, setVideo] = useState<Video | null>(null)
  const [langs, setLangs] = useState<Lang[]>([])
  const [caption, setCaption] = useState<string>('')
  const [selectedLang, setSelectedLang] = useState<Lang | null>(null)
  const [isFullDesc, setIsFullDesc] = useState<boolean>(false)
  const router = useRouter()

  const getVideo = async (): Promise<void> => {
    try {
      const data = await delayFetch(`/api/video/${router.query.id}`)

      if (!data.items) {
        throw data
      }

      setVideo(data.video)
      setLangs(data.caption.lang)
    } catch (error) {
      if (error.statusCode === 403) {
        router.push('/error?type=forbidden')
      }
    }
  }

  const updateCaption = async (lang: Lang | null): Promise<void> => {
    if (!lang) {
      setCaption('');
      return;
    }
    const data = await delayFetch(
      `/api/caption/${router.query.id}?${querystring.stringify({
        langCode: lang.code || null,
        langName: lang.name || null,
      })}`
    )
    setCaption(data.text)
  }

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    const videoId: string = Array.isArray(router.query.id)
      ? router.query.id[0]
      : router.query.id
    setVideoId(videoId)

    getVideo()
  }, [router.query.id])

  useEffect(() => {
    if (langs.length <= 0) {
      return;
    }

    if (!selectedLang) {
      const defaultLang: Lang | null = findLang(langs, 'default', true)
      if (defaultLang) {
        updateCaption(defaultLang)
        setSelectedLang(defaultLang)
      } else {
        updateCaption(langs[0])
        setSelectedLang(langs[0])
      }
    } else {
      updateCaption(selectedLang)
    }
  }, [langs])

  return (
    <Layout path="/video/" type="small">
      <div>
        <h1 className="text-3xl mb-md">
          { typeof video?.title === 'undefined' ?
            <Skeleton /> :
            video.title || ''
          }
        </h1>

        <YoutubePlayer
          videoId={videoId}
          show={Boolean(video)}
        />

        <p
          className={`mt-sm text-sm text-gray-700${isFullDesc ? '' : ' line-clamp'}`}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          { typeof video?.description === 'undefined' ?
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </> :
            video.description || ''
          }
        </p>
        { typeof video?.description === 'undefined' ?
            <Skeleton width={70} /> :
            <button
              type="button"
              className="mt-sm text-sm text-gray-700 underline"
              style={{display: isFullDesc ? 'none' : 'block'}}
              onClick={() => { setIsFullDesc(true) }}
            >もっと見る</button>
        }

        <section>
          <Heading>
            { langs.length <= 0 ?
              <Skeleton width={40} /> :
              '言語'
            }
          </Heading>
          {langs.map((lang: any) => {
            let isChecked = false
            if (selectedLang && lang.code === selectedLang.code) {
              isChecked = true
            }
            return (
              <div key={lang.code}>
                <RadioButton
                  id="caption-language"
                  value={lang.code}
                  checked={isChecked}
                  onChange={(value: string) => {
                    const lang: Lang | null = findLang(
                      langs, 'code', value
                    )
                    setSelectedLang(lang)
                    updateCaption(lang)
                  }}
                >{lang.label}</RadioButton>
              </div>
            )
          })}
        </section>

        <section className="w-full mt-lg">
          <Heading>
            { langs.length <= 0 ?
              <Skeleton width={40} /> :
              'キャプション'
            }
          </Heading>
          { langs.length <= 0 ?
            <Skeleton height={280} /> :
            <CaptionField value={caption}></CaptionField>
          }
          <div className="mt-md  md:mt-md">
            { langs.length <= 0 ?
              <Skeleton width={160} /> :
              <StdButton
                onClick={() => {
                  copyToClipbord(caption)
                  alert('クリップボードにコピーしました。')
                }}
              >Copy to clipboard</StdButton>
            }
          </div>
        </section>
      </div>
    </Layout>
  )
}
