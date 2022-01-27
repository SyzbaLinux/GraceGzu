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
                        <v-toolbar-title class="w-100" >
                            Verify Account
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card-title>

                <v-card-text>
                    <p class="mb-2">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </p>
                </v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="sendVerification">
                        <v-btn type="submit" block color="primary" class="mt-3">
                            Resend Verification Email
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
        name: "VerifyAccount",
        methods:{

            sendVerification(){

            }
        }
    }
</script>

<style scoped>

</style>
