<template>
    <v-app id="inspire" >

        <v-navigation-drawer
            v-model="drawer"
            app
            :mini-variant.sync="miniVariant"
            clipped
        >
            <v-list>
                <v-list-item>
                    <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                        <template v-slot:activator="{ attrs, on }">
                            <v-avatar
                                rounded
                                v-on="on"
                                v-bind="attrs"
                                color="primary" size="30">
                                <v-icon color="white">
                                    mdi-account-circle-outline mdi-24px
                                </v-icon>
                            </v-avatar>
                        </template>
                        <span>{{  user.name  }}  </span>
                    </v-tooltip>

                    <v-list-item-avatar rounded v-else  color="primary" size="60">
                        <v-icon color="white">
                            mdi-account-circle-outline mdi-48px
                        </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                            {{  user.name  }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{  user.email }}
                            <br>
                            <v-chip small block color="error">
                                Administrator
                            </v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list dense nav >
                <v-subheader v-show="!miniVariant">JSC Admin Portal</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item
                v-for="(link,i) in links"
                :key="i"
                :to="{name:link.to}"
            >
                <v-list-item-action>
                    <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                        <template v-slot:activator="{ attrs, on }">
                            <v-icon
                                v-on="on"
                                v-bind="attrs"
                            >
                                {{ link.icon }}
                            </v-icon>
                        </template>
                        <span>{{ link.title }}</span>
                    </v-tooltip>

                    <v-icon v-else>
                        {{ link.icon }}
                    </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title >{{ link.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
                </v-list-item-group>
            </v-list>


        </v-navigation-drawer>
        <v-app-bar class="elevation-2" app  clipped-left dark  color="success">
                <v-icon @click="miniVariant = !miniVariant">mdi-menu mdi-36px</v-icon>
                <h3> SIRDC Project Manager</h3>
            <v-spacer/>
            <v-btn color="error" @click="logOut"  >
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="mb-10">
            <v-container fluid class="py-5">
                <router-view></router-view>
            </v-container>
        </v-main>
        <Footer class="hidden-md-and-up" :links="links"></Footer>
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
                        title:'Settings',
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
