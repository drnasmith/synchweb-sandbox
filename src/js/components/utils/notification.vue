<template>
<section>

    <transition name="notify">
        <div v-if="message" class="notification tw-absolute tw-left-0 tw-right-0 tw-top-0 tw-flex tw-justify-center">
            <div class="tw-rounded tw-shadow tw-p-4 tw-w-full md:tw-w-1/2 tw-font-bold tw-border-2"
                :class="notificationClass">
                <span class="tw-font-bold">{{level | upper}}: </span>
                <span class="tw-font-normal">{{message}}</span>
            </div>
        </div>
    </transition>
</section>
</template>

<script>

export default {
    name: 'Notification',

    data: function() {
        return {
        }
    },
    filters: {
        upper: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase()
        }
    },
    watch: {
        message: function(val) {
            console.log("Notification message has changed")
            let self = this
            setTimeout(function() {
                self.$store.commit('clear_notification')
            }, 5000)
        }
    },
    computed: {
        message: function() {
            return this.$store.getters.notification.message
        },
        level: function() {
            return this.$store.getters.notification.level
        },
        // Calculate total number of pages
        notificationClass: function() {
            let classes = ""

            if (this.level === 'success') {
                classes += 'tw-border-green-500 tw-bg-green-200'
            } else if (this.level === 'info') {
                classes += 'tw-border-blue-500 tw-bg-blue-200'
            } else if (this.level === 'warning') {
                classes += 'tw-border-yellow-500 tw-bg-yellow-200'
            } else if (this.level === 'error') {
                classes += 'tw-border-red-500 tw-bg-red-200'
            } else {
                classes += 'tw-border-gray-500 tw-bg-gray-200'
            }
            return classes
        }
    },
    methods: {
    },
}
</script>

<style>
.notify-enter-active, .notify-leave-active {
  transition: opacity 0.5s;
}
.notify-enter, .notify-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
