import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Clue from './views/Clue.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/clue',
    name: 'clue',
    component: Clue
  }
]

const router = new VueRouter({
  routes
})

export default router
