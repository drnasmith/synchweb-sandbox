import Vue from 'vue'
import Router from 'vue-router'
import Home from './js/views/home.vue'
import Login from './js/views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
})
