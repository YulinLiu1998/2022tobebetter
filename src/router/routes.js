/*
所有路由配置的数组
*/

// import Search from '@/views/Search/Search'
// import Order from '@/views/Order/Order'
// import Profile from '@/views/Profile/Profile'
// import Login from '@/views/Login/Login.vue'
// import Shop from '@/views/Shop/Shop.vue'
// import Goods from '@/views/Shop/Goods/Goods.vue'
// import Info from '@/views/Shop/Info/Info.vue'
// import Ratings from '@/views/Shop/Rating/Ratings.vue'
const MSite = () => import('@/views/Msite/Msite.vue')
const Order = () => import('@/views/Order/Order.vue')
const Profile = () => import('@/views/Profile/Profile.vue')
const Login = () => import('@/views/Login/Login.vue')
const Shop = () => import('@/views/Shop/Shop.vue')
const Goods = () => import('@/views/Shop/Goods/Goods.vue')
const Info = () => import('@/views/Shop/Info/Info.vue')
const Ratings = () => import('@/views/Shop/Rating/Ratings.vue')
const Search = () => import('@/views/Search/Search.vue')
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'rating',
        component: Ratings
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ],
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShowFooter: false
    }
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
