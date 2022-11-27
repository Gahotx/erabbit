import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const service = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.user.profile.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code) {
      return response.data
    } else {
      return Promise.reject(msg)
    }
  },
  error => {
    if (error?.response?.status === 401) {
      store.commit('user/setProfile', {})
      router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.value.fullPath)}`)
    }
    return Promise.reject(error)
  }
)

export default service
