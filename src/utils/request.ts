import { cache_Token } from '@/constance'
import { ApiResponse, Token } from '@/types/data'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import cache from './cache'
import history from './history'
import store from '@/store'
import { logout, saveToken } from '@/store/actions/login'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

instance.interceptors.request.use(
  (req) => {
    const token = cache.getCache(cache_Token)
    if (token.token) {
      req.headers!.Authorization = `Bearer ${token.token}`
    }
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (req) => {
    return req
  },
  async (err: AxiosError<{ message: string }>) => {
    if (!err.response) {
      // 没有错误响应
      Toast.show('服务器繁忙,请稍后再试')
      return Promise.reject(err)
    }
    if (err.response.status === 401) {
      // token过期,需要额外处理
      // 1. 获取refresh_token
      const token: Token = cache.getCache(cache_Token)
      // 判断是否有refresh_token
      if (!token) {
        // 没有刷新token
        history.replace('/login', {
          from: history.location.pathname
        })
        Toast.show('登录信息过期')
        return Promise.reject(err)
      }

      try {
        const res = await axios.request<ApiResponse<{ token: string }>>({
          method: 'put',
          url: '/authorizations',
          baseURL: 'http://geek.itheima.net/v1_0/',
          headers: {
            Authorization: `Bearer ${token.refresh_token}`
          }
        })
        // 将token存入到store中
        store.dispatch(
          saveToken({
            token: res.data.data.token,
            refresh_token: token.refresh_token
          })
        )
        // 重新发送请求
        return instance.request(err.config)
      } catch (error) {
        history.replace('/login', {
          from: history.location.pathname
        })
        Toast.show('登录信息失效')
        store.dispatch(logout())

        return Promise.reject(error)
      }
    }
    Toast.show(err.response.data.message)
    return Promise.reject(err)
  }
)

export default instance
