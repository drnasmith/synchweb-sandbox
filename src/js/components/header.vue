<template>
    <div id="header" class="tw-flex tw-justify-between tw-items-center tw-h-10">
      <div class="">
        <router-link class="tw-mx-1" to="/"><span class="fa fa-2x fa-home"/><p class="tw-hidden md:tw-inline"> Home </p></router-link>
        <a class="tw-mx-1" v-if="isLoggedIn" href="#" v-on:click="logout"><span class="fa fa-2x fa-sign-out"/><p class="tw-hidden md:tw-inline"> Logout </p></a>
        <router-link class="tw-mx-1" v-else to="/login"><span class="fa fa-2x fa-sign-in"/> <p class="tw-hidden md:tw-inline"> Login </p></router-link>
      </div>
      <div v-if="isLoggedIn" class="tw-flex">
        <div v-if="isStaff" class="tw-flex"> <!-- Staff menus -->
          <!-- <a v-for="(item, index) in staff_menus" 
            :key="index" 
            class="tw-mx-1" 
            :href="item.link"
            :alt="item.description">
            <span class="fa fa-2x" v-bind:class="item.icon"></span></a> -->
          <a v-for="(item, index) in staff_menus" 
            :key="index" 
            class="tw-mx-1" 
            :href="item.link"
            :alt="item.description">
            <div class="tw-flex tw-flex-col tw-items-center">
              <i class="fa fa-2x" v-bind:class="item.icon"/>
              <p class="tw-text-xs">{{item.description}}</p>
            </div>
            </a>
        </div>
        <a class="tw-mx-1" href="/feedback">
          <div class="tw-flex tw-flex-col tw-items-center">
            <i class="fa fa-2x fa-comment"/>
            <p class="tw-text-xs">Feedback</p>
          </div>
        </a>
        <a class="tw-mx-1" href="/help">
          <div class="tw-flex tw-flex-col tw-items-center"  @mouseover="showHelpMenu = true" @mouseleave="showHelpMenu=false">
            <i class="fa fa-2x fa-question"/>
            <p class="tw-text-xs">Help</p>
          </div>
          <div v-if="showHelpMenu" >
            <div class="tw-absolute tw-right-0 tw-py-2 tw-w-48 tw-border-2 tw-bg-white hover:tw-bg-blue-400 tw-mt--1 tw-border-red-500">
                <router-link  to="/docs" class="tw-px-2 tw-block tw-text-gray-800 hover:tw-text-white">Tutorials</router-link>
            </div>
          </div>
        </a>
        <!-- <div class="tw-relative" @mouseover="showHelpMenu = true" @mouseleave="showHelpMenu=false">
          <a class="tw-mx-1" href="#" @click="showHelp = !showHelp" ><i class="fa fa-2x fa-question"/> Help</a>
          <div v-if="showHelpMenu">
            <div class="tw-absolute tw-right-0 tw-py-2 tw-w-48">
                <router-link  to="/docs" class="tw-block tw-px-2 tw-py-2 tw-bg-white hover:tw-bg-blue-400 tw-text-gray-800 hover:tw-text-white">Tutorials</router-link>
            </div>
          </div>
        </div> -->
      </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
      'prop': String,
      'staff_menus' : Array
    },
    data: function() {
      return {
        showHelp: true,
        showHelpMenu: false
      }
    },
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        isStaff : function(){ return this.$store.getters.isStaff},
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