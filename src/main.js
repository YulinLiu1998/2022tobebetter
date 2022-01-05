import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as API from './api'
import './veeValidate/index.js'
import 'lib-flexible'
import './mock/mockServer.js'
import HeaderGuide from './components/HeaderGuide.vue'

import { Button, Dialog, Icon } from 'vant'
import i18n from './i18n'
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('HeaderGuide', HeaderGuide)

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Icon)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
