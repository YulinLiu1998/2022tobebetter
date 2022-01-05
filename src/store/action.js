import { getAddress, getCategory, getShops } from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN
} from './mutation-types'

export default {
  async getAddressAction({ commit }) {
    const result = await getAddress(40.10038, 116.36867)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
  },
  async getCategoryAction({ commit }) {
    const result = await getCategory()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },
  async getShopsAction({ commit }) {
    const result = await getShops()
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
    }
  },
  async getUserInfoAction({ commit }, user) {
    commit(RECEIVE_USER, user)
  },
  async getTokenAction({ commit }, token) {
    commit(RECEIVE_TOKEN, token)
    localStorage.setItem('token_key', token)
  }
}
