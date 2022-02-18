<template>
    <div>
        <v-toolbar
            color="primary"
            dark
            extended
            flat
        >
           <span @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon> Project View</span>
        </v-toolbar>
        <v-card
            class="mx-auto ml-2 mr-2"
            style="margin-top: -44px;"
        >
            <v-toolbar flat>
                <v-toolbar-title class="">
                    {{ project.name }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="toggleTask"
                    persistent
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                            <v-toolbar-title  >
                                <v-icon>mdi-server-network</v-icon> New Task
                            </v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                <v-select
                                    multiple
                                    chips
                                    label="Assigned To"
                                    dense
                                    outlined
                                    :items="users"
                                    item-text="name"
                                    item-value="id"
                                    v-model="task.user_id"
                                    :menu-props="{ closeOnClick: true,closeOnContentClick: true, }"
                                />
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="task.title"
                                    label="Title"
                                />

                                <v-row>
                                    <v-col>
                                        <DatePicker
                                            v-model="task.start_date"
                                            label="Start Date"
                                            type="date"
                                        />
                                    </v-col>
                                    <v-col>
                                        <DatePicker
                                            v-model="task.end_date"
                                            label="End Date"
                                            type="date"
                                        />
                                    </v-col>
                                </v-row>
                                <v-textarea
                                    dense
                                    outlined
                                    v-model="task.description"
                                    label="Description"
                                />
                                <v-select
                                    :items="taskStatuses"
                                    dense
                                    outlined
                                    v-model="task.status"
                                    label="Status"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="elevation-3">
                            <v-btn
                                color="error"
                                text
                                @click="closeTask"
                                class="menu-btn"
                            >
                                Cancel
                            </v-btn>
                            <v-spacer/>
                            <v-btn
                                color="success"
                                class="menu-btn"
                                @click="saveTask"
                            >
                                Add Task
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <v-card-title>Tasks</v-card-title>

            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="project.tasks"
                    :items-per-page="5"
                    disable-sort
                >
                    <template v-slot:item.status="{ item }">
                         <v-btn v-if="item.status ==='Completed'" class="menu-btn" small rounded color="success">
                             {{ item.status }}
                         </v-btn>

                        <v-btn v-else-if="item.status ==='Done'" class="menu-btn" small dark rounded color="blue">
                            {{ item.status }}
                        </v-btn>
                        <v-btn v-else class="menu-btn" small rounded color="warning">
                            {{ item.status }}
                        </v-btn>
                    </template>
                    <template v-slot:item.actions="{ item }">
                       <v-btn fab x-small color="info">
                           <v-icon>
                               mdi-pencil
                           </v-icon>
                       </v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import DatePicker from "./DatePicker";
    export default {
        name: "ProjectView",
        props:{
          project:{
                Type:Object
          }
        },
        components: {DatePicker},
        data() {
            return {
                headers: [
                    { text: 'ID',  value: 'id'},
                    { text: 'Title', value: 'title' },
                    { text: 'Users', value: 'users' },
                    { text: 'Start Date', value: 'start_date' },
                    { text: 'End Date', value: 'end_date' },
                    { text: 'Status', value: 'status' },
                    { text: 'More', value: 'actions' },
                ],
                toggleTask:false,
                task:{
                    user_id:[],
                    project_id:this.project.id,
                    title:null,
                    start_date:null,
                    end_date:null,
                    description:null,
                    is_complete:0,
                    status:null,
                    priority:'High',
                },
                users:null,
                taskStatuses:['Doing', 'Done', 'Completed', 'Created']
            }
        },
        created() {
            this.fetchAllUsers()
        },

        methods: {

            closeTask(){
                this.toggleTask = false
            },

            async fetchAllUsers(){
                await axios.get('users-list').then(res=>{
                    this.users = res.data
                }).catch(error=>{
                    console.log(error)
                })
            },

            async saveTask(){

                await axios.post('/admin/tasks',this.task).then(res=>{
                    this.successMessage(res.data.message)
                    this.$emit('newTaskSaved')

                }).catch(error=>{
                    this.logMessage(error)
                })


            }
        }
    }
</script>

<style  >
    .v-toolbar__title {
        font-size: 1.1rem !important;
    }
</style>
