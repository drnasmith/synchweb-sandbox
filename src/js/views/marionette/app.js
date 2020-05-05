import Marionette from 'backbone.marionette'
import Options from 'models/options'

export default function MarionetteApp() {
    if (window.app) {       
        // Already initialised
        return window.app
    } else {
        console.log("Creating new Marionette Application")
        let application = new Marionette.Application()

        application.options = new Options()

        // Initialize Sync
        // let self = this
        // Allow us to set a global base url for the API
        var oldSync = Backbone.sync;
    
        Backbone.sync = function(method, model, options) {
          var url = _.isFunction(model.url) ? model.url() : model.url;
    
          options = options || {};
          if (url) {
              options.url = app.apiurl+url
              console.log("Backbone.sync option url: " + options.url)
          }

          return oldSync.call(this, method, model, options);
        }

        // Pass prop to Backbone.ajax
        var oldAjax = Backbone.ajax
    
        Backbone.ajax = function(options) {
            var prop = window.app.prop
            var token = window.app.token
            console.log("Backbone.ajax method url = " + options.url + ", app.prop = " + prop)
    
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
                options.beforeSend = function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + token);
                }
            }
    
            return oldAjax.call(this, options)
        }    
        // We don't need to use marionette router anymoew
        application.addInitializer(function(options){
            require([
                // 'modules/dc/router',
                // 'modules/proposal/router',
                // 'modules/shipment/router',
                // 'modules/samples/router',
                // 'modules/projects/router',
                // 'modules/test/router',
                // 'modules/contact/router',
                // 'modules/cell/router',
                // 'modules/assign/router',
                // 'modules/fault/router',
                // 'modules/stats/router',
                // 'modules/blstats/router',
                // 'modules/status/router',
                // 'modules/docs/router',
                // 'modules/feedback/router',
                // 'modules/mc/router',
                // 'modules/admin/router',
                // 'modules/imaging/router',
                // 'modules/types/em/relion/router',
                // 'modules/types/em/scipion/router',
            ], function() {
                application.options.fetch({
                    data: { t: new Date().getTime() },
                    success: function() {
                        console.log("MarionetteApplication Got Options")
                        application.initializeRegions()
                    },
                    error: function() {
                        console.log("MarionetteApplication Options not available")
                    }
                })
            })
        })

        application.initializeRegions = function() {
            console.log("MarionetteApplication::Initializing regions...")
            application.addRegions({
                content: '#marionette-wrapper'
            })
        }

        application.mobile = function() {
            return $(window).width() <= 600
        }

        window.app = application
            
        return application
    }
}

