import querystring from 'querystring'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/'
import Heading from '../../components/Heading/'
import StdButton from '../../components/StdButton/'
import RadioButton from '../../components/RadioButton/'
import CaptionField from '../../components/CaptionField/'
import YoutubePlayer from '../../components/YoutubePlayer/'
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
    <Layout path="/video/" type="small">
      { video && <div>
        <h1 className="text-3xl mb-md">{video?.title || ''}</h1>

        <YoutubePlayer videoId={videoId} />
        <p
          className={`mt-sm text-sm text-gray-700${isFullDesc ? '' : ' line-clamp'}`}
          style={{ whiteSpace: 'pre-wrap' }}
        >{video?.description || ''}</p>
        <button
          type="button"
          className="mt-sm text-sm text-gray-700 underline"
          style={{display: isFullDesc ? 'none' : 'block'}}
          onClick={() => { setIsFullDesc(true) }}
        >もっと見る</button>

        <section>
          <Heading>言語</Heading>
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
                    const lang: Rang | null = findLang(
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
          <Heading>キャプション</Heading>
          <CaptionField value={caption}></CaptionField>
          <div className="mt-md  md:mt-md">
            <StdButton
              onClick={() => {
                copyToClipbord(caption)
                alert('クリップボードにコピーしました。')
              }}
            >Copy to clipboard</StdButton>
          </div>
        </section>
      </div> }
    </Layout>
  )
}
