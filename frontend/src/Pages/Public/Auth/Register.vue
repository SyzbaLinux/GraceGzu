<template>
   <div>
       <div class="text-center">
           <v-avatar
               color="primary"
               size="94"
               class="elevation-10 mb-5"
           >
               <v-icon color="white">mdi-account-circle-outline mdi-48px</v-icon>
           </v-avatar>
           <v-card class="mx-auto" max-width="500">
               <v-card-title class="d-flex align-center justify-center">

               </v-card-title>
               <v-card-text>
                   <h1> SignUp for free</h1>
               </v-card-text>
               <v-card-text>
                   <v-form @submit.prevent="register">
                       <v-text-field
                           v-model="form.name"
                           prepend-inner-icon="mdi-account"
                           label="Full Name"
                           outlined
                           dense
                           type="text"
                       />

                       <v-text-field
                           v-model="form.email"
                           prepend-inner-icon="mdi-email"
                           label="Email"
                           type="email"
                           outlined
                           dense
                       />
                       <v-text-field
                           v-model="form.mobile"
                           prepend-inner-icon="mdi-cellphone-basic"
                           label="Phone No"
                           type="number"
                           outlined
                           dense
                           hint="with country code. -eg- 263xxx"
                       />
                       <v-text-field
                           v-model="form.password"
                           prepend-inner-icon="mdi-lock"
                           label="Password"
                           outlined
                           dense
                           :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                           :type="showPassword ? 'text' : 'password'"
                           @click:append="showPassword = !showPassword"
                       />

                       <v-text-field
                           v-model="form.password_confirmation"
                           prepend-inner-icon="mdi-lock"
                           label="Password Confirmation"
                           outlined
                           dense
                           :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                           :type="showPassword ? 'text' : 'password'"
                           @click:append="showPassword = !showPassword"
                       />

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

</style>
