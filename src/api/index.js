import ajax from './ajax'

export const getAddress = (latitude, longitude) => ajax({
  url: `/position/${latitude},${longitude}`
})

export const getCategory = () => ajax({
  url: '/index_category',
  headers: {
    needToken: true
  }
})

export const getShops = (latitude, longitude) => ajax({
  url: '/shops',
  params: {
    latitude,
    longitude
  },
  headers: {
    needToken: true
  }
})

export const getCode = ({ phone }) => ajax({
  url: '/sendcode',
  params: {
    phone
  }
})

export const loginWithUserName = ({ username, password, captcha }) => ajax({
  url: '/login_pwd',
  method: 'POST',
  data: {
    name: username,
    pwd: password,
    captcha
  }
})

export const loginWithPhone = ({ phone, code }) => ajax({
  url: '/login_sms',
  method: 'POST',
  data: {
    phone,
    code
  }
})

export const autoLogin = (tokenKey) => ajax({
  url: '/auto_login',
  method: 'GET',
  headers: {
    needToken: true
  }
})

// 测试mock接口
export const test = () => ajax('/test')

export const getShopDAtas = () => ajax({
  url: '/getShopDatas',
  method: 'GET'
})
