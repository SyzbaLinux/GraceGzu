<template>
    <v-app id="inspire">
        <v-app-bar class="elevation-2" app>
            <v-toolbar-title>
                SIRDC Project Manager
            </v-toolbar-title>

            <v-spacer/>
            <v-btn color="error" @click="logOut">
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>
       <v-main>
           <router-view></router-view>
       </v-main>
    </v-app>
</template>

<script>

import { mapActions, mapGetters} from "vuex";

export default {
    name: "AdminDashboard",

    data(){
        return{
        }
    },


    watch:{

        authenticated(){
            if(!this.authenticated){
                this.$router.push({ name: 'login'})
            }
        },


    },

    async created(){
        if(!this.authenticated){
            this.$router.push({ name: 'login'})
        }
    },


    computed:{

        ...mapGetters({
            user:'auth/user',
            authenticated: 'auth/authenticated',
        })
    },

    methods:{
        ...mapActions({
            logOut:'auth/signOut'
        }),

    }
}
</script>

<style scoped>

</style>
