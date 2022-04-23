import { Profile, UserProfile } from '@/types/data'
import { ProfileAction } from '@/types/store'

type ProfileState = {
  profile: Profile
  userProfile: UserProfile
}

const initialState: ProfileState = {
  profile: {},
  userProfile: {}
} as ProfileState

const profile = (state = initialState, action: ProfileAction) => {
  if (action.type === 'profile/getProfile') {
    return {
      ...state,
      profile: action.payload
    }
  }
  if (action.type === 'profile/getUserProfile') {
    return {
      ...state,
      userProfile: action.payload
    }
  }
  return state
}

export default profile
