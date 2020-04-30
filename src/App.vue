<template>
  <div class="tw-bg-content-background">
    <notification/>
    <header-menu v-bind:prop="proposal" v-bind:staff_menus="menus"/>

    <div class="tw-mx-auto"> <!-- Popout menu for mobile screens -->
        <sidebar :menu="proposal_menu"/>
    </div>

    <div class="tw-w-10/12 tw-mx-auto"> <!-- Sets the main width of the content on screen -->
        <navbar :menu="proposal_menu"/>
        <motd :message="motd"/>

        <div class="tw-w-full tw-mx-2">
          <router-view></router-view>
        </div>

        <div id="marionette-container"></div>
    </div>

    <footer-panel />
  </div>
</template>


<script>
import Backbone from 'backbone'
import Header from 'components/header.vue'
import Footer from 'components/footer.vue'
import Sidebar from 'components/sidebar.vue'
import Navbar from 'components/navbar.vue'
import Motd from 'components/utils/motd.vue'
import Notification from 'components/utils/notification.vue'

export default {
    name: 'App',
    components: {
        'header-menu': Header,
        'footer-panel': Footer,
        'navbar': Navbar,
        'sidebar': Sidebar,
        'motd': Motd,
        'notification': Notification,
    },
    data: function() {
      return {
        menus: [
          {icon: 'fa-line-chart', link: '/reporting', description: 'Reporting'},
          {icon: 'fa-image', link: '/imaging', description: 'Imaging'},
          {icon: 'fa-cogs', link: '/settings', description: 'Overview'},
          {icon: 'fa-pie-chart', link: '/stats', description: 'Stats'},
          {icon: 'fa-truck', link: '/dewars', description: 'Logistics'},
        ],
        proposal_menu: [
          {link: '/shipments', name: 'Shipment'},
          {link: '/contacts', name: 'Contacts'},
          {link: '/proteins', name: 'Proteins'},
          {link: '/dewars', name: 'Registered Dewars'},
        ],
        motd: 'This is the message of the day'
      }
    },
    computed: {
      proposal: function() {
        return this.$store.getters.currentProposal
      },
      token: function() {
        return this.$store.getters.token
      },
    },
    created: function () {
      // Do we have a local token?
      let token = sessionStorage.getItem('token')
      if (token) {
        // Ensure we update our token and set the auth key
        this.$store.commit('auth_success', token, '')
      }
    },
    methods: {
    }
}
</script>

<style>
</style>
