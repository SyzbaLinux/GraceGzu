<template>
        <div>
            <Loader :loading="loading" v-if="loading"></Loader>
            <v-card v-else flat class="mx-auto">
                <v-toolbar
                    color="primary"
                    dark
                    extended
                    flat
                >
                </v-toolbar>
                <v-card

                    class="ml-2 mr-2 h-75 mx-auto"
                    max-width="700"
                    style="margin-top: -44px; "
                >
                    <v-toolbar flat>
                        <div class="w-100 text-center mt-3 h2-title">
                              Welcome: {{ userData.name }}
                            <v-divider></v-divider>
                        </div>
                    </v-toolbar>

                    <v-card-text>

                        <v-tabs flat class="mb-5" v-model="tab" centered grow    show-arrows>
                            <v-tab href="#home" chip>
                                Home
                            </v-tab>

                            <v-tab href="#projects">
                                Departments
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item  value="home">
                                <h2 class="my-5">My Tasks</h2>

                                <v-expansion-panels>
                                    <v-expansion-panel
                                        v-for="(item,i) in tasksStatuses"
                                        :key="i"
                                    >
                                        <v-expansion-panel-header>
                                            <strong>{{ item }}</strong>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            Task Title
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-tab-item>

                            <v-tab-item  value="projects">

                                <v-card rounded="lg"
                                        class="my-3"
                                        outlined
                                        v-for="(department, index) in userData.departments"
                                        :key="index"
                                >

                                    <v-card-title>
                                        {{ department.title }}
                                    </v-card-title>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                        <v-fab-transition>
                            <v-btn
                                fab
                                dark
                                bottom
                                right
                                class="v-btn--example"
                                color="success"
                                @click="showTask = true"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-fab-transition>
                    </v-card-text>
                </v-card>
            </v-card>
        </div>
</template>

<script>
 import Loader from "../../components/Loader";
export default {
  name: "Home",
    components:{
        Loader
    },

    data(){
      return{
          loading:true,
          showTask:false,
          userData:null,
          tab:null,
          tasksStatuses:['Doing', 'Done', 'Completed', 'Created']
      }
    },

    created(){
      this.fetchUserProjects()
    },

    methods:{

        async fetchUserProjects(){

            // eslint-disable-next-line no-undef
            await axios.get('user/department/').then(res=>{
                this.userData = res.data
                this.loading= false

            }).catch(error=>{
                console.log(error)
            })
            this.loading =false
        }
    }
}
</script>

<style scoped>

</style>
