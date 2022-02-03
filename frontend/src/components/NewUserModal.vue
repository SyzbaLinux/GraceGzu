<template>
    <div>
        <v-dialog
                v-model="toggle"
                persistent
        >
            <v-card>
                <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                    <v-toolbar-title  >
                       <i class="mdi mdi-account-multiple-plus"></i> New User
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-form>
                        <v-text-field
                                outlined
                                label="Full Name"
                                v-model="userForm.name"
                                :rules="nameRules"
                                :error-messages="nameRulesErrors"
                                dense
                        />

                        <v-text-field
                                outlined
                                label="Work Title"
                                v-model="userForm.title"
                                :rules="titleRules"
                                :error-messages="titleRulesErrors"
                                dense
                        />

                        <v-text-field
                                outlined
                                label="Email"
                                v-model="userForm.email"
                                :rules="emailRules"
                                :error-messages="emailRulesErrors"
                                dense
                        />

                        <v-select
                                label="User Departments"
                                :items="departments"
                                item-text="title"
                                item-value="id"
                                outlined
                                v-model="userForm.departments"
                                :error-messages="departmentsRulesErrors"
                                dense
                        />
                        <v-select
                                label="User Roles"
                                :items="roles"
                                item-text="name"
                                item-value="id"
                                outlined
                                v-model="userForm.roles"
                                :error-messages="rolesRulesErrors"
                                dense
                        />
                    </v-form>

                </v-card-text>
                <v-card-actions class="elevation-3">
                    <v-btn
                            color="error"
                            text
                            @click="$emit('close')"
                            class="menu-btn"
                    >
                        Cancel
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                            color="success"
                            class="menu-btn"
                            @click="newUserSave"
                    >
                        Add New User
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { default as axios } from 'axios'
    export default {
        name: "NewDepartmentModal",
        props:{
            toggle:{

            }
        },
        components: {},

        data() {
            return {

                users:[],
                roles:[],
                departments:[],

                userForm:{ 
                    id:'',
                    name:'',
                    title:'',
                    email:'', 
                    password:'',
                    roles:[],
                    departments:[]
                },

                userLoading:false,

                nameRules: [
                    v => !!v || 'Full Name is required',
                    v => v.length >= 3 || 'Name must be more than 3 characters',
                ],

                emailRules: [
                    v => !!v || 'Full Name is required',
                    v => v.length >= 3 || 'Name must be more than 3 characters',
                ],

                titleRules: [
                    v => !!v || 'Work Title is required',
                    v => v.length >= 3 || 'Title must be more than 3 characters',
                ],
                nameRulesErrors:'',
                titleRulesErrors:'',
                emailRulesErrors:'',
                rolesRulesErrors:'',
            }
        },

        created() {

            this.fetchUsers()
            this.fetchRoles()
            this.fetchDepartments()
        },

        methods: {

            async newUserSave(){
                await axios.post('admin/users', this.userForm).then(res=>{
                    this.successMessage(res.data.message)
                    this.$emit('close')

                }).catch(error=>{
                    this.nameRulesErrors = error.response.data.errors.title
                })
            },

            async fetchUsers(){
                await axios.get('admin/users').then(resp=>{

                    this.users = resp.data

                }).catch(error => {
                    console.log(error.response.data.errors)
                })
            },

            async fetchRoles(){
                await axios.get('admin/roles').then(resp=>{

                    this.roles = resp.data

                }).catch(error => {
                    console.log(error.response.data.errors)
                })
            },

            async fetchDepartments(){
                await axios.get('admin/department').then(resp=>{

                    this.departments = resp.data

                }).catch(error => {
                    console.log(error.response.data.errors.message)
                })
            },
        }
    }
</script>

<style scoped>

</style>