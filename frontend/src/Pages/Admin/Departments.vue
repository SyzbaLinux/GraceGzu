<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>
            <v-card rounded="lg" outlined class="my-3" color="info" dark>
                <v-card-title>
                    Departments
                </v-card-title>
                <v-card-text class="mt-n4">
                    Listing all available departments and leaders

                    <v-text-field
                            label="Filter Departments"
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
                    v-for="(department, index) in departments"
                    :key="index"
to=""
            >

                <v-card-title>
                    {{ department.title }}
                </v-card-title>
                <v-card-text class="mt-n4 d-flex justify-space-between">
                    <div>
                        <span>Leader: {{ department.owner.name }}</span> <br>
                        <span>{{ department.users.length }}</span> Users <br>
                        <span>{{ department.tasks.length }}</span> Completed Tasks / 100
                    </div>

                    <div>
                        <v-progress-circular value="0" :size="70" :width="7" color="purple"></v-progress-circular>
                    </div>
                </v-card-text>



            </v-card>
        </div>
    </div>
</template>

<script>
    import {default as axios} from "axios";
    import Loader from "../../components/Loader";
export default {
    name: "Departments",
    components:{
        Loader
    },
    data(){
        return{
            departments:null,
            loading:true
        }
    },

    async created() {
       this.fetchDepartments()
    },


    methods:{
        async fetchDepartments(){
            await axios.get('admin/department').then(res=>{

                this.departments = res.data
                this.loading= false

            }).catch(error=>{

                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

</style>