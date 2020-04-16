<template>
  <div id="wrapper">
    <Header v-bind:prop="proposal" v-bind:staff_menus="menus"/>
    <div class="tw-container tw-mx-auto">
      <Sidebar />
      <div class="cont_wrap">
          <div class="tw-w-full tw-mx-2">
              <router-view></router-view>
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import Backbone from 'backbone'
import Header from './js/components/header.vue'
import Footer from './js/components/footer.vue'
import Sidebar from './js/components/sidebar.vue'

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        Sidebar,
    },
    data: function() {
      return {
        menus: [
          {icon: 'fa-cogs', link: '/settings', description: 'Overview'},
          {icon: 'fa-pie-chart', link: '/stats', description: 'Beamline Statistics'},
          {icon: 'fa-truck', link: '/dewars', description: 'Logistics'},
        ]
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
