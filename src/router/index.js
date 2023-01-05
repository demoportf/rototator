import Vue from 'vue'
import VueRouter from 'vue-router'



import DashBoard from '../views/DashBoard.vue'
import ComPortScreen from '../views/ComPortScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/comport',
    name: 'ComPortScreen',
    component: ComPortScreen,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
