<template>
  <div id="wrapper">
    <Header />
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
    created: function () {
      // Do we have a local token?
      let token = localStorage.getItem('token')
      if (token) {
        // Ensure we update our token and set the auth key
        this.$store.commit('auth_success', token, '')
      }
      // this.$http.interceptors.response.use(undefined, function (err) {
      //   return new Promise(function (resolve, reject) {
      //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      //       this.$store.dispatch(logout)
      //     }
      //     throw err;
      //   });
      // });
    }
}
</script>

<style>
</style>
