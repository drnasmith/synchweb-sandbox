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
      let application = MarionetteApp()
      // window.app = application
      application.type = 'mx'

      let self = this

      application.cookie = function(proposal, callbackFn) {
        console.log("Saving proposal from legacy cookie fn")

        self.$store.commit('save_proposal', proposal)

        if (callbackFn && callbackFn instanceof Function) {
          callbackFn()
        }
      }

      // Override Marionette Navigation method
      application.navigate = function(url) {
        console.log("Vue Navigate via router: " + url)
        self.$router.push(url)
      }

      application.getuser = function(options) {
        console.log("MARIONETTE GET USER CALLED " + JSON.stringify(options))
        // Backbone.ajax({
        //   url: application.apiurl+'/users/current',
        //   success: function(resp) {
        //       application.user = resp.user
        //       application.personid = resp.personid
        //       application.givenname = resp.givenname
        //       application.staff = resp.is_staff
        //       // Saving the default type for this user.
        //       // Needed for resetting the home view
        //       application.defaultType = resp.ty
        //       if (!application.type) application.type = resp.ty
    
        //       // Should put this somewhere else...
        //       application.user_can = function(perm) {
        //         return resp.permissions.indexOf(perm) > -1
        //       }
    
        //       application.cookie(null, function() {
        //         if (options && options.callback) options.callback()
        //       })
        //   },
    
        //   error: function() {
        //       if (options && options.callback) options.callback()
        //   }
    
        // })
      }

      application.start()

    },
    // initializeSync: function() {
    //   console.log("VM initializeSync")
    //   let self = this
    //   // Allow us to set a global base url for the API
    //   var oldSync = Backbone.sync;

    //   Backbone.sync = function(method, model, options) {
    //     var url = _.isFunction(model.url) ? model.url() : model.url;

    //     options = options || {};
    //     if (url) options.url = self.$store.getters.apiRoot+url
          
    //     return oldSync.call(this, method, model, options);
    //   }
    // },
    // initializeAjax: function() {
    //   console.log("VM initializeAjax")
    //   let self = this

    //   // Pass prop to Backbone.ajax
    //   var oldAjax = Backbone.ajax

    //   Backbone.ajax = function(options) {
    //     console.log("Backbone.ajax method")
    //       var prop = self.$store.getters.currentProposal
    //       var token = self.$store.getters.token

    //       // FormData
    //       if (options.data instanceof FormData) {
    //           options.data.append('prop', prop)
    //           console.log("Backbone.ajax formData instance - adding prop: " + prop)

    //       // JSON content
    //       } else if (options.contentType == 'application/json' || options.type == 'DELETE') {
    //         console.log("Backbone.ajax application/json instance  ")
    //         if (options.data) var tmp = JSON.parse(options.data)
    //           else var tmp = {}

    //           if (Array.isArray(tmp)) tmp[0].prop = prop
    //           else {
    //             if (!tmp.prop) tmp.prop = prop
    //           }
    //           options.data = JSON.stringify(tmp)

    //       // Append to object for anything else
    //       } else {
    //           console.log("Backbone.ajax <OTHER> instance  ")
    //           if (!options.data) options.data = {}
    //           if (!options.data.prop) options.data.prop = prop
    //       }

    //       // Send token with requst
    //       if (token) {
    //           options.beforeSend = function(request){
    //               request.setRequestHeader('Authorization', 'Bearer ' + token);
    //           }
    //       }

    //       return oldAjax.call(this, options)
    //   }
    // },
  }
}).$mount('#synchweb-app')
