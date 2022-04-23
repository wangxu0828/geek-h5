import { loginForm } from '@/types/data'
import { LoginAction } from '@/types/store'
import cache from '@/utils/cache'
import { cache_Token } from '@/constance'
const initialState: loginForm = cache.getCache(cache_Token)

const login = (state = initialState, action: LoginAction) => {
  if (action.type === 'login/login') {
    return action.payload
  }
  return state
}

export default login
