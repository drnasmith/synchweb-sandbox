<template>
    <div id="shipments" class="content">
        <h1>Shipment List</h1>
        <p>There are {{total}} shipments for {{proposal}}</p>
        <button 
            class="button submit"
            v-on:click="onAddShipment"><i class="fa fa-plus icon"></i> Create New Shipment</button>

        <div class="tw-flex">
            <div 
                v-for="(shipment, index) in shipments" v-bind:key='index'
                @click="onSelect(shipment)"
                >
                <ShippingCard v-bind:shipment="shipment" message='Hello from shipments'></ShippingCard>
            </div>
        </div>
    </div>
</template>

<script>
import Shipments from 'collections/shipments.js'
import ShippingCard from './shipmentcard.vue'

export default {
    name: 'shipments',
    components: {
        ShippingCard,
    },

    data: function() {
        return {
            total: 0,
            shipments: [],
            shipmentCollection: null,
        }
    },
    computed: {
        proposal: function() {
            return this.$store.getters.currentProposal
        }
    },
    created: function() {
        // Get visits for this proposal
        this.shipmentCollection = new Shipments()
        this.getShipments()
    },

    methods: {

        getShipments: function() {
            let self = this
            this.shipmentCollection.fetch({
                success: function(collection,response,options) {
                    self.shipments = collection.toJSON()
                    self.total = collection.totalRecords
                }
            })
        },
        onAddShipment: function() {
            console.log("Create Shipment")
            // Can use a named route...
            this.$emit('navigate', {name: 'addShipment'})
        },
        onSelect: function(shipment) {
            console.log("View Shipment shipment " + shipment.SHIPPINGID)
            //...or a url
            this.$emit('navigate', {url: '/shipments/id/'+shipment.SHIPPINGID})
        }
    }
}
</script>

<style scoped>

</style>