<template>
    <div id="header" class="tw-bg-blue-500">
        <router-link to="/"><span class="fa fa-2x fa-home"/> Home </router-link>
          <a v-if="isLoggedIn" href="#" v-on:click="logout"><span class="fa fa-2x fa-sign-out"/> Logout </a>
          <router-link v-else to="/login"><span class="fa fa-2x fa-sign-in"/> Login </router-link>
    </div>
</template>

<script>
export default {
    name: 'Header',
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    }
}
</script>