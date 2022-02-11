<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>
            <NewDepartmentModal @close="closeDept" :toggle="newDeptModal" v-model="newDeptModal"/>
            <NewUserModal @close="closeUser" :toggle="newUserModal" v-model="newUserModal"/>
            <NewProjectModal @close="closeProject" :toggle="newProjectModal" v-model="newProjectModal"/>
            <NewTaskModal @close="closeTaskFunction" :toggle="newTaskModal" v-model="newTaskModal"/>

            <v-bottom-sheet
                    v-model="newItemModal"
                    persistent
            >
                <v-sheet class="newItemSheet" color="grey lighten-4">

                    <div class="py-3"  >
                        <v-row>
                            <v-col>
                                <v-card @click="newDeptDialog" rounded="lg"  class="d-flex flex-column  align-center">
                                    <v-card-title>
                                        <v-icon>mdi-office-building-cog</v-icon>
                                    </v-card-title>

                                    <v-card-text>
                                        New Department
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card rounded="lg" @click="newUserDialog" class="d-flex flex-column  align-center">
                                    <v-card-title>
                                        <v-icon>mdi-account-group</v-icon>
                                    </v-card-title>

                                    <v-card-text>
                                        New User
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>


                        <v-row>
                            <v-col>
                                <v-card rounded="lg" @click="newProjectDialog" class="d-flex flex-column  align-center">
                                    <v-card-title>
                                        <v-icon>mdi-briefcase-variant</v-icon>
                                    </v-card-title>

                                    <v-card-text>
                                        New Project
                                    </v-card-text>
                                </v-card>
                            </v-col>

                            <v-col>
                                <v-card rounded="lg" @click="newTaskDialogFunction" class="d-flex flex-column  align-center">
                                    <v-card-title>
                                        <v-icon>mdi-bell-check</v-icon>
                                    </v-card-title>

                                    <v-card-text>
                                        New Task
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                    <v-btn
                        class="mt-3 menu-btn"
                        icon
                        color="error"
                        @click="$router.go(-1)"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                </v-sheet>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script>
    import Loader from "../../components/Loader";
    import NewDepartmentModal from "../../components/NewDepartmentModal";
    import NewUserModal from "../../components/NewUserModal";
    import NewProjectModal from "../../components/NewProjectModal";
    import NewTaskModal from "../../components/NewTaskModal";
export default {
    name: "AdminAddNew",
    components:{
        Loader,
        NewDepartmentModal,
        NewUserModal,
        NewProjectModal,
        NewTaskModal

    },

    data(){
        return {
            loading:true,
            newItemModal:false,
            newUserModal:false,
            newProjectModal:false,
            newTaskDialog:false,
        }
    },

    async created(){
        this.loading = false
        this.newItemModal = true
        this.newDeptModal = false
        this.newUserModal = false
        this.newProjectModal = false
        this.newTaskModal = false
    },

    methods:{

        newDeptDialog(){
            this.newItemModal = false
            this.newDeptModal = true
        },

        closeDept(){
            this.newItemModal = true
            this.newDeptModal = false
        },


        newUserDialog(){
            this.newItemModal = false
            this.newUserModal = true
        },
        closeUser(){
            this.newItemModal = true
            this.newUserModal = false
        },

        newProjectDialog(){
            this.newItemModal = false
            this.newProjectModal = true
        },
        closeProject(){
            this.newItemModal = true
            this.newProjectModal = false
        },

        newTaskDialogFunction(){
            this.newItemModal = false
            this.newTaskModal = true
        },

        closeTaskFunction(){
            this.newItemModal = true
            this.newTaskModal = false
        }
    }
}
</script>

<style scoped>
.newItemSheet{
    text-align: center;
    width: 94% !important;
    margin-left: 3% !important;
    margin-right: 3% !important;
    margin-bottom: 5% !important;
    padding: 15px;
    border-radius: 10px;
}
</style>