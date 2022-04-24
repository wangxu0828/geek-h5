import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { Profile, Token, UserProfile } from './data'

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

export type RootAction = loginAction | ProfileAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
