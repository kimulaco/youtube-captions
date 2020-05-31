import querystring from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import { getCaption } from '../../../utils/youtube-timedtext'

const queryToString = (queryValue: any) => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const videoId = queryToString(req.query.id)
    const langCode = queryToString(req.query.langCode)
    const langName = queryToString(req.query.langName)
    const caption = await getCaption({ videoId, langCode, langName })

    res.status(200).json({
      videoId,
      langName,
      langCode,
      text: caption,
    })
  } catch (error) {
    console.error(error)
    res.status(error.response.status).json({
      statusCode: error.response.status,
      message: error.message
    })
  }
}
