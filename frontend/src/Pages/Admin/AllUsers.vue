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
                <v-progress-linear
                        value="30"
                        absolute
                        bottom
                        color="error"
                ></v-progress-linear>

                <v-card-title>
                    {{ user.name }}
                </v-card-title>
                <v-card-text class="mt-n4 d-flex justify-space-between">
                    <div>
                        <span>0</span> Completed Tasks / 100
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
            }
        }
    }
</script>

<style scoped>

</style>