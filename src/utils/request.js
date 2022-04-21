import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

instance.interceptors.request.use(
  (req) => {
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
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
