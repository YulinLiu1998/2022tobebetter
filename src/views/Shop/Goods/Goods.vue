<template>
  <div id="goodsContainer">
    <div class="left">
      <ul class="navList" ref="leftUL">
        <li
          :class="{ active: navIndex === index }"
          v-for="(good, index) in goods"
          :key="index"
          @click="changeNavIndex(index)"
        >
          {{ good.name }}
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="foods-wrapper">
        <ul ref="liList">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart></shop-cart>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import CartControl from '../../../components/CartControl.vue'
import ShopCart from '../../../components/ShopCart.vue'
export default {
  name: 'Goods',
  data() {
    return {
      tops: [],
      scrollY: 0
    }
  },
  mounted() {
    if (this.goods) {
      this.initScroll()
      this.initTops()
    }
  },
  computed: {
    ...mapState({
      goods: (state) => state.shop.shopData.goods
    }),
    navIndex() {
      const { tops, scrollY } = this
      const index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY <= tops[index + 1]
      )
      console.log('执行Navindex')
      if (this.leftScroll && index !== this.index) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.index = index
        this.leftScroll.scrollToElement(this.$refs.leftUL.children[index], 1000)
      }

      return index
    }
  },
  methods: {
    initScroll() {
      if (this.leftScroll || this.rightScroll) {
        this.leftScroll.refresh()
        this.rightScroll.refresh()
      } else {
        this.$nextTick(() => {
          // eslint-disable-next-line no-new
          this.leftScroll = new BScroll('.left', {
            pullUpLoad: true,
            scrollbar: false,
            pullDownRefresh: true,
            click: true
          })
          // eslint-disable-next-line no-new
          this.rightScroll = new BScroll('.right', {
            pullUpLoad: true,
            scrollbar: false,
            pullDownRefresh: true,
            click: true
          })
          this.rightScroll.on('scroll', (position) => {
            this.scrollY = Math.abs(position.y)
          })
        })
      }
    },
    initTops() {
      this.$nextTick(() => {
        const lis = Array.from(this.$refs.liList.children)
        const tops = []
        let top = 0
        tops.push(top)
        for (let index = 0; index < lis.length; index++) {
          top += lis[index].clientHeight
          tops.push(top)
        }
        this.tops = tops
      })
    },
    changeNavIndex(index) {
      this.scrollY = this.tops[index]
      this.rightScroll.scrollTo(0, -this.scrollY, 1000)
    }
  },
  watch: {
    goods() {
      this.initScroll()
      this.initTops()
    }
  },
  components: {
    CartControl,
    ShopCart
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
#goodsContainer
  display: flex
  overflow: hidden
  height: calc(100vh - 272px)
  .left
    width: 80px
    background-color: #f3f5f7
    position: absolute
    height: calc(100vh - 272px)
    top: 224px
    bottom: 0
    overflow hidden
    .navList
      li
        height: 50px
        line-height: 50px
        text-align: center
        position relative
        &.active
          background-color: #fff
          color: $green
        &:after
          content: ''
          height: 1px
          width 80%
          background-color: #eee
          position: absolute
          bottom: 0
          left: 10%
  .right
    width: 295px
    height: 100%
    margin-left: 80px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
