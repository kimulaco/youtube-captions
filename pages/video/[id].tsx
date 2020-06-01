import querystring from 'querystring'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import YoutubePlayer from '../../components/YoutubePlayer'
import { copyToClipbord } from '../../utils/copy'
import { Video, Rang } from '../../interfaces/youtube'

const findLang = (
  langs: any[],
  key: string,
  value: string | boolean | number
): Rang | null => {
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
  const [langs, setLangs] = useState<Rang[]>([])
  const [caption, setCaption] = useState<string>('')
  const [selectedLang, setSelectedLang] = useState<Rang | null>(null)
  const [isFullDesc, setIsFullDesc] = useState<boolean>(false)
  const router = useRouter()

  const updateCaption = async (lang: Rang | null): Promise<void> => {
    if (!lang) {
      setCaption('');
      return;
    }
    const { data } = await axios.get(
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
    const initialize = async (): Promise<void> => {
      const { data } = await axios.get(`/api/video/${router.query.id}`)
      setVideo(data.video)
      setLangs(data.caption.lang)
    }
    setVideoId(videoId)
    initialize()
  }, [router.query.id])

  useEffect(() => {
    if (langs.length <= 0) {
      return;
    }

    if (!selectedLang) {
      const defaultLang: Rang | null = findLang(langs, 'default', true)
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
    <Layout path="/video/">
      { video && <div>
        <h1 className="text-3xl mb-md">{video?.title || ''}</h1>
        <div className="md:flex">
          <div className="md:w-1/2 pr-md">
            <YoutubePlayer videoId={videoId} />
            <p
              className="mt-sm text-sm text-gray-700"
              style={{
                whiteSpace: 'pre-wrap',
                overflow: isFullDesc ? 'visible' : 'hidden',
                display: isFullDesc ? 'block' : '-webkit-box',
                '-webkit-line-clamp': isFullDesc ? null : '4',
                '-webkit-box-orient': isFullDesc ? null : 'vertical',
              }}
            >{video?.description || ''}</p>
            <button
              type="button"
              className="mt-sm text-sm text-gray-700 underline"
              style={{display: isFullDesc ? 'none' : 'block'}}
              onClick={() => { setIsFullDesc(true) }}
            >もっと見る</button>
          </div>
          <div className="mt-md md:w-1/2 md:mt-0">
            <div className="md:flex md:flex-wrap">
              <div className="md:w-1/2">
                <h2 className="font-bold">言語</h2>
                {langs.map((lang: any) => {
                  let isChecked = false
                  if (selectedLang && lang.code === selectedLang.code) {
                    isChecked = true
                  }
                  return (
                    <div key={lang.code}>
                      <label>
                        <input
                          type="radio"
                          name="caption-language"
                          value={lang.code}
                          checked={isChecked}
                          onChange={(event: any) => {
                            const lang: Rang | null = findLang(langs, 'code', event.target.value)
                            setSelectedLang(lang)
                            updateCaption(lang)
                          }}
                        />
                        <span className="pl-xs">{lang.label}</span>
                      </label>
                    </div>
                  )
                })}
              </div>
              <div className="mt-md md:w-1/2 md:mt-md">
                <div>
                  <button
                    type="button"
                    className="bg-blue-600 text-white py-xs px-sm rounded"
                    style={{minWidth: '120px'}}
                    onClick={() => {
                      copyToClipbord(caption)
                      alert('クリップボードにコピーしました。')
                    }}
                  >Copy to clipboard</button>
                </div>
              </div>
              <div className="w-full mt-lg">
                <h2 className="mb-xs font-bold">キャプション</h2>
                <textarea
                  className="block rounded w-full bg-gray-200 p-sm"
                  value={caption}
                  style={{
                    height: '280px',
                    minHeight: '280px',
                  }}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </Layout>
  )
}
