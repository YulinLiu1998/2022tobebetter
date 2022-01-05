import { getShopDAtas } from '../../api/index.js'
import Vue from 'vue'
const state = {
  initState: '初始化数据',
  shopData: {},
  cartShops: []
}
const mutations = {
  save_shopdata(state, shopData) {
    state.shopData = shopData
  },
  add_food_num(state, { food }) {
    if (food.count > 0) {
      food.count++
    } else {
      Vue.set(food, 'count', 1)
      state.cartShops.push(food)
    }
  },
  del_food_num(state, { food }) {
    food.count > 0 && food.count--
    if (food.count === 0) {
      state.cartShops.splice(state.cartShops.indexOf(food), 1)
    }
  },
  clear_cart_shop(state) {
    state.cartShops.forEach(food => {
      food.count = 0
    })
    state.cartShops = []
  },
  save_cart_shop(state, cartShop) {
    state.cartShops = cartShop
  }
}

const actions = {
  async getShopDataAction({ commit }) {
    const result = await getShopDAtas()
    if (result.code === 0) {
      commit('save_shopdata', result.data)
    }
  },
  async changeFoodNum({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit('add_food_num', { food })
    } else {
      commit('del_food_num', { food })
    }
  }
}

const getters = {
// 计算所有foodcount大于0 的
  totalCount(state) {
    return state.cartShops.reduce((pre, food) => {
      // eslint-disable-next-line no-return-assign
      return pre += food.count
    }, 0)
  },
  totalPrice(state) {
    return state.cartShops.reduce((pre, food) => {
      // eslint-disable-next-line no-return-assign
      return pre += food.count * food.price
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
