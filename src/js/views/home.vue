<template>
    <div id="home" class="content">
        <h1>Home View</h1>
        <div v-if="isLoggedIn">
            <p>Select from your list of proposals by clicking on 'My Proposals' in the header</p>

            <div class="content">
                <h1 class="tw-text-gray-900 tw-text-xl tw-border-black tw-border-b tw-mb-2">Current / Next Visits</h1>
                <!-- Section for current/next visits -->
                <div class="tw-flex tw-flex-wrap">
                    <!-- Section for the first row (next visits) Set size in this outer class... -->
                    <div v-for="visit in visits" v-bind:key="visit.SESSIONID" class="tw-w-full sm:tw-w-1/5">
                        <!-- The actual card with infor that can set borders, text etc... -->
                        <div class="tw-border tw-text-sm tw-p-4 tw-m-1 tw-bg-gray-200 tw-shadow-lg tw-object-fill"
                            v-bind:class="{'tw-border-green-400': visit.ACTIVE == '1'}">
                            <!-- Each visit in the row/group-->
                            <div class="tw-flex tw-justify-between">
                                <!-- First line contains beamline on left with buttons on right-->
                                <div class="">
                                    <span class="tw-font-bold">{{visit.BL}}</span>
                                </div>
                                <div class="tw-flex tw-flex-row-reverse tw-m-0">
                                    <i class="tw-border tw-bg-gray-200 hover:tw-bg-gray-300 tw-p-1 fa fa-truck"></i>
                                    <i class="tw-border tw-bg-gray-200 hover:tw-bg-gray-300 tw-p-1 fa fa-users"></i>
                                    <i class="tw-border tw-bg-gray-200 hover:tw-bg-gray-300 tw-p-1 fa fa-pie-chart"></i>
                                </div>
                            </div>
                            <a v-bind:href="visit.VISIT" class="tw-text-sm tw-tracking-wide tw-leading-loose tw-underline">{{visit.VISIT}}</a>
                            <p class="tw-text-xs">Start: {{visit.ST}}</p>
                            <p class="tw-text-xs">End: {{visit.EN}}</p>
                            <p class="tw-text-xs">LC: {{visit.LC.substring(0,20)}}...</p>    
                            <p class="tw-text-xs">SessionType: {{visit.SESSIONTYPE ? visit.SESSIONTYPE : 'Not set'}}</p>    
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div v-else>
            <p>Login to see visits/proposals etc</p>
        </div>
    </div>
</template>

<script>
import Backbone from 'backbone'

export default {
    name: 'Home',
    data() {
        return {
            visits: [{
            "ACTIVE": "1",
            "CAMS": "1",
            "VISIT": "nt23570-15",
            "ST": "09:00 01-07-2019",
            "EN": "20:00 08-07-2019",
            "STISO": "2019-07-01T09:00:00",
            "ENISO": "2019-07-08T20:00:00",
            "SESSIONID": "27420144",
            "VIS": "15",
            "BL": "i23",
            "LC": "Dr Vitaliy Mykhaylyk",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": null,
            "COMMENT": null,
            "DCCOUNT": "99",
            "TYPE": "mx"
        },
        {
            "ACTIVE": "0",
            "CAMS": "0",
            "VISIT": "mx19880-41",
            "ST": "03:00 01-07-2019",
            "EN": "09:00 01-07-2019",
            "STISO": "2019-07-01T03:00:00",
            "ENISO": "2019-07-01T09:00:00",
            "SESSIONID": "27420459",
            "VIS": "41",
            "BL": "i04-1",
            "LC": "Mr Jose Brandao-Neto",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": null,
            "COMMENT": null,
            "DCCOUNT": "89",
            "TYPE": "mx"
        },
        {
            "ACTIVE": "0",
            "CAMS": "0",
            "VISIT": "mx19301-28",
            "ST": "02:00 01-07-2019",
            "EN": "09:00 01-07-2019",
            "STISO": "2019-07-01T02:00:00",
            "ENISO": "2019-07-01T09:00:00",
            "SESSIONID": "27414323",
            "VIS": "28",
            "BL": "i04",
            "LC": "Dr Dave Hall",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": "Compulsorily Remote",
            "COMMENT": null,
            "DCCOUNT": "97",
            "TYPE": "mx"
        },
        {
            "ACTIVE": "0",
            "CAMS": "0",
            "VISIT": "mx17251-8",
            "ST": "02:00 01-07-2019",
            "EN": "09:00 01-07-2019",
            "STISO": "2019-07-01T02:00:00",
            "ENISO": "2019-07-01T09:00:00",
            "SESSIONID": "27415145",
            "VIS": "8",
            "BL": "i03",
            "LC": "Dr Katherine McAuley",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": "Compulsorily Remote",
            "COMMENT": null,
            "DCCOUNT": 0,
            "TYPE": "mx"
        },
        {
            "ACTIVE": "1",
            "CAMS": "1",
            "VISIT": "lb22688-7",
            "ST": "17:00 01-07-2019",
            "EN": "09:00 08-08-2019",
            "STISO": "2019-07-01T17:00:00",
            "ENISO": "2019-08-08T09:00:00",
            "SESSIONID": "27413591",
            "VIS": "7",
            "BL": "i04-1",
            "LC": "Miss Louise Dunnett, Mr Jose Brandao-Neto, Dr Ailsa Powell, Mr Jose Brandao-Neto, Dr Anthony Aimon, Miss Louise Dunnett, Prof Frank von Delft, Dr Ailsa Powell, Dr Romain Talon, Miss Louise Dunnett, Dr Anthony Aimon, Mr Jose Brandao-Neto, Dr Alexandre Dias",
            "COMMENTS": null,
            "SCHEDULED": "0",
            "SESSIONTYPE": null,
            "COMMENT": null,
            "DCCOUNT": 0,
            "TYPE": "mx"
        },
        {
            "ACTIVE": "0",
            "CAMS": "0",
            "VISIT": "mx17221-90",
            "ST": "17:00 03-07-2019",
            "EN": "09:00 04-07-2019",
            "STISO": "2019-07-03T17:00:00",
            "ENISO": "2019-07-04T09:00:00",
            "SESSIONID": "27414599",
            "VIS": "90",
            "BL": "i03",
            "LC": "Mr Mark Williams",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": null,
            "COMMENT": null,
            "DCCOUNT": "199",
            "TYPE": "mx"
        },
        {
            "ACTIVE": "0",
            "CAMS": "0",
            "VISIT": "mx17221-90",
            "ST": "17:00 30-07-2019",
            "EN": "09:00 31-07-2019",
            "STISO": "2019-07-30T17:00:00",
            "ENISO": "2019-07-31T09:00:00",
            "SESSIONID": "27414599",
            "VIS": "90",
            "BL": "i03",
            "LC": "Mr Mark Williams",
            "COMMENTS": null,
            "SCHEDULED": "1",
            "SESSIONTYPE": null,
            "COMMENT": null,
            "DCCOUNT": "199",
            "TYPE": "mx"
        },
        ],

        }
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn
        }
    },
    created: function() {
        let self = this
        // Get visits for this user
        let url = this.$store.getters.apiRoot + '/proposal/visits'
        Backbone.ajax({
            url: url,
            data: {'per_page': 15, 'page': 1, 'prop': this.$store.getters.currentProposal},
            success: function(resp) {
                console.log(JSON.stringify(resp.data))
                self.total = resp.total
                self.visits = resp.data
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