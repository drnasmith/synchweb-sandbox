<template>
    <div id="visits" class="content">
        <h1>Visits View</h1>
        <ul>
            <li v-for="(visit, index) in visits" v-bind:key='index'>
                {{visit.VISIT}}
            </li>
        </ul>
        <p>There are {{total}} proposals</p>
    </div>
</template>

<script>
import Backbone from 'backbone'

export default {
    name: 'Visits',

    data: function() {
        return {
            total: 0,
            visits: []
        }
    },

    created: function() {
        let self = this
        // Get visits for this user
        let url = this.$store.getters.apiRoot + '/proposal/visits'
        Backbone.ajax({
            url: url,
            data: {'all': '1'},
            success: function(resp) {
                console.log(JSON.stringify(resp.data))
                self.total = resp.data.total
                self.visits = resp.data.data
                console.log(self.total)
                console.log(self.visits)
            },
            error: function(err) {
              console.log("Error getting visits" + err)
            }
        })
    }
}
</script>