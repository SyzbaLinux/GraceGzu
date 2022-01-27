<template>
    <v-app id="inspire" >
        <v-navigation-drawer
            v-model="drawer"
            clipped
            app
        >
            <v-list>
                <v-list-item>
                    <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                        <template v-slot:activator="{ attrs, on }">
                            <v-list-item-avatar
                                v-on="on"
                                v-bind="attrs"
                                color="primary" size="30">
                                <v-icon color="white">
                                    mdi-account-box-multiple-outline mdi-18px
                                </v-icon>
                            </v-list-item-avatar>
                        </template>

                    </v-tooltip>

                    <v-list-item-avatar
                        v-else
                        color="primary" size="50">
                        <v-icon color="white">
                            mdi-account-box-multiple-outline mdi-30px
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
                                {{  user.role }}
                            </v-chip>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list dense nav >
                <v-subheader v-show="!miniVariant">Task & Project Manager </v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item as="v-list-item"  >
                        <v-list-item-action>
                            <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                                <template v-slot:activator="{ attrs, on }">
                                    <v-icon
                                        v-on="on"
                                        v-bind="attrs"
                                    >
                                        mdi-desktop-mac-dashboard
                                    </v-icon>
                                </template>
                                <span>Admin Dashboard</span>
                            </v-tooltip>

                            <v-icon v-else>
                                mdi-desktop-mac-dashboard
                            </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title >Admin Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item as="v-list-item" @click="logOut"   >
                        <v-list-item-action>
                            <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                                <template v-slot:activator="{ attrs, on }">
                                    <v-icon
                                        v-on="on"
                                        v-bind="attrs"
                                    >
                                        mdi-logout
                                    </v-icon>
                                </template>
                                <span>Sign Out</span>
                            </v-tooltip>

                            <v-icon v-else>
                                mdi-logout
                            </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title >Sign Out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-icon class="mx-1" @click="drawer = !drawer">
                mdi-menu
            </v-icon>
            <v-toolbar-title>Task & Project Manager</v-toolbar-title>
            <v-spacer/>
        </v-app-bar>

        <v-main>
            <v-container fluid class="py-5">
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import { mapActions, mapGetters} from "vuex";

export default {
  name: "AdminDashboard",

  data(){
    return{
      miniVariant:false,
      drawer:null,
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