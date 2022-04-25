import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import {
  Channel,
  Profile,
  Token,
  UserProfile,
  Suggestion,
  History
} from './data'

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

export type SearchAction =
  | {
      type: 'search/suggestion'
      payload: Suggestion
    }
  | {
      type: 'search/history'
      payload: History
    }
  | {
      type: 'search/clearHistories'
    }
  | {
      type: 'search/saveResults'
      payload: SearchResultRes
    }

export type ArticleAction =
  | {
      type: 'article/setArticleInfo'
      payload: ArticleDetail
    }
  | {
      type: 'article/saveComment'
      payload: CommentRes
    }
  | {
      type: 'article/clearComment'
    }
  | {
      type: 'article/saveNewComment'
      payload: Comment
    }
  | {
      type: 'article/addReplyCount'
      payload: string
    }

export type RootAction =
  | loginAction
  | ProfileAction
  | HomeAction
  | SearchAction
  | ArticleAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
