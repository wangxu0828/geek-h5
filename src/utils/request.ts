import { cache_Token } from '@/constance'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import cache from './cache'

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
  (err: AxiosError<{ message: string }>) => {
    if (!err.response) {
      // 没有错误响应
      Toast.show('服务器繁忙,请稍后再试')
      return Promise.reject(err)
    }
    Toast.show(err.response.data.message)
    return Promise.reject(err)
  }
)

export default instance
