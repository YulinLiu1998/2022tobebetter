<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: !isUserNameShow }"
            @click="isUserNameShow = false"
          >
            短信登录
          </a>
          <a
            href="javascript:;"
            :class="{ on: isUserNameShow }"
            @click="isUserNameShow = true"
          >
            密码登录
          </a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: !isUserNameShow }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|phone'"
              />
              <span style="color: red" v-show="errors.has('phone')">
                {{ errors.first('phone') }}
              </span>
              <button
                :disabled="!rightPhoneNumber || countDownTime > 0"
                class="get_verification"
                :class="{ right: rightPhoneNumber }"
                @click.prevent="sendCode"
              >
                {{
                  countDownTime > 0
                    ? `还有${countDownTime}重新获取`
                    : '获取验证码'
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required|code'"
              />
              <span style="color: red" v-show="errors.has('code')">
                {{ errors.first('code') }}
              </span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意对对对
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: isUserNameShow }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  name="username"
                  v-validate="'required'"
                  v-model="username"
                />
                <span style="color: red" v-show="errors.has('username')">
                  {{ errors.first('username') }}
                </span>
              </section>
              <section class="login_verification">
                <input
                  type="tel"
                  maxlength="8"
                  placeholder="密码"
                  name="password"
                  v-validate="'required'"
                  v-model="password"
                />
                <span style="color: red" v-show="errors.has('password')">
                  {{ errors.first('password') }}
                </span>
                <div
                  class="switch_button"
                  :class="isShowPwd ? 'on' : 'off'"
                  @click="isShowPwd = !isShowPwd"
                >
                  <div
                    class="switch_circle"
                    :class="{ right: isShowPwd }"
                  ></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  name="captcha"
                  v-validate="'required'"
                  v-model="captcha"
                />
                <span style="color: red" v-show="errors.has('captcha')">
                  {{ errors.first('captcha') }}
                </span>
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="changeCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">{{$t('login')}}</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <div class="international">
      <van-button type="primary" @click="toggle('Chinese')">中文</van-button>
      <van-button type="info" @click="toggle('japanese')">日文</van-button>
      <van-button type="danger" @click="toggle('English')">English</van-button>
    </div>
  </section>
</template>
<script>
import { getCode } from '../../api/index.js'
export default {
  data() {
    return {
      isUserNameShow: false,
      isShowPwd: false,
      phone: '',
      code: '',
      username: '',
      password: '',
      captcha: '',
      countDownTime: 0
    }
  },
  methods: {
    changeCaptcha() {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?' + Date.now()
    },
    async sendCode() {
      console.log('发送验证')
      this.countDownTime = 5
      const interval = setInterval(() => {
        this.countDownTime--
        this.countDownTime === 0 && clearInterval(interval)
      }, 1000)

      const result = await getCode({ phone: this.phone })
      if (result.code === 1) {
        console.log('短信验证码发送失败')
      } else {
        console.log('发送成功')
      }
    },
    async login() {
      // const success = await this.$validator.validateAll() // 对所有表单项进行验证
      // const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
      const { isUserNameShow, phone, username, code, captcha, password } = this
      const names = isUserNameShow
        ? ['username', 'password', 'capcha']
        : ['phone', 'code']
      const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
      console.log(success)
      if (success) {
        let result
        if (isUserNameShow) {
          result = await this.$API.loginWithUserName({
            username,
            password,
            captcha
          })
          if (result.code === 1) {
            alert('请输入正确的信息！')
            // 重置验证码
            this.changeCaptcha()
            this.captcha = ''
          }
        } else {
          result = await this.$API.loginWithPhone({ phone, code })
          if (result.code === 1) {
            alert('请输入正确的信息！')
            // 重置验证码
            this.code = ''
          }
        }
        console.log(result)
        // 统一处理
        if (result.code === 0) {
          this.$store.dispatch('getUserInfoAction', result.data)
          this.$store.dispatch('getTokenAction', result.data.token)
          this.$router.push('/profile')
        }
      } else {
        console.log('前端验证失败')
      }
    },
    toggle(language) {
      this.$i18n.locale = language
    }
  },
  computed: {
    rightPhoneNumber() {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)
    }
  },
  mounted() {
    this.$i18n.locale = 'Chinese'
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color: #333
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform: translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
  .international
    margin-top: 50px
    display: flex
    justify-content: space-around
</style>
