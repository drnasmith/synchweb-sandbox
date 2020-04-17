<template>
    <!-- Pass in headers and data as props-->
    <div class="content">
        <div class="tbl bg table">
            <table>
                <thead>
                    <th v-for="(header,index) in headers" :key="index" class="sortable renderable">{{header.title}}</th>
                </thead>
                <tbody>
                    <tr class="tw-border tw-bg-blue-500 tw-border-red-500" v-for="(row, index) in data" :key="index" v-on:click="$emit('row-clicked', row)">
                        <!-- Change row[header.key] to row.get(header.key) if using Backbone models -->
                        <td v-for="(header, index) in headers" :key="index" class="sortable renderable">{{row[header.key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'headers',
        'data'
    ]
}
</script>

<style scoped>

</style>