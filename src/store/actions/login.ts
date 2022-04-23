import { cache_Token } from '@/constance'
import { ApiResponse, loginForm, Token } from '@/types/data'
import { RootThunkAction } from '@/types/store'
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

export { login, getCode }
