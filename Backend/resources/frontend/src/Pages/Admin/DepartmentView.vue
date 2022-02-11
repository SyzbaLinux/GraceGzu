<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>

            <v-toolbar
                color="primary"
                dark
                extended
                flat
            >
                <span @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon> Department View</span>
                <v-spacer/>
                <v-dialog
                    v-model="userDeptModal"
                    persistent
                    max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined fab color="white" small  v-bind="attrs" v-on="on">
                            <v-icon color="white">mdi-account-sync</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title >
                            Add Existing User
                        </v-card-title>

                        <v-divider></v-divider>
                        <v-card-text class="my-5">
                                <v-select
                                    :items="users"
                                    item-text="name"
                                    item-value="id"
                                    label="Select User"
                                    outlined
                                    dense
                                    v-model="userDept.user_id"
                                />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="error"
                                text
                                @click="userDeptModal = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="success"
                                @click="userSync()"
                                class="menu-btn"
                            >
                                Add User
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>


           <v-card    class="mx-auto ml-2 mr-2"
                      style="margin-top: -44px;"
           >

               <v-card-title class="text-center">
                   {{ department.title }}
               </v-card-title>
             <v-card-text>
                 <v-tabs flat class="mb-5" v-model="tab" centered grow    show-arrows>
                     <v-tab href="#home">
                         Home
                     </v-tab>

                     <v-tab href="#projects">
                         Projects
                     </v-tab>

                     <v-tab href="#users">
                         People
                     </v-tab>
                 </v-tabs>

                 <v-tabs-items v-model="tab">
                     <v-tab-item  value="home">
                         <v-card flat >
                             <v-toolbar dense flat >
                                 <v-spacer/>
                                 <v-btn small color="success" class="menu-btn" v-if="department.is_active ===1 ">
                                     Active
                                 </v-btn>

                                 <v-btn v-else color="error">
                                     Inactive
                                 </v-btn>
                             </v-toolbar>

                             <v-card-text class=" d-flex justify-space-between">
                                 <div>
                                     <span>Leader: {{ department.owner.name }}</span> <br>
                                     <span>{{ department.users.length }}</span> People <br>
                                     <span>{{ department.projects.length }}</span> Projects<br>
                                     <span>{{ department.users.length }}</span> Tasks
                                 </div>


                             </v-card-text>
                             <v-progress-linear
                                     value="40"
                                     :size="70"
                                     :width="7"
                                     top
                                     height="10"
                                     color="error">

                             </v-progress-linear>
                         </v-card>
                     </v-tab-item>

                     <v-tab-item  value="projects">

                         <v-alert
                                 v-if="department.projects.length <= 0"
                                 color="red"
                                 type="info"
                         >
                             No Projects Yet
                         </v-alert>
                         <v-simple-table v-else>
                             <template v-slot:default>
                                 <thead>
                                 <tr >
                                     <th class="text-left">
                                         Project Details
                                     </th>
                                     <th class="text-left">
                                         Tasks
                                     </th>
                                     <th class="text-left"> </th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <tr
                                     v-for="project in department.projects"
                                     :key="project.id"
                                 >
                                     <td>{{ project.name }}</td>
                                     <td>{{ project.tasks_count }}</td>
                                     <td>
                                         <v-btn :to="{name:'admin.project.view', params:{ id:project.id} }" icon small>
                                             <v-icon>mdi-chevron-right</v-icon>
                                         </v-btn>
                                     </td>
                                 </tr>
                                 </tbody>
                             </template>
                         </v-simple-table>

                         <NewProjectModal
                                 @close="closeNewProjectModal"
                                 :toggle="newProjectModalState"
                                 :department="department.id"
                                 :departmentPeople="department.users"
                         />

                         <v-fab-transition>
                             <v-btn
                                     fab
                                     dark
                                     bottom
                                     right
                                     class="v-btn--example"
                                     color="success"
                                     @click="openNewProjectModal"
                             >
                                 <v-icon>mdi-plus</v-icon>
                             </v-btn>
                         </v-fab-transition>
                     </v-tab-item>

                     <v-tab-item  value="users">
                         <v-card  flat class="mt-5">
                             <v-list dense>
                                 <v-list-item-group   color="primary" >
                                     <v-list-item
                                             v-for="(user, i) in department.users"
                                             :key="i"
                                     >
                                         <v-list-item-icon>
                                             <v-icon >mdi-account</v-icon>
                                         </v-list-item-icon>
                                         <v-list-item-content>
                                             <v-list-item-title>
                                                 {{ user.name }}
                                             </v-list-item-title>
                                         </v-list-item-content>

                                         <span>
                                           {{ user.tasks_count}} Tasks
                                       </span>
                                     </v-list-item>
                                 </v-list-item-group>
                             </v-list>
                         </v-card>
                         <NewUserModal
                                 @close="closeNewUserModal"
                                 :toggle="newUserModalState"
                                 :department="department.id"
                         />

                         <v-fab-transition>
                             <v-btn
                                     fab
                                     dark
                                     bottom
                                     right
                                     class="v-btn--example"
                                     color="success"
                                     @click="openNewUserModal"
                             >
                                 <v-icon>mdi-plus</v-icon>
                             </v-btn>
                         </v-fab-transition>
                     </v-tab-item>
                 </v-tabs-items>
             </v-card-text>
           </v-card>
       </div>
    </div>
</template>

<script>
    import Loader from "../../components/Loader";
    import NewProjectModal from "../../components/NewProjectModal";
    import NewUserModal from "../../components/NewUserModal";
    export default {
        name: "DepartmentView",
        components:{
             Loader,NewProjectModal,NewUserModal
        },
        data() {
            return {
                loading:true,
                department:{},
                tab: null,
                newProjectModalState:false,
                newUserModalState:false,
                userDeptModal:false,

                userDept:{
                    user_id:null,
                    department_id:this.$route.params.id
                },
                users:null
            }
        },

        async created() {
            this.fetchDepartmentData()
            this.getUsers()
            this.loading= false
        },

        methods: {

            async fetchDepartmentData(){
                // eslint-disable-next-line no-undef
                await axios.get('admin/department/'+this.$route.params.id).then(res=>{
                    this.department = res.data
                }).catch(error=>{
                    console.log(error)
                })
            },

            async getUsers(){
                await axios.get('admin/users').then(res=>{
                    this.users = res.data
                }).catch(error=>{
                    console.log(error)
                })
            },

            async userSync(){
                await axios.post('admin/users-sync',this.userDept).then(res=>{
                    this.successMessage(res.data.message)
                    this.fetchDepartmentData()
                    this.userDeptModal = false

                }).catch(error=>{
                    this.logMessage(error)
                })
            },

            openNewProjectModal(){
                this.newProjectModalState = true
            },

            closeNewProjectModal(){
                this.newProjectModalState = false
                this.fetchDepartmentData()
            },
            openNewUserModal(){
                this.newUserModalState = true
            },

            closeNewUserModal(){
                this.newUserModalState = false
                this.fetchDepartmentData()
            },
        }
    }
</script>
