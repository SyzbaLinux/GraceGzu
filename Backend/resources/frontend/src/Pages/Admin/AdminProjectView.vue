<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>
            <ProjectView @newTaskSaved="fetchProjectData" :project="project"></ProjectView>
        </div>
    </div>
</template>

<script>
    import Loader from "../../components/Loader";
    import ProjectView from "../../components/ProjectView";
    export default {
        name: "AdminProjectView",
        components: {
            Loader,ProjectView
        },
        data() {
            return {
                loading:true,
                project:null,
            }
        },
        created() {
            this.fetchProjectData()
        },
        methods: {

            async fetchProjectData(){
                this.loading = true
                await axios.get('admin/projects/'+this.$route.params.id).then(res=>{

                    this.project = res.data

                }).catch(error=>{
                    console.log(error)
                })


                this.loading = false
            },
        }
    }
</script>

<style scoped>

</style>
