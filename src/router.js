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
    props: true, // this will mean redirect query also passed to login as prop
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

// Everything is protected apart from / and /login
router.beforeEach((to, from, next) => {
  console.log("router.beforeEach to: " + to.path + ", from: " + from.path)
  console.log("router.beforeEach to.redirect: " + to.query.redirect)

  if (to.matched.length === 0) {
    console.log("Page Not Found")
    next('/nopage')
  }

  // Check if we should extract proposal from url
  var prop = parseQuery(to.path)

  if (prop) {
    store.commit('save_proposal', prop)
  }

  store.dispatch('log', to.path)

  // Are we authenticated
  if ( ! store.state.token ) {
    // If we are on the main page or a login page that's ok 
    if (to.path === '/' || to.path === '/login') {
      console.log("router.beforeEach normal navigation to login")
      next()
    } else {
      console.log('router.beforeEach redirecting to login to: ' + to.path + ', from: ' + from.path)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })  
      // next()
    }
  } else {
    console.log("router.beforeEach user already logged in")
    next()
  }
})

router.afterEach((to, from) => {
  // If we have been redirected to the login page, go back to the referrer
  if (to.path === '/login' && from.path !== '/') {
    console.log("Router.afterEach login redirect...")
  }
})
export default router