import axios from 'axios'
import { Promise } from 'core-js'
import qs from 'qs'
import router from '../router'
// 1.生成 Axios 的伪实例，instance不是真正的new Axios,但是拥有axios实例的所有方法和属性
const instance = axios.create({
  baseURL: '/api'
})

// 2. 添加请求拦截器。理解：即将要发送请求的时候，将请求拦截下来，对当前请求进行批量处理：token，修改请求的参数
instance.interceptors.request.use(config => {
  // 1) config 包含当前请求的所有请求信息： method url data

  // 2) 修改 post 请求的参数格式：默认参数格式为json对象格式{a:xx,b:xx},当前服务器能处理的是url-encoding:a=xxx&b==y
  config.data = qs.stringify(config.data)
  // 携带token方式 1. cookie 大小 易被劫持 用户可禁用 2.请求参数 3.s请求头[authorization]
  const token = localStorage.getItem('token_key')
  if (config.headers.needToken) {
    if (token) {
      config.headers.authorization = token
    } else {
      throw Error('请先登录')
    }
  }

  return config
})

// 3.设置响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    console.log('请求失败！')
    console.log(error)
    // 默认会返回一个成功的promise实例，但是没有数据，会进入之后的成功.then回调。无意义
    if (!error.response) {
      console.log('请先登录')
      if (router.currentRoute.path !== '/login') {
        router.replace('/login')
      }
    } else {
      if (error.response.status === 401) {
        console.log('token过期，重新登录')
        if (router.currentRoute.path !== '/login') {
          router.replace('/login')
        }
      } else if (error.response.status === 404) {
        console.log('请求资源未找到！')
      } else {
        console.log('请求错误！')
      }
    }
    // 手动返回一个初始化的promise即可
    return new Promise(() => {})
  }
)
export default instance
