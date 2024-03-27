import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import MyRequest from './request'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestSuccessInterceptor: (config) => {
      const token = localCache.getCache('accessToken')
      console.log('requestSuccessFn', token)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default myRequest
