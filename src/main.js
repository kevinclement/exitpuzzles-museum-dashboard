import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.config.devtools = false

import { db, ref } from './db'
let data = {
  ref: ref,
  adhoc: "",
  clue: "",
  clues: [],
  hours: -1,
  minutes: -1,

  solved: false,
  runDate: undefined
}

let vue = new Vue({
  router,
  render: h => h(App),
  data: data
}).$mount('#app')

// track overall solved state of museum
db.ref('museum').child('devices/mausoleum').on('value', (snapshot) => {
  let mausoleum = snapshot.val()
  data.solved = mausoleum.solved
})

// track analytics runs
db.ref('museum/runs').orderByChild('timestamp').limitToLast(2000).on('value', (snapshot) => {
  snapshot.forEach(function(runSnap) {
    let run = runSnap.val()
    let key = runSnap.key

    if (run.finished == "") {
      data.runDate = date
    }
  })
})

ref.on('value', (snapshot) => {
  let dash = snapshot.val()
  if (dash == null) return

  vue.minutes = dash.minutes
  vue.hours = dash.hours
  vue.clue = dash.clue
  vue.adhoc = dash.adhoc
  vue.clues = dash.clues
  
  if (dash.reload == true) {
    // RELOAD CLIENT 
    console.log(`Reloading client...`);
    snapshot.ref.update( { reload: false } )
    setTimeout(()=>{
       window.location.replace(window.location.origin)
    }, 500)
  }

  let route = dash.clue == 'home' ? 'home' : 'clue'

  if (route != router.currentRoute.name) {
    console.log(`Changing from ${router.currentRoute.name} to ${route}`)
    if (route == "home") {
      router.push("/")
    } else {
      router.push("clue")
    }
  }
})

function playAudio(file) {
  let a = new Audio(file)
  var promise = a.play();
  if (promise) {
    promise.catch(function(error) { });
  }
}

setInterval(() => {
  let h = data.hours
  let m = data.minutes
  
  if (m == 0) {
    if (h > 0) {
      h = h - 1
      m = 60
    }
  } else if (data.minutes > 0) {
    m = m - 1

    // only play audio if we haven't solved the room
    if (!data.solved) { 
      if (h == 0 && m == 10) {
        console.log("Closing in 10 minutes")
        playAudio('/sounds/countdown_10min.1s_silence.wav')
      } else if (h == 0 && m == 30) {
        console.log("Closing in 30 minutes")
        playAudio('/sounds/countdown_30min.1s_silence.wav')
      } else if (h == 0 && m == 0) {
        console.log("Closed")
        playAudio('/sounds/countdown_finished.1s_silence.wav')
      }
    }
  }

  if (h != data.hours || m != data.minutes) {
    ref.update({
      minutes: m,
      hours: h
    })

    if (h == 0 && m == 0 && data.runDate){
      db.ref('museum/runs').child(data.runDate).update({
        closed: (new Date()).toLocaleString()
      })
    }
  }
}, 60000)
