import Marionette from 'backbone.marionette'
import Options from 'models/options'

export function initializeMarionette() {
    window.app = new Marionette.Application()

    app.options = new Options()

    window.app.addRegions({
        // content: '#marionette-container',
        // dialog: DialogRegion,
    })
    

    app.addInitializer(function(options){
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
                
            $.when(app.loadopts()).done(function() {
                console.log("Options loaded for Marionette")
            })
        })
    })

    app.loadopts = function() {
        return app.options.fetch({
            data: { t: new Date().getTime() },
            success: function() {
                console.log("Marionette App Got Options")
            }
        })    
    }

    return app
}

