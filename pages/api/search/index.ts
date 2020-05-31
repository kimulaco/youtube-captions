import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import { api, filterVideo } from '../../../utils/youtube-v3'
import { Video, ResVideo } from '../../../interfaces/youtube'

const { YOUTUBE_API_KEY } = process.env
const DEFAULT_PARAMS = {
  type: 'video',
  part: 'snippet',
  videoCaption: 'closedCaption',
  q: '',
  maxResults: 12
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = Object.assign(DEFAULT_PARAMS, {
      ...req.query,
      key: YOUTUBE_API_KEY
    })
    const { data } = await api.get(`/search?${querystring.stringify(params)}`)
    res.status(200).json({
      items: data.items.map((item: ResVideo): Video => {
        return filterVideo(item)
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      statusCode: 500,
      message: error.message
    })
  }
}
