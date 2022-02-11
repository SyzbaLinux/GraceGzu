<template>
   <div>
       <div class="mt-n16 pb-10 bg-office">
           <v-container>
               <v-row class="d-flex align-center">
                   <v-col cols="12" sm="12" md="6">
                    <v-card>
                    <v-card-text>
                        <h1> SignUp for free</h1>
                    </v-card-text>
                    <v-card-text>
                        <v-form @submit.prevent="register">



                            <v-checkbox
                                v-model="form.terms"
                                :true-value="1"
                                :false-value="0"
                                label="I agree to terms & conditions and privacy policy"
                            ></v-checkbox>

                            <v-btn
                                block
                                color="primary"
                                class="mt-3"
                            >
                                Register
                            </v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-text
                        class="d-flex align-center justify-center flex-wrap mt-2"
                    >
                        <span class="me-2"> Already have an account? </span>
                        <router-link :to="{ name: 'login' }"> Sign in instead </router-link>
                    </v-card-text>
                    </v-card>
               </v-col>

               <v-col cols="12" sm="12" md="6">
                    <v-avatar
                    color="primary"
                    size="94"
                    class="elevation-10 mb-5"
                    >
                    <v-icon color="white">mdi-account-circle-outline mdi-48px</v-icon>
                </v-avatar>
               </v-col>
               </v-row>
           </v-container>
       </div>
   </div>
</template>

<script>
    export default {
        name: "Register",

        data() {
            return {
                showPassword: false,
                isLoading: false,
                form:{
                    name: null,
                    email: null,
                    mobile: null,
                    account_type: 1,
                    terms: 0,
                    password: null,
                    password_confirmation: null,
                },


                accountTypes:[
                    {
                        id:1,
                        text:'General User'
                    },
                    {
                        id:2,
                        text:'Lawfirm Manager'
                    }
                ]
            };
        },

        methods:{
            register(){

            }
        },

        metaInfo: {
            title: 'Register',
            // override the parent template and just use the above title only
            titleTemplate: null
        }
    }
</script>

<style scoped>
    .bg-office{
        padding-top: 70px;
        background-image: url('../../../assets/images/auth-bg.png');
        background-position: bottom;
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
</style>
