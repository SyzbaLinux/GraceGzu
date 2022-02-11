<template>
    <v-app id="inspire" >


        <v-app-bar class="elevation-2" app>
                <v-toolbar-title>
                    SIRDC Project Manager
                </v-toolbar-title>

            <v-spacer/>
            <v-btn color="error" @click="logOut">
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="mb-10">
            <v-container fluid class="py-5">
                <router-view></router-view>
            </v-container>
        </v-main>
        <Footer :links="links"></Footer>
    </v-app>
</template>

<script>

import { mapActions, mapGetters} from "vuex";
import {default as axios} from "axios";
import Footer from "../../components/Footer";

export default {
  name: "AdminDashboard",
    components:{
        Footer
    },

  data(){
    return{
      miniVariant:false,
      drawer:null,
      dialog:false,
        links:[
                    {
                        title:'Home',
                        to:'admin.dashboard',
                        icon:'mdi-home'
                    },
                    {
                        title:'Department',
                        to:'admin.departments',
                        icon:'mdi-office-building-cog'
                    },
                    {
                        title:'All Users',
                        to:'admin.users',
                        icon:'mdi-account-group'
                    },
                    {
                        title:'Projects',
                        to:'admin.projects',
                        icon:'mdi-briefcase-variant'
                    },
                    {
                        title:'Add New',
                        to:'admin.settings',
                        icon:'mdi-cog'
                    },
        ],


        departmentLoading:false,

        departmentRules: [
            v => !!v || 'Department Name is required',
            v => v.length >= 3 || 'Name must be more than 3 characters',
        ],
        departmentRulesErrors:'',
        departmentUserErrors:''
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
