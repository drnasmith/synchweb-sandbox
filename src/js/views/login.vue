<template>
    <div id="vue-login" class="content">
        <p class="tw-m-4 tw-p-4 tw-text-4xl tw-text-center tw-mx-auto tw-border-b tw-border-gray-500">SynchWeb Experiment Information Management</p>

        <h1>Login View</h1>
            <form class="tw-w-1/2  tw-mx-auto tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4">
                <div class="tw-mb-4">
                    <label class="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="login">Username (fedid)</label>
                    <input class="tw-shadow tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline" v-model="username" type="text" name="login"/>
                </div>
                <div class="tw-mb-4">
                    <label class="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="password">Password</label>
                    <input class="tw-shadow tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline" v-model="password" type="password" name="password"/>
                </div>
                <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-shadow-outline" v-on:click="onSubmit">Login</button>
            </form>
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    name: 'Login',
    props: [
        'redirect' // For future if we need to handle cas authentication and multiple redirects
    ],
    data: function() {
        return {
            username: '',
            password: '',
            message: '',
            redirectUrl: '/current'
        }
    },
    
    mounted: function() {
        console.log("Login mounted - redirect = " + this.$route.query.redirect)
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault()
            console.log("Login: " + this.username + ":" + this.password)

            let credentials = { 'login': this.username, 'password': this.password }

            this.$store.dispatch('login', credentials)
            .then(() => {
                this.$store.dispatch('get_user')
                this.$router.push(this.redirectUrl)
            })
            .catch(err => console.log(err))

        },
        saveUrl: function(url) {
            // Save the URL we should redirect to
            if (url) {
                this.redirectUrl = url
            }
        }
    },
    beforeRouteEnter: function(to, from, next) {
        if (to.query.redirect) {
            next(vm => vm.saveUrl(to.query.redirect))
        } else {
            next()
        }
    },
}
</script>