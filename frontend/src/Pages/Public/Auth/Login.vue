<template>
    <div class="h-75">
        <div class="text-center ">
            <v-avatar
                color="primary"
                size="94"
                class="elevation-10"
            >
                <v-icon color="white">mdi-shield-account mdi-48px</v-icon>
            </v-avatar>
            <br><br>
            <v-card  class="mx-auto text-center" max-width="500">
                <v-card-title class="mb-5 pt-5">
                    <v-toolbar dark dense color="primary">
                        <v-toolbar-title>
                            LogIn
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card-title>

                    <v-alert
                            border="left"
                            dismissible
                            icon="mdi-alert"
                            type="error"
                            v-if="get_gen_errors"
                            @click="clearGenErrors"
                        >
                            {{ get_gen_errors }}
                    </v-alert>

                <v-card-text>
                    <v-form class="login-signup-form" v-model="valid" @submit.prevent="login">
                        <v-text-field
                            v-model="form.email"
                             :rules="emailRules"
                            :error-messages="email_errors"
                            @input="clearEmailErrors"
                            required
                            prepend-inner-icon="mdi-email"
                            label="Email"
                            type="email"
                            outlined
                            dense
                        />
                        <v-text-field
                            v-model="form.password"
                            prepend-inner-icon="mdi-lock"
                            label="Password"
                            outlined
                            dense
                            :rules="passwordRules"
                            :error-messages="password_errors"
                            @input="clearPasswordErrors"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        />
                        <div
                            class="d-flex align-center justify-space-between flex-wrap"
                        >
                            <v-checkbox
                                v-model="form.remember_me"
                                label="Remember me"
                            />
                            <router-link :to="{ name: 'forgot-password'}">
                                Forgot Password?
                            </router-link>
                        </div>
                       

                         <v-btn
                            color="error"
                            type="submit"
                            :loading="loading"
                            block
                        >
                                        <v-icon>mdi-account-lock</v-icon> Login
                                    </v-btn>
                    </v-form>
                </v-card-text>

                <v-card-actions class="elevation-3 mt-5 mb-5">
                    <v-container class="text-center">
                        New to our Platform? <router-link :to="{ name:'register'}">Create Free Account</router-link>
                    </v-container>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "Login",

        data(){

                return{
                    valid:false,
                    loading:false,
                    showPassword: false,
                    form:{
                        email: null,
                        password: null,
                        remember_me: false,
                    },

                    passwordRules: [
                        v => !!v || 'Password is required',
                        v => v.length >= 5 || 'Name must be more than 6 characters',
                    ],
                    emailRules: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+/.test(v) || 'E-mail must be valid',
                    ],
                    }

            },

              computed:{
            ...mapGetters({
                user: 'auth/user',
                authenticated: 'auth/authenticated',
                email_errors: 'auth/get_email_errors',
                password_errors: 'auth/get_password_errors',
                get_gen_errors: 'auth/get_gen_errors',
            })
        },

        watch:{
            authenticated(){
                if(this.authenticated){
                   this.redirectUser()
                }
            },
        },


        async created(){
            if(this.authenticated){
                this.redirectUser()
            }
        },
        methods: {
            
             redirectUser(){

                alert()
            },

             ...mapActions({
                SignIn: 'auth/SignIn'
            }),

            async login(){
                this.loading =true

                await this.SignIn(this.form).then((res)=>{
                    if(res === true){
                        this.redirectUser()
                    }
                })

                this.loading = false
            },

            clearEmailErrors(){
                if(this.email_errors){
                    this.$store.commit('auth/SET_EMAIL_ERROR', null)
                }
                this.clearGenErrors()
            },

            clearPasswordErrors(){
                if(this.password_errors){
                    this.$store.commit('auth/SET_PASSWORD_ERROR', null)
                }
                this.clearGenErrors()
            },

            clearGenErrors(){
               this.$store.commit('auth/SET_GENERAL_ERROR', null)
            },


        },
    }
</script>

<style  >
</style>
