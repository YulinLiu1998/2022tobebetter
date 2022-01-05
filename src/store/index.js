import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations'
import actions from './action.js'
import getters from './getters'
import shop from './modules/shop'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    shop
  }
})
