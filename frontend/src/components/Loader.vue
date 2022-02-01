<template>
    <div class="d-flex align-center justify-center h-50" v-if="loading">
        <div class="text-center">
            <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
            <span class="d-block">
                   Please wait...
               </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            loading:null
        },
        name: "LoaderCircle"
    }
</script>

<style scoped>
</style>