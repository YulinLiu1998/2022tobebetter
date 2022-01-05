import Vue from 'vue'
import VeeValidate from 'vee-validate'
// eslint-disable-next-line camelcase
import zh_CN from 'vee-validate/dist/locale/zh_CN'
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码',
    username: '用户名',
    password: '密码',
    capcha: '验证码'
  }
})

Vue.use(VeeValidate)

VeeValidate.Validator.extend('phone', {
  validate: value => {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})

VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  getMessage: field => field + '必须是6位数字'
})
