<template>
    <div>
        <v-dialog
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
                            label="Select Departments"
                            outlined
                            dense
                        />

                        <v-select
                                label="Project Leader"
                                outlined
                                dense
                        />

                        <v-text-field
                            label="Project Name"
                            outlined
                            dense
                        />

                        <v-row class="no-gutters">
                            <v-col>
                                <v-text-field
                                    label="Start Date"
                                    outlined
                                    dense
                                    class="mr-1"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="Expected EndDate"
                                    outlined
                                    dense
                                    class="ml-1"
                                />
                            </v-col>
                        </v-row>

                        <v-select
                                label="Project Stage"
                                outlined
                                dense
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
    export default {
        name: "NewProjectModal",
        props:{
            toggle:{

            }
        },
        components: {},

        data() {
            return {
            }
        },

        created() {
        },

        methods: {
            async saveProject(){

            }
        }
    }
</script>

<style scoped>

</style>