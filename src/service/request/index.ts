import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { MyInternalRequestConfig, MyRequestConfig } from './type'

// 拦截器 蒙版Loading/token/修改配置
class MyRequest {
  instance: AxiosInstance
  // request示例 => axios实例
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance都拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // loading/token
        console.log('全局请求成功拦截')
        console.log('config', config)
        return config
      },
      (error: AxiosError) => {
        console.log('全局请求失败的拦截', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局响应成功的拦截')
        const { data } = res
        console.log('响应对象:', res)
        // 处理res.code
        return data
      },
      (error: AxiosError) => {
        console.log('全局响应失败的拦截', error)
        // const { message } = error
        // 根据message 和status处理错误
        // this.handleErrorMessage(message)
        return Promise.reject(error)
      }
    )
    // 针对具有自定义拦截器的config
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessInterceptor,
      config.interceptors?.requestFailInterceptor
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessInterceptor,
      config.interceptors?.responseFailInterceptor
    )
  }

  // 封装错误消息处理
  // handleErrorMessage(message: string) {}

  // 封装网络请求方法
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次拦截器
    if (config.interceptors?.requestSuccessInterceptor) {
      console.log('url请求成功拦截', config.url)
      config = config.interceptors.requestSuccessInterceptor(config as MyInternalRequestConfig)
    }
    return new Promise<T>((resolve, reject) => {
      try {
        // 在尝试发送请求之前，捕获可能的配置错误
        this.instance
          .request<any, T>(config)
          .then((res) => {
            if (config.interceptors?.responseSuccessInterceptor) {
              console.log('url响应成功拦截', config.url)
              res = config.interceptors.responseSuccessInterceptor(res)
            }
            resolve(res)
          })
          .catch((error) => {
            if (config.interceptors?.responseFailInterceptor) {
              console.log('url响应失败拦截', config.url)
              error = config.interceptors.responseFailInterceptor(error)
            }
            reject(error)
          })
      } catch (e: any) {
        if (config.interceptors?.requestFailInterceptor) {
          console.log('url请求失败拦截', config.url)
          const modifiedError = config.interceptors.requestFailInterceptor(e)
          return Promise.reject(modifiedError)
        } else {
          return Promise.reject(e)
        }
      }
    })
  }

  // 封装常用方法
  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  put<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default MyRequest
