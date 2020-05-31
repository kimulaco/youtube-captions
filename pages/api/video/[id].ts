import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import { api, filterVideo } from '../../../utils/youtube-v3'
import { getCaptionLangs } from '../../../utils/youtube-timedtext'

const { YOUTUBE_API_KEY } = process.env

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const videoId = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id
    const [video, lang] = await Promise.all([
      api.get(`/videos?${querystring.stringify({
        part: 'snippet',
        maxResults: 1,
        id: [videoId],
        key: YOUTUBE_API_KEY
      })}`),
      getCaptionLangs(videoId),
    ])
    res.status(200).json({
      video: filterVideo(video.data.items[0]),
      caption: {
        lang,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(error.response.status).json({
      statusCode: error.response.status,
      message: error.message
    })
  }
}
