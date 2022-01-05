<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-add_circle" v-show="food.count">
        <van-icon name="minus" size="20" @click="changNum(false)" />
      </div>
    </transition>

    <div class="cart-count">{{ food.count }}</div>
    <div class="iconfont icon-remove_circle_outline" @click="changNum(true)">
      <van-icon name="plus" size="20" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      required: true,
      type: Object
    }
  },
  methods: {
    changNum(isAdd) {
      this.$store.dispatch('shop/changeFoodNum', { isAdd, food: this.food })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixins.styl'
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 20px
    color: rgb(0, 160, 220)

  .icon-remove_circle_outline
    display: inline-block
    line-height 24px
    font-size 24px
    color $green
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    line-height: 24px
    text-align: center
    font-size: 16px
    color: rgb(147, 153, 159)
  .icon-add_circle
    display: inline-block
    line-height: 24px
    font-size: 24px
    color $green
</style>
