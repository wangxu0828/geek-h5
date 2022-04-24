import { HomeAction } from '@/types/store'
import { Article, Channel } from '@/types/data'

type HomeType = {
  userChannel: Channel[]
  allChannel: Channel[]
  active: number
  channelArticles: {
    [key: number]: {
      timestamp: string
      articles: Article[]
    }
  }
}

const initialState: HomeType = {
  userChannel: [],
  allChannel: [],
  active: 0,
  channelArticles: {}
}

const home = (state = initialState, action: HomeAction) => {
  if (action.type === 'home/saveUserChannels') {
    return {
      ...state,
      userChannel: action.payload
    }
  }
  if (action.type === 'home/saveAllChannels') {
    return {
      ...state,
      allChannel: action.payload
    }
  }
  if (action.type === 'home/changeChannelsActive') {
    return {
      ...state,
      active: action.payload
    }
  }
  if (action.type === 'home/saveChannelArticles') {
    const old = state.channelArticles[action.payload.channel_id]?.articles || []
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [action.payload.channel_id]: {
          timestamp: action.payload.timestamp,
          articles: [...old, ...action.payload.articles]
        }
      }
    }
  }
  if (action.type === 'home/saveNewArticles') {
    const { channel_id, timestamp, articles } = action.payload
    return {
      ...state,
      channelArticles: {
        // 需要追加数据
        ...state.channelArticles,
        [channel_id]: {
          timestamp,
          articles: [...articles]
        }
      }
    }
  }
  return state
}

export default home
