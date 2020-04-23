<template>
    <div id="home" class="content">
        <h1>Home View</h1>
        <div v-if="isLoggedIn">
            <router-link to="/visits">Visits</router-link>
            <router-link to="/proposals">Proposals</router-link>
        </div>
        <div v-else>
            <p>Login to see visits/proposals etc</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn
        }
    }
}
</script>