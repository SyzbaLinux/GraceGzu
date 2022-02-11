<template>
    <div>
        <Loader :loading="loading" v-if="loading"></Loader>
        <div v-else>
            <v-card rounded="lg" outlined class="my-3" color="primary" dark>
                <v-card-title>
                    Users
                </v-card-title>
                <v-card-text class="mt-n4">
                    Listing all available users

                    <v-text-field
                            label="Filter users"
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
                    v-for="(user, index) in users"
                    :key="index"
                    to=""
            >
                <v-card-title>
                    {{ user.name }}
                </v-card-title>
                <v-card-text class="mt-n4 d-flex justify-space-between">
                    <div>
                        <span>0</span> Completed Tasks / 100
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn fab outlined small color="error" @click="deleteUser(user.id)">
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                </v-card-actions>
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
        name: "users",
        components:{
            Loader
        },
        data(){
            return{
                users:null,
                loading:true
            }
        },

        async created() {
            this.fetchUsers()
        },


        methods:{
            async fetchUsers(){
                await axios.get('admin/users').then(res=>{

                    this.users = res.data
                    this.loading= false

                }).catch(error=>{

                    console.log(error)
                })
            },

            async deleteUser(user){

                Swal.fire({
                    title: 'Are you sure?',
                    text: "User will be deleted!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then((result) => {

                    if (result.isConfirmed) {

                          axios.delete('admin/users/'+user).then(res=>{
                            this.successMessage(res.data.message)
                            this.fetchUsers()

                        }).catch(error=>{
                           this.logMessage(error)
                        })

                    }
                })
            }
        }
    }
</script>

<style>
.v-btn--example{
    position: fixed !important;
    z-index: 10 !important;
    bottom: 10%;
    right: 2% !important;
}
</style>
