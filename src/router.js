import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Home from 'views/home.vue'
import Login from 'views/login.vue'
import Visits from 'views/visits.vue'
import NoPage from 'views/nopage.vue'
import Proposals from 'views/proposals.vue'
import Proteins from 'views/proteins.vue'
import Dewars from 'views/registeredDewars.vue'
import Feedback from 'views/feedback/feedback.vue'

import ShipmentRoutes from 'views/shipment/routes.js'
import ContactRoutes from 'views/contacts/routes.js'
import CalendarRoutes from 'modules/calendar/vue-routes.js'

import {routes as LegacyRoutes} from 'modules/contact/vue-routes.js'

Vue.use(Router)

// First initailise the store - this checks any values saved in sessionStorage
// store.dispatch("initialise")

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ispyb/ispyb',
    name: 'ispybHome',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/nopage',
    name: 'nothing',
    component: NoPage
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

let router = new Router({
  mode: 'history',
  routes: routes
})

router.addRoutes(ShipmentRoutes)
router.addRoutes(ContactRoutes)
router.addRoutes(CalendarRoutes)
router.addRoutes(LegacyRoutes())  

var parseQuery = function(path) {
  var str = path.replace(/\?/, '').split(/&/)
  var pairs = {}
  _.each(str, function(v) {
      var kv = v.split(/=/)
      pairs[kv[0]] = kv[1]
  })

  console.log('pairs', pairs)

  if ('prop' in pairs) {
    return pairs.prop
  }
  // sessionStorage.setItem('prop', pairs.prop)
}

router.beforeEach((to, from, next) => {
  console.log("router.beforeEach to: " + to.path + ", from: " + from.path)

  if (to.matched.length === 0) {
    console.log("Page Not Found")
    next('/nopage')
  }
  var prop = parseQuery(to.path)

  store.dispatch('log', to.path)

  if ( ! store.state.token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }

})

export default router