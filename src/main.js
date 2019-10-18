import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import { ref } from './db'

new Vue({
  router,
  render: h => h(App),
  data: {
    ref: ref
  }
}).$mount('#app')
