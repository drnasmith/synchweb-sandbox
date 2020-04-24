import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/home.vue'
import Login from 'views/login.vue'
import Visits from 'views/visits.vue'
import Proposals from 'views/proposals.vue'
import Proteins from 'views/proteins.vue'
import Dewars from 'views/registeredDewars.vue'
import Feedback from 'views/feedback/feedback.vue'

import ShipmentRoutes from 'views/shipment/routes.js'
import ContactRoutes from 'views/contacts/routes.js'

Vue.use(Router)

let routes = [
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
  {
    path: '/proteins',
    name: 'proteins',
    component: Proteins,
  },
  {
    path: '/dewars',
    name: 'dewars',
    component: Dewars,
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Feedback,
  },
]

routes.push(ShipmentRoutes)
routes.push(ContactRoutes)

let router = new Router({
  mode: 'history',
  routes: routes
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