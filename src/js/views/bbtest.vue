<template>
    <div id="bbtest" class="content">
        <h1>Backbone Labcontacts Test</h1>
        <form>
            <label for="prop">Prop</label>
            <input class="tw-border tw-shadow tw-rounded" type="text" name="prop" v-model="proposal"/>
            <button v-on:click.prevent="getLabContacts" class="button">Get</button>
        </form>
        <ul>
            <li v-for="(labcontact, index) in labcontacts" v-bind:key='index'>
                <router-link :to="'/contacts/'+labcontact.LABCONTACTID">{{labcontact.CARDNAME}}</router-link>
            </li>
        </ul>
        <p>There are {{total}} labcontacts</p>
    </div>
</template>

<script>
import Backbone from 'backbone';
import LabContactModel from '../models/labcontact.js'
import LabContactCollection from '../collections/labcontacts.js'

export default {
    name: 'bbtest',

    data: function() {
        return {
            total: 0,
            labcontacts: [],
            proposal: '',
            lcs: null,
        }
    },
    computed: {
        proposal: function() {
            return this.$store.getters.currentProposal
        },

    },
    created: function() {
        // Get visits for this user
        this.lcs = new LabContactCollection()
        this.getLabContacts()   
    },
    methods: {

        getLabContacts: function() {
            let self = this
            this.lcs.fetch({
                success: function(collection, response, options) {
                    // Indicate success and reset form
                    self.labcontacts = collection.toJSON()
                    self.total = collection.length
                    console.log("Labcontacts = " + JSON.stringify(self.labcontacts))
                    console.log("Total Records = " + collection.totalRecords)
                },
                error: function(collection, response, options) {
                    console.log("Something went wrong submitting this feedback, please try again")
                }
            })
        }
    }
}
</script>