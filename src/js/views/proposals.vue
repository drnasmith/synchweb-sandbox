<template>
    <div id="proposals" class="content">
        <h1>Proposals View</h1>
        <ul>
            <li v-for="(proposal, index) in proposals" v-bind:key='index'>
                <a href='#' v-on:click.prevent="onSelectProposal(proposal.PROPOSALCODE+proposal.PROPOSALNUMBER)">{{proposal.TITLE}}</a>
            </li>
        </ul>
        <router-link to="shipments/">View Shipments</router-link>
        <router-link to="contacts/">View Lab Contacts</router-link>
        
        <p>There are {{total}} proposals</p>
    </div>
</template>

<script>
export default {
    name: 'Proposals',

    data: function() {
        return {
            total: 0,
            proposals: []
        }
    },
    created: function() {
        // Get visits for this user
        this.getProposals()
        this.getTypes()
    },

    methods: {
        onSelectProposal: function(prop) {
            this.$store.commit('save_proposal', prop)
        },
        getTypes: function() {
            let url = this.$store.getters.apiRoot + 'proposal/type'
            let params = ''

            this.debugRequest(url, params)
        },
        debugRequest: function(url, params) {
            this.$http.get(url, params)
            .then(resp => {
                console.log(JSON.stringify(resp.data))
            })
            .catch(err => {
                console.log("Error getting proposals" + err)
            })
        },
        getProposals: function() {
            let self = this
            let url = this.$store.getters.apiRoot + 'proposal'
            let params = ''
            this.$http.get(url, params)
            .then(resp => {
                self.total = resp.data.total
                self.proposals = resp.data.data
                console.log(self.total)
                console.log(self.proposals)
            })
            .catch(err => {
                console.log("Error getting proposals" + err)
            })
        }
    }
}
</script>