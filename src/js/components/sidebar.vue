<template>
    <div class="tw-flex tw-flex-col tw-content-background md:tw-bg-gray-200 md:tw-flex-row tw-justify-center tw-my-2 md:tw-mx-4">
        <div class="md:tw-flex-1 tw-py-4 tw-sidebar-mobile-background hover:tw-bg-gray-100 tw-border tw-border-gray-900 tw-rounded tw-text-center">
            <a href="/proposals" class="tw-text-gray-900 tw-text-center tw-text-sm">Proposals</a>
        </div>
        <div class="md:tw-flex-1 tw-py-4 tw-sidebar-mobile-background hover:tw-bg-gray-100 tw-border tw-border-gray-900 tw-rounded">
            <p class="tw-text-gray-900 tw-text-center tw-text-sm">{{proposal ? proposal : 'No Proposal'}}</p>
        </div>
    
        <div class="md:tw-flex-1 tw-py-4 tw-sidebar-mobile-background hover:tw-bg-gray-100 tw-border tw-border-gray-900 tw-rounded tw-w-auto">
            <p class="tw-text-gray-900 tw-text-center tw-text-sm">Extra</p>
        </div>
    
        <div class="md:tw-flex-1 tw-py-4 tw-sidebar-mobile-background hover:tw-bg-gray-100 tw-border tw-border-gray-900 tw-rounded">
            <p class="tw-text-gray-900 tw-text-center tw-text-sm">Feedback</p>
        </div>
        <div class="md:tw-flex-1 tw-py-4 tw-sidebar-mobile-background hover:tw-bg-gray-100 tw-border tw-border-gray-900 tw-rounded">
            <p class="tw-text-gray-900 tw-text-center tw-text-sm">Help</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',

    computed: {
        proposal: function() {
            return this.$store.getters.currentProposal
        }
    }
}
</script>