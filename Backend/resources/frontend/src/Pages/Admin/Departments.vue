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
                    :to="{ name:'admin.departments.view', params:{ id:department.id} }"
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
            <NewDepartmentModal
                    @departmentSaved="fetchDepartments"
                    @close="closeDeptModal"
                    :toggle="showNewDepartmentModal"
            />

            <v-fab-transition>
                <v-btn
                        fab
                        dark
                        bottom
                        right
                        class="v-btn--example"
                        color="success"
                        @click="showNewDepartmentModal = true"
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
    import NewDepartmentModal from "../../components/NewDepartmentModal";
export default {
    name: "Departments",
    components:{
        Loader,NewDepartmentModal
    },
    data(){
        return{
            departments:null,
            loading:true,
            showNewDepartmentModal:false
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
        },

        async closeDeptModal(){
            this.showNewDepartmentModal =false
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
