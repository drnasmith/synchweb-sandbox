<template>
  <div id="wrapper">
    <Header />
    <div class="cont_wrap">
        <div class="tw-w-full tw-mx-2">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>


<script>
import Header from './js/components/header.vue'

export default {
    name: 'App',
    components: {
        Header,
    }
}
</script>

<style>
</style>
