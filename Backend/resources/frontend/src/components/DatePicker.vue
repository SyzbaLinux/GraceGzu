<template>
    <div>
        <!-- Date picker -->
        <v-dialog
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        v-model="selected"
                        v-on:input="$emit('input', $event)"
                        @blur="date = parseDate(value)"
                        v-on="on"
                        v-bind="attrs"
                        :label="label"
                        outlined
                        dense
                        color="success"
                        prepend-inner-icon="mdi-calendar"
                        clearable

                />
            </template>
            <v-date-picker
                    :type="type"
                    v-model="selected"
                    no-title
                    @input="menu1 = false"
                    header-color="primary"
                    color="primary"
            />
        </v-dialog>
        <!-- end of date picker -->
    </div>
</template>

<script>
    export default {
        name: 'DatePicker',
        props: {
            value: {
                type: String,
                default:'',
            },
            type:{
                type:String,
                default:''
            },
            label:{
                type:String,
                default:''
            }
        },
        data () {
            return {
                menu1: null,
                date:null
            }
        },
        computed: {
            selected: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            computedDateFormatted () {
                return this.formatDate(this.date)
            }
        },
        watch: {
            date () {
                this.value = this.formatDate(this.date)
            }
        },
        methods: {
            formatDate (date) {
                if (!date) { return null }
                return date
            },
            parseDate (date) {
                if (!date) { return null }
                const [year, month, day] = date.split('-')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }
        }
    }
</script>