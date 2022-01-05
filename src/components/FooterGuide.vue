<template>
  <div class="footer-guide" v-show="this.$route.meta.isShowFooter">
    <div
      class="guide-item"
      :class="{ on: $route.path === '/msite' }"
      @click="goto('/msite')"
    >
      <i class="iconfont icon-icon-test"></i>
      <span>首页</span>
    </div>
    <div
      class="guide-item"
      :class="{ on: $route.path === '/search' }"
      @click="goto('/search')"
    >
      <i class="iconfont icon-icon-test1"></i>
      <span>搜索</span>
    </div>
    <div
      class="guide-item"
      :class="{ on: $route.path === '/order' }"
      @click="goto('/order')"
    >
      <i class="iconfont icon-icon-test2"></i>
      <span>订单</span>
    </div>
    <div
      class="guide-item"
      :class="{ on: $route.path === '/profile' }"
      @click="goto('/profile')"
    >
      <i class="iconfont icon-icon-test3"></i>
      <span>我的</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterGuide',
  methods: {
    goto(path) {
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixins.styl'
.footer-guide
  background-color: white
  top-border-1px(#cccccc)
  display: flex
  height: 50px
  width: 100%
  position: fixed
  left: 0
  bottom: 0
  .guide-item
    width: 25%
    text-align: center
    &.on
      color: green
    i
      font-size: 26px
      line-height: 30px
      display: block
</style>
