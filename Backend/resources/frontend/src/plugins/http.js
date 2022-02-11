import Vue from 'vue';

// Axios
import axios    from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = '/api/tasks-manager/';
Vue.use(VueAxios, axios);

export default {
    root:  '/api/tasks-manager/'
};

