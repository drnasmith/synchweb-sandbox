<template>
    <div id="header" class="tw-flex tw-justify-between tw-items-center tw-h-8">
      <div class="">
        <router-link class="tw-mx-1" to="/"><span class="fa fa-2x fa-home"/> Home </router-link>
        <a class="tw-mx-1" v-if="isLoggedIn" href="#" v-on:click="logout"><span class="fa fa-2x fa-sign-out"/> Logout </a>
        <router-link class="tw-mx-1" v-else to="/login"><span class="fa fa-2x fa-sign-in"/> Login </router-link>
      </div>
      <div class="">
        <a class="tw-mx-1" href="#"><span class="fa fa-2x fa-bars"/></a>
      </div>
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