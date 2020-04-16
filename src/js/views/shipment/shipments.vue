<template>
    <div id="shipments" class="content">
        <h1>Shipments</h1>
        <!-- 
            This allows shipment to manage its sub-routes 
            The onNavigate is emitted by children to navigate between components
        -->
        <router-view v-on:navigate="onNavigate"></router-view>
    </div>
</template>

<script>
import Shipments from '../../collections/shipments.js'

export default {
    name: 'shipments',

    methods: {
        onNavigate: function(payload) {
            if (payload) {
                this.$router.push({name: payload})
            } else {
                // If no named route simply go back
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style scoped>

</style>