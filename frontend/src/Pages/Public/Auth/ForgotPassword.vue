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
                <v-card-title class="mb-5 pt-5">
                    <v-toolbar flat  rounded dark dense color="primary">
                        <v-toolbar-title class="text-center">
                            Password Reset
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card-title>

                <v-card-text>
                    <p class="mb-2">You forgot your password? Here you can easily retrieve a new password.</p>
                </v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="resetPassword">
                        <v-text-field
                            v-model="form.email"
                            prepend-inner-icon="mdi-email"
                            label="Email"
                            type="email"
                            outlined
                        />
                        <v-btn  color="info" class="mt-3 menu-btn">
                            Request New Password
                        </v-btn
                        >
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword",

        data(){

            return{
                form:{
                    email:null,
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
