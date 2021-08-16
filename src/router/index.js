import Vue from 'vue'
import VueRouter from 'vue-router'

//pages

import Home from '@/pages/Home.vue'
import Done from '@/pages/Done.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/done',
    name: 'Done',
    component: Done
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
})

export default router

