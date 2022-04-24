import { RootThunkAction } from '@/types/store'
import { ApiResponse, Profile, UserProfile } from '@/types/data'
import instance from '@/utils/request'

const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.get<ApiResponse<Profile>>('/user')
    dispatch({
      type: 'profile/getProfile',
      payload: res.data.data
    })
  }
}

const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.get<ApiResponse<UserProfile>>('/user/profile')
    dispatch({
      type: 'profile/getUserProfile',
      payload: res.data.data
    })
  }
}

const updateUserProfile = (key: string, value: string): RootThunkAction => {
  return async (dispatch) => {
    instance.patch('/user/profile', {
      [key]: value
    })
    // 重新渲染
    dispatch(getUserProfile())
  }
}

const updateUserPhoto = (fd: FormData): RootThunkAction => {
  return async (dispatch) => {
    await instance.patch('/user/photo', fd)
    // 重新渲染
    dispatch(getUserProfile())
  }
}

export { getProfile, getUserProfile, updateUserProfile, updateUserPhoto }
