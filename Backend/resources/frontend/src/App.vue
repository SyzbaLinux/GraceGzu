<template>
    <router-view></router-view>
</template>

<script>
    export default {

        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Task & Projects Manager',
            // all titles will be injected into this template
            titleTemplate: '%s | Grace Micah'
        }
    }

</script>

<style>
    .v-tab{
        text-transform: unset !important;
    }
    .v-btn--example{
        position: fixed !important;
        z-index: 10 !important;
        bottom: 10%;
        right: 2% !important;
    }

</style>
