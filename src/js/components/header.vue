<template>
    <div id="header" class="tw-flex tw-justify-between tw-items-center tw-h-8">
      <div class="">
        <router-link class="tw-mx-1" to="/"><span class="fa fa-2x fa-home"/> Home </router-link>
        <a class="tw-mx-1" v-if="isLoggedIn" href="#" v-on:click="logout"><span class="fa fa-2x fa-sign-out"/> Logout</a>
        <router-link class="tw-mx-1" v-else to="/login"><span class="fa fa-2x fa-sign-in"/> Login </router-link>
        <router-link v-if="isLoggedIn" class="tw-mx-1" to="/proposals"><span class="fa fa-2x fa-file-text"/> My Proposals</router-link>
      </div>
      <div class="tw-flex">
        <a v-for="(item, index) in staff_menus" 
          :key="index" 
          class="tw-mx-1" 
          :href="item.link"
          :alt="item.description">
          <span class="fa fa-2x" v-bind:class="item.icon"></span></a>
        
        <a class="tw-mx-1" href="/feedback"><i class="fa fa-2x fa-comment"/> Feedback</a>
        <div class="tw-relative" @mouseover="showHelpMenu = true" @mouseleave="showHelpMenu=false">
          <a class="tw-mx-1" href="#" ><i class="fa fa-2x fa-question"/> Help</a>
          <div v-if="showHelpMenu">
            <div class="tw-absolute tw-right-0 tw-py-2 tw-w-48">
                <router-link  to="/docs" class="tw-block tw-px-2 tw-py-2 tw-bg-white hover:tw-bg-blue-400 tw-text-gray-800 hover:tw-text-white">Tutorials</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
      'prop': String,
      'staff_menus' : Object
    },
    data: function() {
      return {
        showHelpMenu: false
      }
    },
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        currentProposal : function(){ return this.$store.getters.currentProposal}
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