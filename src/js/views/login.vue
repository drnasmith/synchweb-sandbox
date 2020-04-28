<template>
    <div id="vue-login" class="content">
        <p class="tw-m-4 tw-p-4 tw-text-4xl tw-text-center tw-mx-auto tw-border-b tw-border-gray-500">SynchWeb Experiment Information Management</p>

        <h1>Login View</h1>
            <form class="tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4">
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
    data: {
        username: '',
        password: '',
        message: ''
    },
    
    created: function() {
        console.log("Login created")
    },
    mounted: function() {
        console.log("Login mounted")
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault()
            console.log("Login: " + this.username + ":" + this.password)

            // let formData = new FormData();
            // formData.append('login', this.username)
            // formData.append('password', this.password)

            let credentials = { 'login': this.username, 'password': this.password }

            this.$store.dispatch('login', credentials)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))

        }
    }
}
</script>