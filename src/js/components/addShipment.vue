<template>
    <div id="vue-add-shipment" class="content tw-container tw-mx-auto">
        <h1>Create New Shipment</h1>

        <div class="tw-container tw-mx-auto tw-h-full tw-flex tw-justify-center tw-items-center">

            <div class="tw-w-full md:tw-w-1/2">
                <form>
                    <label>Shipping Name</label>
                    <input type="text" v-model="shipmentName"/>
                    <button class="button" v-on:click.prevent="onSubmit">Cancel</button>
                    <button class="button"  v-on:click.prevent="onCancel">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddShipment',
    data: function() {
        return {
            shipmentName: '',
        }
    },
    created: function() {
        console.log("Add Shipment Component")
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