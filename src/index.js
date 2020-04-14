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

import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
