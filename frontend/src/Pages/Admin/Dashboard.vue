<template>
    <v-container>
        
        <v-card color="success" dark  rounded="lg" class="mb-10">
            <v-card-title>
                Welcome: &nbsp; <strong>Grace Mhike</strong>
            </v-card-title>
            
            <v-card-text>
                <v-text-field
                    placeholder="Search Tasks"
                    dense
                    outlined
                    color="white"
                    prepend-inner-icon="mdi-magnify"
                />
            </v-card-text>
        </v-card>
        
        
        <v-row>
            <v-col cols="6" >
                <v-card
                    rounded="lg"
                    to="/"
                    dark
                    class="green darken-3 "
                >
                    <div class="d-flex align-center pa-2">
                        <h1 class="ml-3">
                            {{ admin.departments }}
                        </h1>
                        <v-spacer/>
                        <v-icon color="white">
                            mdi-office-building mdi-48px
                        </v-icon>
                         
                    </div>
                    <v-card-title class="mt-n5">
                        <small class="stats-lead">
                            &nbsp;Departments
                        </small>
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col  cols="6" >
                <v-card
                    rounded="lg"
                    to="/"
                    dark
                    class="blue darken-3 "
                >
                    <div class="d-flex align-center pa-2">
                        <h1 class="ml-3">
                            {{ admin.projects }}
                        </h1>
                        <v-spacer/>
                        <v-icon color="white">
                            mdi-briefcase-variant mdi-48px
                        </v-icon>
        
                    </div>
                    <v-card-title class="mt-n5">
                        <small class="stats-lead">
                            &nbsp;Projects
                        </small>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" >
                <v-card
                    rounded="lg"
                    to="/"
                    dark
                    class="red darken-3 "
                >
                    <div class="d-flex align-center pa-2">
                        <h1 class="ml-3">
                            {{ admin.tasks }}
                        </h1>
                        <v-spacer/>
                        <v-icon color="white">
                            mdi-briefcase-variant mdi-48px
                        </v-icon>
                
                    </div>
                    <v-card-title class="mt-n5">
                        <small class="stats-lead">
                            &nbsp;Tasks
                        </small>
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col  cols="6" >
                <v-card
                    rounded="lg"
                    to="/"
                    dark
                    class="black darken-3 "
                >
                    <div class="d-flex align-center pa-2">
                        <h1 class="ml-3">
                            {{ admin.users }}
                        </h1>
                        <v-spacer/>
                        <v-icon color="white">
                            mdi-account-group mdi-48px
                        </v-icon>
                
                    </div>
                    <v-card-title class="mt-n5">
                        <small class="stats-lead">
                            &nbsp;Users
                        </small>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        
        <v-toolbar class="mt-10" flat>
            <v-toolbar-title>
                Notifications
            </v-toolbar-title>
        </v-toolbar>
        <v-data-table
            mobile-breakpoint="0"
            :headers="headers"
        >
        
        </v-data-table>
    </v-container>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
    data(){
      
      return{
          headers:[
              {  text:'Notification', value:'notification'},
              {  text:'Option', value:'actions'},
          ]
      }
    },
    
    async created(){
        await this.$store.dispatch('dashboard/fetchAdminStats')
    },
    computed:{
        ...mapGetters({
            admin:'dashboard/admin'
        })
    },
    methods:{
      
      ...mapActions({
          fetchUserTasks:'task/fetchUserTasks'
      })
      
      
    }
}
</script>

<style scoped>

</style>