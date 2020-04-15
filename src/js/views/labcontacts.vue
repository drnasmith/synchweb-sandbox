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

        debugRequest: function(url, params) {
            let self = this
            this.$http.get(url, params)
            .then(resp => {
                console.log(JSON.stringify(resp.data))
            })
            .catch(err => {
                console.log("Error getting Lab Contacts for Proposal: " + self.proposal + ", err: " + err)
            })
        },
        getLabContacts: function() {
            let self = this
            let url = this.$store.getters.apiRoot + 'contact'
            let params = {prop: this.proposal}
            this.$http.get(url, { 'params': params})
            .then(resp => {
                self.total = resp.data.total
                self.labcontacts = resp.data.data
                console.log(self.total)
                console.log(self.labcontacts)
            })
            .catch(err => {
                console.log("Error getting labcontacts for proposal: " + self.proposal + ", err: " + err)
            })
        }
    }
}
</script>