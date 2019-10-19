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
  clue: -1,
  adhoc: ""
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

  if (dash.clue >= 0) {
    vue.clue = dash.clues[dash.clue]
  } else {
    vue.clue = {
      file: 'empty.jpg'
    }
  }

  vue.adhoc = dash.adhoc
  if (vue.adhoc != "") {
    vue.clue = {
      file: 'empty.jpg'
    }
  }

  if (dash.reload == true) {
    // RELOAD CLIENT 
    console.log(`Reloading client...`);
    snapshot.ref.update( { reload: false } )
    setTimeout(()=>{
       window.location.replace(window.location.origin)
    }, 500)
  }

  if (dash.route != router.currentRoute.name) {
    console.log(`Changing from ${router.currentRoute.name} to ${dash.route}`)
    if (dash.route == "home") {
      router.push("/")
    } else {
      router.push(dash.route)
    }
  }
})
