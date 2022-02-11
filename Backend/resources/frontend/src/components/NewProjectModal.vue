<template>
    <div>
        <Loader  :loading="loading" v-if="loading"/>
        <v-dialog
                v-else
                v-model="toggle"
                persistent
        >
            <v-card>
                <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                    <v-toolbar-title  >
                        <i class="mdi mdi-briefcase-variant"></i> New Project
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-form>
                        <v-select
                                label="Project Leader"
                                outlined
                                dense
                                :items="departmentPeople"
                                item-value="id"
                                item-text="name"
                                v-model="project.user_id"
                        />

                        <v-text-field
                            label="Project Name"
                            outlined
                            dense
                            v-model="project.name"
                        />

                        <v-row class="no-gutters">
                            <v-col cols="6">
                                <DatePicker
                                        class="mr-1"
                                        type="date"
                                        label="StartDate"
                                        v-model="project.start_date"
                                />
                            </v-col>
                            <v-col cols="6">
                                <DatePicker
                                        class="ml-1"
                                        type="date"
                                        label="EndDate"
                                        v-model="project.end_date"
                                />
                            </v-col>
                        </v-row>
                        <v-text-field
                                label="Project Status"
                                outlined
                                dense
                                v-model="project.status"
                        />
                        <v-select
                                label="Project Stage"
                                outlined
                                dense
                                :items="stages"
                                item-value="id"
                                item-text="name"
                                v-model="project.stage_id"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="elevation-3">
                    <v-btn
                            color="error"
                            text
                            @click="$emit('close')"
                            class="menu-btn"
                    >
                        Cancel
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                            color="success"
                            @click="saveProject"
                            class="menu-btn"
                            tile
                    >
                        Add Project
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import Loader from "./Loader";
    import DatePicker from "./DatePicker";
    export default {
        name: "NewProjectModal",
        props:{
            toggle:{

            },
            department:{

            },
            departmentPeople:{

            }
        },
        components: { Loader,DatePicker },

        data() {
            return {
                loading:true,
                stages:null,

                project:{
                    departments:this.department,
                    name:null,
                    stage_id:null,
                    status:null,
                    start_date:null,
                    end_date:null,
                    user_id:null,
                }
            }
        },

        async created() {
            this.fetchStages()
            this.loading = false
        },

        methods: {
            async saveProject(){
                // eslint-disable-next-line no-undef
                await axios.post('admin/projects', this.project).then(res=>{
                    this.successMessage(res.data.message)
                    this.$emit('close')
                }).catch(error=>{
                    console.log(error)
                })
            },
            async fetchStages(){
                // eslint-disable-next-line no-undef
                await axios.get('stages').then(res=>{
                    this.stages = res.data
                }).catch(error=>{
                    console.log(error)
                })
            },
        }
    }
</script>

<style scoped>

</style>