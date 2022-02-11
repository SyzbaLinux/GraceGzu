<template>
    <h1>Admin</h1>
</template>

<script>
    export default {
        name: "AdminLayout",
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
