<template>
    <div id="labcontacts" class="content">
        <h1>Labcontacts View</h1>
        <ul>
            <li v-for="(labcontact, index) in labcontacts" v-bind:key='index'>
                <router-link :to="labcontact.LABCONTACTID">{{labcontact.CARDNAME}}</router-link>
            </li>
        </ul>
        <p>There are {{total}} labcontacts</p>
    </div>
</template>

<script>
import Backbone from 'backbone'

export default {
    name: 'labcontacts',

    data: function() {
        return {
            total: 0,
            labcontacts: []
        }
    },
    computed: {
        proposal: function() {
            return this.$store.getters.currentProposal
        }
    },
    created: function() {
        // Get visits for this user
        this.getLabContacts()
    },
    methods: {

        getLabContacts: function() {
            let self = this
            let url = this.$store.getters.apiRoot + '/contact'
            let params = {prop: this.proposal}
            Backbone.ajax({
                url: url, 
                data : params,
                success: function(resp) {
                    self.total = resp.total
                    self.labcontacts = resp.data
                    console.log(self.total)
                    console.log(self.labcontacts)
                },
                error: function(err) {
                    console.log("Error getting labcontacts for proposal: " + self.proposal + ", err: " + err)
                }
            })
        }
    }
}
</script>