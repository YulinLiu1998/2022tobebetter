<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderGuide :title="address.name">
      <template v-slot:left>
        <span class="header_search">
          <i class="iconfont icon-icon-test1"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>
    </HeaderGuide>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(newitem, index) in newCategory"
            :key="index"
          >
            <div class="link_to_food"  v-for="(item) in newitem"
            :key="item.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + item.image_url " />
              </div>
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-favoriteslist"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import ShopList from '@/components/ShopList.vue'
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  mounted() {
    this.askInitInfo()
  },
  methods: {
    askInitInfo() {
      this.$store.dispatch('getAddressAction')
      this.$store.dispatch('getCategoryAction')
      this.$store.dispatch('getShopsAction')
    }
  },
  computed: {
    ...mapState({
      address: state => state.address,
      category: state => state.category
    }),
    newCategory() {
      return _.chunk(this.category, 8)
    }
  },
  watch: {
    category() {
      this.$nextTick(() => {
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  components: {
    ShopList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite  //首页
  width 100%
  .msite_header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-icon-test1
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      /deep/.swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .icon-favoriteslist
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
