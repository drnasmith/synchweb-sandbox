<template>
<section id="navbar" class="">
    <div v-if="currentProposal" class="tw-flex tw-justify-between tw-items-center tw-h-8 tw-bg-gray-300">
      <!-- Left aligned items -->
      <div class="tw-flex">
        <NavbarMenuItem :title="currentProposal" :menu="proposalMenu"/>
        <NavbarMenuItem title="Projects" :menu="projectMenu"/>
      </div>
      <!-- Right aligned items -->
      <div class="tw-flex">
        <!-- <a class="tw-mx-1" href="#"><i class="fa fa-2x fa-comment"/> Feedback</a>
        <div class="tw-relative" @mouseover="showHelpMenu = true" @mouseleave="showHelpMenu=false">
          <a class="tw-mx-1" href="#" ><i class="fa fa-2x fa-question"/> Help</a>
          <div v-if="showHelpMenu">
            <div class="tw-absolute tw-right-0 tw-py-2 tw-w-48">
                <router-link  to="/docs" class="tw-block tw-px-2 tw-py-2 tw-bg-white hover:tw-bg-blue-400 tw-text-gray-800 hover:tw-text-white">Tutorials</router-link>
            </div>
          </div>
        </div> -->
      </div>
    </div>
</section>
</template>

<script>
import NavbarMenuItem from './navbarmenuitem.vue'

export default {
    name: 'Navbar',

    components: {
      NavbarMenuItem
    },

    props: {
      'prop': String,
    },
    data: function() {
      return {
        showHelpMenu: false,
        proposalMenu: [
          {i: 0, link: '/shipments', name: 'Shipment'},
          {i: 1, link: '/dewars', name: 'Registered Dewars'},
          {i: 2, link: '/proteins', name: 'Proteins'},
          {i: 3, link: '/contacts', name: 'Lab Contacts'}
        ],
        projectMenu: [
          {i: 0, link: '#', name: 'Project Item 1'},
          {i: 1, link: '#', name: 'Project Item 2'},
          {i: 2, link: '#', name: 'Project Item 3'}
        ],
      }
    },
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        currentProposal : function(){ return this.$store.getters.currentProposal}
    },
    methods: {
    }
}
</script>