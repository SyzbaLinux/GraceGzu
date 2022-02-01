<template>
    <div>
        <v-dialog
                v-model="toggle"
                persistent
        >
            <v-card>
                    <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                        <v-toolbar-title class="text-h6">
                            New Department
                        </v-toolbar-title>
                    </v-toolbar>

                <v-card-text>
                    <v-form>
                        <v-text-field
                                outlined
                                label="Department Name"
                                v-model="departmentForm.title"
                                :rules="departmentRules"
                                :error-messages="departmentRulesErrors"
                                dense
                        />
                        <v-select
                                label="Department Leader"
                                :items="users"
                                item-text="name"
                                item-value="id"
                                outlined
                                v-model="departmentForm.user_id"
                                :error-messages="departmentUserErrors"
                                dense
                        />
                        <v-switch
                                inset
                                :true-value="1"
                                :false-value="0"
                                v-model="departmentForm.is_active"
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
                        @click="saveDept"
                        class="menu-btn"
                        :loading="departmentLoading"
                        :disabled="departmentForm.title.length < 3"
                    >
                        Save Department
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

                departmentForm:{
                    title:'',
                    user_id:'',
                    is_active:1,
                },

                departmentLoading:false,
                departmentRules: [
                    v => !!v || 'Department Name is required',
                    v => v.length >= 3 || 'Name must be more than 3 characters',
                ],
                departmentRulesErrors:'',
                departmentUserErrors:''
            }
        },

        created() {

            this.fetchUsers()
        },

        methods: {

            async saveDept(){
                await axios.post('admin/department', this.departmentForm).then(res=>{
                    this.successMessage(res.data.message)
                    this.$emit('close')

                }).catch(error=>{
                    this.departmentRulesErrors = error.response.data.errors.title
                    this.departmentUserErrors = error.response.data.errors.user_id
                })
            },

            async fetchUsers(){
                await axios.get('admin/users').then(resp=>{

                    this.users = resp.data

                }).catch(error => {
                    console.log(error.response.data.errors)
                })
            }
        }
    }
</script>

<style scoped>

</style>