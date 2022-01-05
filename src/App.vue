<template>
  <div id="app">
    <router-view />
    <footer-guide />
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide.vue'
import { RECEIVE_USER } from './store/mutation-types.js'
export default {
  components: {
    FooterGuide
  },
  async mounted() {
    const result = await this.$API.autoLogin()
    console.log('打印输出', result)
    this.$store.commit(RECEIVE_USER, result.data)
  }
}
</script>
<style lang="stylus"></style>
