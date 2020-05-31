import querystring from 'querystring'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import YoutubePlayer from '../../components/YoutubePlayer'
import { Video } from '../../interfaces/youtube'

const findLang = (
  langs: any[],
  key: string,
  value: string | boolean | number
) => {
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
  const [langs, setLangs] = useState<any[]>([])
  const [caption, setCaption] = useState<string>('')
  const [selectedLang, setSelectedLang] = useState<any>(null)
  const router = useRouter()

  const updateCaption = async (lang: any) => {
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

    const videoId = Array.isArray(router.query.id)
      ? router.query.id[0]
      : router.query.id
    const initialize = async () => {
      const { data } = await axios.get(`/api/video/${router.query.id}`)

      setVideo(data.video)
      setLangs(data.caption.lang)

      if (!selectedLang) {
        const defaultLang = findLang(data.caption.lang, 'default', true)
        updateCaption(defaultLang)
        setSelectedLang(defaultLang)
      } else {
        updateCaption(selectedLang)
      }
    }
    setVideoId(videoId)
    initialize()
  }, [router.query.id])

  return (
    <Layout path="/video/">
      { video && <div>
        <h1 className="text-3xl mb-md">{video?.title || ''}</h1>
        <div className="flex">
          <div className="w-1/2 pr-md">
            <YoutubePlayer videoId={videoId} />
            <p
              className="mt-sm"
              style={{ whiteSpace: 'pre-wrap' }}
            >{video?.description || ''}</p>
          </div>
          <div className="w-1/2">
            {langs.map((lang: any) => {
              return (
                <div key={lang.code}>
                  <label>
                    <input
                      type="radio"
                      name="caption-language"
                      value={lang.code}
                      checked={selectedLang && lang.code === selectedLang.code}
                      onChange={(event: any) => {
                        const lang = findLang(langs, 'code', event.target.value)
                        setSelectedLang(lang)
                        updateCaption(lang)
                      }}
                    />
                    <span className="pl-xs">{lang.label}</span>
                  </label>
                </div>
              )
            })}
            <div className="mt-md">
              <h2 className="mt-xs font-bold">キャプション</h2>
              <div style={{ whiteSpace: 'pre-wrap' }}>{caption}</div>
            </div>
          </div>
        </div>
      </div>}
    </Layout>
  )
}
