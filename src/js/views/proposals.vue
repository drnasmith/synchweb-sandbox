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
        <router-link to="proteins/">View Proteins</router-link>
        <router-link to="dewars/">View Registered Dewars</router-link>

        <div class="wrapper">
            <div class="perp"></div>
            <table-component
                v-bind:headers="[{'title': 'Proposal Code', 'key':'PROPOSALCODE'}, 
                                {'title': 'Number', 'key':'PROPOSALNUMBER'},
                                {'title': 'Title', 'key':'TITLE'},
                                ]"
                v-bind:data="proposals"
                v-on:row-clicked="onSelected">
            </table-component>

            <!-- If using a backbone collection use the totalRecords field -->
            <pagination-component 
                initialPage="0"
                :totalRecords="total"
                v-on:page-changed="onPageChange">
            </pagination-component>

        </div>
    </div>
</template>

<script>
import Backbone from 'backbone'

import TableComponent from '../components/utils/table.vue'
import PaginationComponent from '../components/utils/pagination.vue'

export default {
    name: 'Proposals',
    components: {
        'table-component': TableComponent,
        'pagination-component': PaginationComponent,
    },
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
        onSelected: function(item) {
            console.log("Proposal Selected " + item['TITLE'])
            // Navigate to specific protein view...
        },
        onPageChange: function(pageNumber) {
            console.log("Re-order list of records...")
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