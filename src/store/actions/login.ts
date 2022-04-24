import { cache_Token } from '@/constance'
import { ApiResponse, loginForm, Token } from '@/types/data'
import { LoginAction, RootThunkAction } from '@/types/store'
import cache from '@/utils/cache'
import instance from '@/utils/request'
const login = (values: loginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await instance.post<ApiResponse<Token>>(
      '/authorizations',
      values
    )

    dispatch({
      type: 'login/login',
      payload: res.data.data
    })
    // 存储到本地
    cache.setCache(cache_Token, res.data.data)
  }
}

const getCode = (mobile: string) => {
  return async () => {
    await instance.get(`/sms/codes/${mobile}`)
  }
}

const logout = (): LoginAction => {
  cache.clearCache()
  return {
    type: 'login/logout'
  }
}

const saveToken = (token: Token): LoginAction => {
  // 存储到本地
  cache.setCache(cache_Token, token)
  return {
    type: 'login/saveToken',
    payload: token
  }
}

export { login, getCode, logout, saveToken }
