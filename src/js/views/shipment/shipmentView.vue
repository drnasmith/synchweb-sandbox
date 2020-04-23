<template>
    <div id="vue-view-shipment" class="content tw-container tw-mx-auto">
        <h1>Shipment {{id}}</h1>

    </div>
</template>

<script>
export default {
    name: 'AddShipment',
    props: {
        'id': Number
    },
    data: function() {
        return {
            shipmentName: '',
        }
    },
    created: function() {
        console.log("View Shipment Component")
    },
    methods: {
        onCancel: function() {
            this.$emit('navigate', '')
        },
        onSubmit: function() {
            console.log("Submit..")
        }
    }
}
</script>