<template>
    <router-view></router-view>
</template>

<script>
    export default {

        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Task & Projects Manager',
            // all titles will be injected into this template
            titleTemplate: '%s | Grace Mhike'
        }
    }

</script>
