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
import Backbone from 'backbone'

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
    },

    methods: {
        onSelectProposal: function(prop) {
            this.$store.commit('save_proposal', prop)
        },

        getProposals: function() {
            let self = this
            let url = this.$store.getters.apiRoot + '/proposal'
            Backbone.ajax({
                url: url,
                success: function(resp) {
                    console.log(JSON.stringify(resp))
                    self.total = resp.total
                    self.proposals = resp.data
                    console.log(self.total)
                    console.log(self.proposals)
                },
                error: function(err) {
                    console.log("Error getting proposals" + err)
                }
            })
        }
    }
}
</script>