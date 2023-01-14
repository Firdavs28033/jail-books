import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
    meta: { hideHeader: true },
  },
  {
    path: '/jails',
    name: 'jails',
    component: () => import('../views/JailsView.vue')
  },
  {
    path: '/prisoners',
    name: 'prisoners',
    component: () => import('../views/PrisonersView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  // {
  //   path: '/prisonerform',
  //   name: 'prisonerform',
  //   component: () => import('../views/PrisonerFormView.vue')
  // },
  // {
  //   path: '/jailform',
  //   name: 'jailform',
  //   component: () => import('../views/JailFormView.vue')
  // }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
