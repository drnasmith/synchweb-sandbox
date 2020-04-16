var Styles = require('./css/main.css')
var FontAwesome = require('font-awesome/css/font-awesome.css')
  
// With Webpack we use the maintenance flag in config.json
// to modify the main index page. Checking the flag here prevents the
// main js bundle from loading resources we don't need.
// require(['app'], function(app) {
//     "use strict"
//     if ( !config.maintenance ) {
//       app.start()
//     }
//   })

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Backbone from 'backbone'

import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    console.log("VM INSTANCE CREATED")
    this.initializeSync()
    this.initializeAjax()
  },
  methods: {
    initializeSync: function() {
      console.log("VM initializeSync")
      let self = this
      // Allow us to set a global base url for the API
      var oldSync = Backbone.sync;

      Backbone.sync = function(method, model, options) {
        var url = _.isFunction(model.url) ? model.url() : model.url;

        options = options || {};
        if (url) options.url = self.$store.getters.apiRoot+url
          
        return oldSync.call(this, method, model, options);
      }
    },
    initializeAjax: function() {
      let self = this
  // Pass prop to Backbone.ajax
      var oldAjax = Backbone.ajax
      Backbone.ajax = function(options) {
          var prop = self.$store.getters.currentProposal
          var token = self.$store.getters.token

          // FormData
          if (options.data instanceof FormData) {
              options.data.append('prop', prop)

          // JSON content
          } else if (options.contentType == 'application/json' || options.type == 'DELETE') {
              if (options.data) var tmp = JSON.parse(options.data)
              else var tmp = {}

              if (Array.isArray(tmp)) tmp[0].prop = prop
              else {
                if (!tmp.prop) tmp.prop = prop
              }
              options.data = JSON.stringify(tmp)

          // Append to object for anything else
          } else {
              if (!options.data) options.data = {}
              if (!options.data.prop) options.data.prop = prop
          }

          // Send token with requst
          if (token) {
              console.log("AJAX Setting Authorization header")
              options.beforeSend = function(request){
                  request.setRequestHeader('Authorization', 'Bearer ' + token);
              }
          }

          return oldAjax.call(this, options)
      }
    }
  }
}).$mount('#app')
