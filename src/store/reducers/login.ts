import { Token } from '@/types/data'
import { LoginAction } from '@/types/store'
import cache from '@/utils/cache'
import { cache_Token } from '@/constance'
const initialState: Token = cache.getCache(cache_Token)

const login = (state = initialState, action: LoginAction) => {
  if (action.type === 'login/login') {
    return action.payload
  }
  if (action.type === 'login/logout') {
    return {
      token: '',
      refresh_token: ''
    }
  }
  if (action.type === 'login/saveToken') {
    return {
      token: action.payload.token,
      refresh_token: action.payload.refresh_token
    }
  }
  return state
}

export default login
