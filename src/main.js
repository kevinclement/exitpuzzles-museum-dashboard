import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.config.devtools = false

import { ref } from './db'
let data = {
  ref: ref,
  hours: -1,
  minutes: -1,
  router: 'home'
}

let vue = new Vue({
  router,
  render: h => h(App),
  data: data
}).$mount('#app')

ref.on('value', (snapshot) => {
  let dash = snapshot.val()
  if (dash == null) return

  vue.minutes = dash.minutes
  vue.hours = dash.hours

  // if (dash.reload === true) {
  //   // RELOAD CLIENT
  //   console.log(`Reloading client...`);
  //   // setTimeout(()=>{
  //   //   window.location.replace(window.location.origin)
  //   // }, 500)
  // }
})
