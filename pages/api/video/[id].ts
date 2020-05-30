import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import { api, filterVideo } from '../../../utils/youtube'

const { YOUTUBE_API_KEY } = process.env

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await api.get(`/videos?${querystring.stringify({
      part: 'snippet',
      maxResults: 1,
      id: Array.isArray(req.query.id) ? req.query.id : [req.query.id],
      key: YOUTUBE_API_KEY
    })}`)
    res.status(200).json({
      video: filterVideo(data.items[0])
    })
  } catch (error) {
    console.error(error)
    res.status(error.response.status).json({
      statusCode: error.response.status,
      message: error.message
    })
  }
}
