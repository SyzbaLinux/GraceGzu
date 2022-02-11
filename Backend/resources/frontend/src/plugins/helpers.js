import Vue from 'vue'
//Vue Filter to make first letter Capital
Vue.filter("strToUpper", function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

//Vue moment js to show human readable date
import moment from "moment"; //Import Moment

Vue.filter("formatDate", function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Vue.filter("formatDateEmail", function(date) {
    return moment(date).format('ddd, D-MMM-YYYY, HH:mm  ');
});

import Swal from 'sweetalert2'
window.Swal = Swal

Vue.mixin({
    methods: {
        logMessage(res) {
            const values = Object.values(res.response.data.errors)
            // eslint-disable-next-line no-unused-vars
            for (const value of values) {
                var message = [];
                for (let i = 0; i < values.length; i++) {
                    message.push(values[i][0])
                }
                var errormsgs = message.splice(',').join("<br/>")
                Swal.fire('Failed',''+errormsgs+'','error')
            }
        },

        successMessage(message){
            Swal.fire('Success',''+message+'','success')
        },

        fireInfo(message){
            Swal.fire('Infomation',''+message+'','info')
        }
    }
})


