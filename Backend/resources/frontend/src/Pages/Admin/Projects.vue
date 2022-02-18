<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>
            <v-card rounded="lg" outlined class="my-3" color="secondary" dark>
                <v-card-title>
                    Projects
                </v-card-title>
                <v-card-text class="mt-n4">
                    Listing all available projects

                    <v-text-field
                            label="Filter projects"
                            outlined
                            prepend-inner-icon="mdi-magnify"
                            dense
                            class="mt-3"
                            hide-details
                    />
                </v-card-text>
            </v-card>
            <v-card rounded="lg"
                    class="my-3"
                    outlined
                    v-for="(project, index) in projects"
                    :key="index"
                    :to="{name:'admin.project.view', params:{ id:project.id}}"
            >
                <v-progress-linear
                        value="60"
                        absolute
                        bottom
                        color="success"
                ></v-progress-linear>

                <v-card-title>
                      {{ project.name }}
                </v-card-title>
                <v-card-text class="mt-n4 d-flex justify-space-between">
                    <div>
                        <span>{{ project.tasks_count  }}</span> Tasks  <br>
                        <span>{{ project.departments_count }}</span> Departments <br>
                    </div>
                </v-card-text>
            </v-card>
            <v-fab-transition>
                <v-btn
                        fab
                        dark
                        bottom
                        right
                        class="v-btn--example"
                        color="success"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-fab-transition>
        </div>
    </div>
</template>

<script>
    import {default as axios} from "axios";
    import Loader from "../../components/Loader";
    export default {
        name: "projects",
        components:{
            Loader
        },
        data(){
            return{
                projects:null,
                loading:true
            }
        },

        async created() {
            this.fetchProjects()
        },


        methods:{
            async fetchProjects(){
                await axios.get('admin/projects').then(res=>{

                    this.projects = res.data
                    this.loading= false

                }).catch(error=>{

                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .v-btn--example{
        position: fixed !important;
        z-index: 10 !important;
        bottom: 10%;
        right: 2% !important;
    }
</style>
