import axios from 'axios'
import { Video, ResVideo } from '../interfaces/youtube'

export const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
})

export const filterVideo = (resVideo: ResVideo): Video => {
  return {
    videoId: resVideo.id.videoId,
    channelId: resVideo.snippet.channelId,
    channelTitle: resVideo.snippet.channelTitle,
    description: resVideo.snippet.description,
    publishTime: resVideo.snippet.publishTime,
    publishedAt: resVideo.snippet.publishedAt,
    title: resVideo.snippet.title,
    thumbnails: resVideo.snippet.thumbnails,
  }
}
