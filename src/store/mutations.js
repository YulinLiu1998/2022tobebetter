import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, category) {
    state.category = category
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  [LOGOUT](state) {
    state.token = ''
    state.user = {}
    localStorage.removeItem('token_key')
  }

}
