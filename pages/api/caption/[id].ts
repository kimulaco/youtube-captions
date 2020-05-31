import { NextApiRequest, NextApiResponse } from 'next'
import { queryToString } from '../../../utils/'
import { getCaption } from '../../../utils/youtube-timedtext'

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
