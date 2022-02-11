 <template>
    <v-card flat color="transparent">
        <v-toolbar
            color="primary"
            dark
            extended
            flat
        >
        </v-toolbar>

        <v-card
            class="mx-auto ml-1 mr-2"
            style="margin-top: -44px;"
        >
            <v-toolbar flat>
                <v-toolbar-title class="grey--text">
                    Project Stages
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="toggle"
                    persistent
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-toolbar flat dark  color="#8E24AA"  dense class="mb-5">
                            <v-toolbar-title  >
                                <i class="mdi-server-network"></i> New Project Stage
                            </v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    outlined
                                    label="Full Name"
                                    v-model="form.name"
                                    :rules="nameRulesErrors"
                                    :error-messages="nameErrors"
                                    dense
                                />
                            </v-form>

                        </v-card-text>
                        <v-card-actions class="elevation-3">
                            <v-btn
                                color="error"
                                text
                                @click="close"
                                class="menu-btn"
                            >
                                Cancel
                            </v-btn>
                            <v-spacer/>
                            <v-btn
                                color="success"
                                class="menu-btn"
                                @click="save"
                            >
                                Add
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <v-divider></v-divider>

            <v-card-text>
                <v-list dense>
                    <v-subheader>Stages</v-subheader>
                    <v-list-item-group>
                        <v-list-item
                            v-for="(stage, i) in stages"
                            :key="i"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-tag</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ stage.id }}. {{ stage.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </v-card>
</template>
<script>
    export default {
        name: "Settings",
        components: {},
        data() {
            return {
                stages:null,
                toggle:false,
                form:{
                    name:''
                },

                nameRulesErrors: [
                    v => !!v || 'Name is required',
                    v => v.length >= 3 || 'Name must be more than 3 characters',
                ],
                nameErrors:''

            }
        },
        created() {
            this.getAll()
        },
        methods: {
            async save(){
                await axios.post('admin/stages', this.form).then(res=>{
                    this.successMessage(res.data.message)
                    this.form.title = ''
                    this.getAll()
                    this.close()

                }).catch(error=>{
                    this.nameErrors = error.response.data.errors.name
                })
            },


            async getAll(){
                await axios.get('admin/stages' ).then(res=>{
                    this.stages   = res.data

                }).catch(error=>{
                    console.log(error)
                })
            },

            close(){
                this.toggle = false
            }
        }
    }
</script>

<style scoped>

</style>
