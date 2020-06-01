export interface Video {
  videoId: string
  channelId: string
  channelTitle: string
  description: string
  publishTime: string
  publishedAt: string
  title: string
  thumbnails: {
    default: ResVideoThumbnails
    high: ResVideoThumbnails
    medium: ResVideoThumbnails
  }
}

export interface ResVideo {
  etag: string
  id: {
    kind: string
    videoId: string
  }
  kind: string
  snippet: {
    channelId: string
    channelTitle: string
    description: string
    liveBroadcastContent: string
    publishTime: string
    publishedAt: string
    title: string
    thumbnails: {
      default: ResVideoThumbnails
      high: ResVideoThumbnails
      medium: ResVideoThumbnails
    }
  }
}

export interface ResVideoThumbnails {
  url: string
  width: number
  height: number
}

export interface Rang {
  name: string
  label: string
  code: string
  default: boolean
}
