var Styles = require('./css/main.css')
var FontAwesome = require('font-awesome/css/font-awesome.css')
  
import Vue from 'vue'
import Backbone from 'backbone'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'

import MarionetteApp from 'views/marionette/app.js'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(Vuelidate)

// First initailise the store - this checks any values saved in sessionStorage
store.dispatch("initialise")

var vm = new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    console.log("Vue INSTANCE CREATED")
    // this.initializeSync()
    // this.initializeAjax()
    this.initializeMarionette()
    // this.$router.loadRoutes()
  },
  methods: {
    initializeMarionette: function() {
      // Initialise the Marionette parts of the app.
      // The Router will have initialised the app object but there are things we need to integrate here
      // Mainly hooking old app methods into the vue router or vuex store
      let application = MarionetteApp()

      let self = this

      application.cookie = function(proposal, callbackFn) {
        console.log("Saving proposal from legacy cookie fn")

        self.$store.commit('save_proposal', proposal)

        if (callbackFn && callbackFn instanceof Function) {
          callbackFn()
        }
      }

      // Override Marionette Navigation method - hook into Vue router
      application.navigate = function(url) {
        self.$router.push(url)
      }

      // Define user permission method - hooked into store
      application.user_can = function(perm) {
        return self.$store.getters.permissions.indexOf(perm) > -1
      }

      // Method to retrieve user information
      // Don't think we need this as we can load from login component
      application.getuser = function(options) {
        if (self.$store.isLoggedIn) {
          self.$store.dispatch('get_user', options)  
        }
      }

      app.login = function(xhr) {
        // app.bc.reset([{ title: 'Login' }])
        // app.content.show(new LoginView())
        // We have experienced an error and need to login again
        // Message login session has expired...
        self.$store.commit('set_notification', {message: 'Authentication session has expired, please login again', level: 'error'})
        self.$store.dispatch('logout')
        self.$router.push('/login')
    }
      // We don't need to use marionette router anymoew
      application.addInitializer(function(options){
          console.log("Marionette::addInitializer from index.js")
          // Load options 
          application.options.fetch({
              data: { t: new Date().getTime() },
              success: function() {
                  console.log("MarionetteApplication Got Options")
                  application.initializeRegions()
                  // application.getuser()
                },
              error: function() {
                  console.log("MarionetteApplication Options not available")
              }
          })

      })

      application.start()

    },
  }
}).$mount('#synchweb-app')
