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
        'options': Object
    },
    data: function() {
        return {
            marionetteView: null,
            loaded: false
        }
    },
    computed: {
        prefetch: function() {
            if (this.options && (this.options.model || this.options.collection) ) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        // If we are prefetching data, wait for loaded state before rendering
        loaded: function(val) {
            if (val) {
                this.initialiseView()
            }
        }
    },
    mounted: function() {
        console.log("MarionetteViewWrapper::mounted" )
        if (this.prefetch === false) {
            // No prefetching, initialise now
            this.initialiseView()
        }
    },
    beforeUpdate: function() {
        console.log("MarionetteViewWrapper::beforeUpdate")
    },
    beforeDestroy: function() {
        // We still have access to this so tidy up the marionette view
        console.log("MarionetteViewWrapper::beforeDestroy ")
        this.marionetteView.destroy()
    },
    methods: {
        initialiseView: function() {
            if (this.mview) {

                let options = {}

                options = Object.assign(options, {el: '#marionette-view'})
                // Now merge in any passed parameters
                if (this.options) {
                    options = Object.assign(options, this.options)
                }
        
                console.log("MarionetteViewWrapper::initaliseView with el: " + options.el)
                this.marionetteView = new this.mview(options)
                this.marionetteView.render()
            
            } else {
                console.log("MarionetteViewWrapper::initaliseView could not find passed view")
            }
        },
        prefetchData: function() {
            if (this.options && this.options.collection) {
                this.fetchCollection(this.options.collection, this.options.queryParams)
            } else if (this.options && this.options.model) {
                this.fetchModel(this.options.model, this.options.queryParams)
            } else {
                console.log("MarionetteViewWrapper::prefetchData No options provided")
            }
        },
        fetchCollection: function(collection, queryParams) {
            let self = this
            collection.queryParms = queryParams ? queryParams : null
            collection.fetch({
                success: function() {
                    console.log("MarionetteViewWrapper:fetchCollection ok")
                    self.loaded = true
                },
                error: function() {
                    console.log("MarionetteViewWrapper:Error getting collection")
                    self.loaded = false
                }
            })
        },
        fetchModel: function(model, queryParams) {
            let self = this
            model.queryParms = queryParams ? queryParams : null
            model.fetch({
                success: function() {
                    console.log("MarionetteViewWrapper:fetchModel ok")
                    self.loaded = true
                },
                error: function() {
                    console.log("MarionetteViewWrapper:Error getting model")
                    self.loaded = false
                }
            })
        },
    },
    beforeRouteEnter: function(to, from, next) {
        console.log("MarionetteViewWrapper::beforeRouteEnter to: " + to.path + ", from: " + from.path)
        next(vm => vm.prefetchData())
    }
}
</script>