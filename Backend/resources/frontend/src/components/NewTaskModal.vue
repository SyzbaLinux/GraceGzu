<template>
    <div>
        <v-dialog
                v-model="toggle"
                persistent
                max-width="600"
        >
            <v-card>
                <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                    <v-toolbar-title  >
                        <i class="mdi mdi-bell-check"></i> New Task
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                    <v-form>
                        <v-select
                                label="Select Project"
                                outlined
                                dense
                                prepend-inner-icon="mdi-briefcase-variant"
                        />

                        <v-select
                                label="Select Users"
                                outlined
                                dense
                                prepend-inner-icon="mdi-account-multiple"
                        />

                        <v-text-field
                                label="Task Name"
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
                            @click="saveTask"
                            class="menu-btn"
                            tile
                    >
                        Add Task
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "NewTaskModal",
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
            async saveTask(){

            }
        }
    }
</script>

<style scoped>

</style>
