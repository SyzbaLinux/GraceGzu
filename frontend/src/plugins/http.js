import Vue from 'vue';

// Axios
import axios    from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
Vue.use(VueAxios, axios);

export default {
    root:  'http://127.0.0.1:8000/api/'
};

