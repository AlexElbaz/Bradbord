import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/class',
    name: 'Class',
    component: () => import(/* webpackChunkName: "class" */ '../views/Class.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/AddPosts',
    name: 'AddPosts',
    component: () => import(/* webpackChunkName: "login" */ '../views/AddPosts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
