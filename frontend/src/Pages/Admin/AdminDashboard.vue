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



                    <v-list-group
                        :value="true"
                        no-action
                        color="primary"
                    >
                        <template v-slot:activator>
                            <v-list-item-action>
                                <v-tooltip content-class="tooltip-right primary"  right v-if="miniVariant">
                                    <template v-slot:activator="{ attrs, on }">
                                        <v-icon
                                            v-on="on"
                                            v-bind="attrs"
                                        >
                                            mdi-factory
                                        </v-icon>
                                    </template>
                                    <span>Departments</span>
                                </v-tooltip>

                                <v-icon v-else>
                                    mdi-factory
                                </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title >Departments</v-list-item-title>
                            </v-list-item-content>
                        </template>
                            <div class="text-center my-3">

                                <v-dialog
                                    v-model="dialog"
                                    width="500"

                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="primary" small text outlined
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            New Department
                                        </v-btn>
                                    </template>

                                    <v-card   >
                                        <v-card-title>
                                          <v-toolbar color="primary" dense dark>
                                              <v-toolbar-title>
                                                  New Department
                                              </v-toolbar-title>
                                          </v-toolbar>
                                        </v-card-title>

                                        <v-card-text class="mt-5">
                                            <v-form>
                                                <v-text-field
                                                    outlined
                                                    label="Department Name"
                                                    v-model="departmentForm.title"
                                                    :rules="departmentRules"
                                                    :error-messages="departmentRulesErrors"
                                                    dense
                                                />
                                                
                                                <v-select
                                                    label="Department Leader"
                                                    :items="users"
                                                    item-text="name"
                                                    item-value="id"
                                                    outlined
                                                    v-model="departmentForm.user_id"
                                                    :error-messages="departmentUserErrors"
                                                    dense
                                                />
                                                
                                                <v-switch
                                                    inset
                                                    :true-value="1"
                                                    :false-value="0"
                                                    v-model="departmentForm.is_active"
                                                />
                                                
                                                
                                            </v-form>
                                        </v-card-text>

                                        <v-card-actions class="elevation-3">
                                            <v-spacer/>
                                            <v-btn class="warning"  @click="dialog = false">
                                                Cancel
                                            </v-btn>

                                            <v-btn
                                                :loading="departmentLoading"
                                                :disabled="departmentForm.title.length < 3"
                                                color="success"
                                                @click="newDepartment">
                                                Save Department
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>


                        <v-list-item link
                            v-for="(department, index) in departments"
                           :key="index"
                        >
                            <v-list-item-title >
                                {{ department.title }}
                            </v-list-item-title>

                            <v-avatar  color="error" size="26">
                                <span class="white--text font-weight-bold">
                                    {{ department.tasks.length }}
                                </span>
                            </v-avatar>
                        </v-list-item>
                    </v-list-group>

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

        <v-app-bar class="elevation-2" app clipped-left>
            <v-icon class="mx-1" @click="drawer = !drawer">
                mdi-menu
            </v-icon>
            <v-spacer/>
                <v-toolbar-title>
                    SIRDC Project Manager
                </v-toolbar-title>
            <v-spacer/>
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
        
        departmentForm:{
            title:'',
            user_id:'',
            is_active:1,
        },
        departments:[],
        users:[],
    
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
                            title:'Add New',
                            to:'admin.addnew',
                            icon:'mdi-checkbox-marked-circle-plus-outline'
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
                    }
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
        
        this.fetchDepartments()
        this.fetchUsers()
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

      async newDepartment(){
    
          await axios.post('admin/department', this.departmentForm).then(()=>{
    
              this.fetchDepartments()
              this.$store.dispatch('dashboard/fetchAdminStats')
              this.dialog = false
        
          }).catch(error => {
              
               this.departmentRulesErrors = error.response.data.errors.title
               this.departmentUserErrors = error.response.data.errors.user_id
          })
          
          
      },
      
      async fetchDepartments(){
          await axios.get('admin/department').then(resp=>{
        
              this.departments = resp.data
        
          }).catch(error => {
              console.log(error.response.data.errors.message)
          })
      },
    
      async fetchUsers(){
          await axios.get('admin/users').then(resp=>{
            
              this.users = resp.data
            
          }).catch(error => {
              console.log(error.response.data.errors)
          })
      }

  }
}
</script>

<style scoped>

</style>