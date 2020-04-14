import Vue from 'vue'
import Router from 'vue-router'
import Home from './js/views/home.vue'
import Login from './js/views/login.vue'
import Visits from './js/views/visits.vue'
import Proposals from './js/views/proposals.vue'

Vue.use(Router)

let router = new Router({
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
    {
        path: '/visits',
        name: 'visits',
        component: Visits
    },
    {
        path: '/proposals',
        name: 'proposals',
        component: Proposals,
        meta: { 
          requiresAuth: true // For testing with secure routes below
        }
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login') 
//   } else {
//     next() 
//   }
// })

export default router