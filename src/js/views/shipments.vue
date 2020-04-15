<template>
    <div id="shipments" class="content">
        <h1>Shipments View</h1>
        <p>There are {{total}} shipments for {{proposal}}</p>
        <button 
            class="button submit"
            v-on:click="onAddShipment"><i class="fa fa-plus icon"></i> Create New Shipment</button>
        <div class="tw-flex">
            <div v-for="(shipment, index) in shipments" v-bind:key='index'>
                <ShippingCard v-bind:shipment="shipment" message='Hello from shipments'></ShippingCard>
            </div>
        </div>
    </div>
</template>

<script>
import ShippingCard from '../components/shipmentcard.vue'

export default {
    name: 'shipments',
    components: {
        ShippingCard,
    },

    data: function() {
        return {
            total: 0,
            shipments: []
        }
    },
    computed: {
        proposal: function() {
            return this.$store.getters.currentProposal
        }
    },
    created: function() {
        // Get visits for this proposal
        this.getshipments()
    },

    methods: {
        debugRequest: function(url, params) {
            this.$http.get(url, params)
            .then(resp => {
                console.log(JSON.stringify(resp.data))
            })
            .catch(err => {
                console.log("Error getting shipments" + err)
            })
        },
        getshipments: function() {
            let self = this
            let url = this.$store.getters.apiRoot + 'shipment/shipments'
            let params = {prop: this.proposal}
            this.$http.get(url, { 'params': params})
            .then(resp => {
                self.total = resp.data.total
                self.shipments = resp.data.data
                console.log(self.total)
                console.log(self.shipments)
            })
            .catch(err => {
                console.log("Error getting shipments" + err)
            })
        },
        onAddShipment: function() {
            console.log("Create Shipment")
        }
    }
}
</script>

<style scoped>

</style>