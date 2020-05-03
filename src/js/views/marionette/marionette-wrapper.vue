<template>

        <div class="marionette-wrapper">
            <div id="marionette-view" class="content"></div>
        </div>
    
</template>

<script>
export default {
    name: 'MarionetteWrapper',
    props: {
        'mview': Function,
        'options': Object,
    },
    data: function() {
        return {
            marionetteView: null,
        }
    },
    mounted: function() {
        console.log("Marionette Wrapper mounted" )

        if (this.mview) {

            let options = {}

            options = Object.assign(options, {el: '#marionette-view'})
            // Now merge in any passed parameters
            if (this.options) {
                options = Object.assign(options, this.options)
            }

            this.marionetteView = new this.mview(options)
            this.marionetteView.render();

        } else {
            console.log("Marionette Wrapper could not find passed view")
        }
    },
    beforeDestroy: function() {
        // We still have access to this so tidy up the marionette view
        console.log("Marionette Wrapper View Before Destroy ")
        this.marionetteView.destroy()
    },
    methods: {
        prefetchData: function() {
            if (this.options && this.options.collection) {
                this.fetchCollection(this.options.collection, this.options.queryParams)
            } else if (this.options && this.options.model) {
                this.fetchModel(this.options.model, this.options.queryParams)
            } else {
                console.log("No options provided")
            }
        },
        fetchCollection: function(collection, queryParams) {
            console.log("MarionetteViewWrapper:fetchCollection: " + collection)
            collection.queryParms = queryParams ? queryParams : null
            collection.fetch({
                success: function() {
                    console.log("MarionetteViewWrapper:Got contacts from router guard")
                },
                error: function() {
                    console.log("MarionetteViewWrapper:Error getting lab contacts")
                }
            })
        },
        fetchModel: function(model, queryParams) {
            console.log("MarionetteViewWrapper:fetchModel: " + model)
            model.queryParms = queryParams ? queryParams : null
            model.fetch({
                success: function() {
                    console.log("MarionetteViewWrapper:Got model from router guard")
                },
                error: function() {
                    console.log("MarionetteViewWrapper:Error getting model")
                }
            })
        },
    },
    beforeRouteEnter: function(to, from, next) {
        console.log("Marionette View prefetch for: " + to.path)
        next(vm => vm.prefetchData())
    }
}
</script>