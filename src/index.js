var Styles = require('./css/main.css')
// var Styles = require('./css/main.unminified.css')
var FontAwesome = require('font-awesome/css/font-awesome.css')

// With Webpack we use the maintenance flag in config.json
// to modify the main index page. Checking the flag here prevents the
// main js bundle from loading resources we don't need.
require(['app'], function(app) {
    "use strict"
    if ( !config.maintenance ) {
      app.start()
    }
  })
  