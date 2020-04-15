import Vue from 'vue'
import Router from 'vue-router'
import Home from './js/views/home.vue'
import Login from './js/views/login.vue'
import Visits from './js/views/visits.vue'
import Proposals from './js/views/proposals.vue'
import Shipments from './js/views/shipments.vue'
import LabContacts from './js/views/labcontacts.vue'
import LabContact from './js/components/labcontact.vue'

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
    {
      path: '/shipments',
      name: 'shipments',
      component: Shipments,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: LabContacts,
    },
    {
      path: '/contacts/:id',
      name: 'contact',
      component: LabContact,
      props: true
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