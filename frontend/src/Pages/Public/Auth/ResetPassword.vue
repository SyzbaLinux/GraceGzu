<template>
    <div class="h-75">
        <div class="text-center ">
            <v-avatar
                color="primary"
                size="94"
                class="elevation-10"
            >
                <v-icon color="white">mdi-key-alert-outline mdi-48px</v-icon>
            </v-avatar>
            <br><br>
            <v-card  class="mx-auto text-center" max-width="500">
                <v-card-title class="mb-1 pt-5">
                    <v-toolbar flat  rounded dark dense color="primary">
                        <v-toolbar-title>
                            New Password
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card-title>

                <v-card-text>
                    <p class="mb-2">
                        You are only one step a way from your new password, recover your password now.
                    </p>
                </v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="resetPassword">

                        <v-text-field
                            v-model="form.password"
                            prepend-inner-icon="mdi-lock"
                            label="New Password"
                            outlined
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        />

                        <v-text-field
                            v-model="form.password_confirmation"
                            prepend-inner-icon="mdi-lock"
                            label="Password Confirmation"
                            outlined
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        />

                        <hr>

                      <div class="pa-3">
                          <v-btn  color="info" class=" menu-btn">
                              Change Password
                          </v-btn>
                      </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResetPassword",

        data(){

            return{
                showPassword: false,
                form:{
                    password: null,
                    password_confirmation: null,
                    email: this.email,
                    token: this.token
                }
            }
        },

        methods:{
            resetPassword(){

            }
        }
    }
</script>

<style scoped>

</style>
