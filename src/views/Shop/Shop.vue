<template>
  <div id="shopContainer">
    <shop-header></shop-header>
    <div class="tabs">
      <div class="tabs-item">
        <router-link to="/shop/goods" replace>订餐</router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/shop/info" replace>评价</router-link>
      </div>
      <div class="tabs-item">
        <router-link to="/shop/rating" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import ShopHeader from '../../components/ShopHeader.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'Shop'
    }
  },
  components: { ShopHeader },
  mounted() {
    const shopData = JSON.parse(sessionStorage.getItem('shopData'))
    if (shopData) {
      this.$store.commit('shop/save_shopdata', shopData)
      // 计算最新的购物车数据
      const cartShops = shopData.goods.reduce((pre, good) => {
        pre.push(...good.foods.filter((food) => food.count))
        return pre
      }, [])
      this.$store.commit('shop/save_cart_shop', cartShops)
    } else {
      this.$store.dispatch('shop/getShopDataAction')
    }
    window.addEventListener('unload', () => {
      sessionStorage.setItem('shopData', JSON.stringify(this.shopData))
    })
  },
  beforeDestroy() {
    sessionStorage.setItem('shopData', JSON.stringify(this.shopData))
  },
  computed: {
    ...mapState('shop', ['initState', 'shopData'])
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
#shopContainer
  .tabs
    display: flex
    bottom-border-1px(#eee)
    .tabs-item
      flex: 1
      text-align: center
      height: 40px
      line-height: 40px
      font-size: 16px
      a
        display block
        position relative
        &.router-link-active
          color: $green
          &:after
            content: ''
            height: 4px
            width 40px
            background-color: $green
            transform: scaleY(0.5)
            position: absolute
            bottom: 0
            left: 50%
            margin-left: -20px
            // transform: translateX(-50%)
</style>
