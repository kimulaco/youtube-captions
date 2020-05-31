import querystring from 'querystring'
import axios from 'axios'
import xml2js from 'xml2js'

const xmlParser = new xml2js.Parser()
const TIMED_TEXT_API = 'https://video.google.com/timedtext'

export const getCaptionLangs = async (videoId: string): Promise<any[]> => {
  const { data } = await axios.get(`${TIMED_TEXT_API}?type=list&v=${videoId}`)
  const xml = await xmlParser.parseStringPromise(data)

  if (xml.transcript_list.track.length <= 0) {
    return []
  }

  return xml.transcript_list.track.map((lang: any) => {
    return {
      name: lang.$.name || '',
      label: lang.$.lang_original || '',
      code: lang.$.lang_code || '',
      default: lang.$.lang_default === 'true'
    }
  })
}

export const getCaption = async (
  { videoId, langCode, langName }
  : { videoId: string, langCode: string, langName: string }
) => {
  const { data } = await axios.get(`${TIMED_TEXT_API}?${querystring.stringify({
    name: langName,
    hl: langName,
    lang: langCode,
    v: videoId,
  })}`)
  const xml = await xmlParser.parseStringPromise(data)
  let captionText = ''

  xml.transcript.text.forEach((caption: any) => {
    captionText += `${caption._}\n`
  });

  return captionText
}
