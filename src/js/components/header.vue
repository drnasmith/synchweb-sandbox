<template>
    <div id="header" class="tw-bg-blue-500">
        <router-link to="/"><span class="fa fa-home"/> Home </router-link>
        <router-link to="/login"><span class="fa fa-sign-in"/> Login </router-link>
    </div>
</template>

<script>
export default {
	name: 'Header',
}
</script>