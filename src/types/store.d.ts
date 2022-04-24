import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { Channel, Profile, Token, UserProfile } from './data'

// 各个默认的Action
export type LoginAction =
  | {
      type: 'login/login'
      payload: Token
    }
  | {
      type: 'login/logout'
    }
  | {
      type: 'login/saveToken'
      payload: Token
    }

export type ProfileAction =
  | {
      type: 'profile/getProfile'
      payload: Profile
    }
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }

export type HomeAction =
  | {
      type: 'home/saveUserChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/changeChannelsActive'
      payload: number
    }
  | {
      type: 'home/saveChannelArticles'
      payload: {
        channel_id: number
        timestamp: string
        articles: Article[]
      }
    }
  | {
      type: 'home/saveNewArticles'
      payload: {
        channel_id: number
        timestamp: string
        articles: Article[]
      }
    }
export type RootAction = loginAction | ProfileAction | HomeAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
