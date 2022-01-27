<template>
    <h1>Manager</h1>
</template>

<script>
    export default {
        name: "ManagerLayout",
        watch:{
            authenticated(){
                if(!this.authenticated){
                    this.$router.push({ name: 'login'})
                }
            },
        },
    }
</script>

<style scoped>

</style>
