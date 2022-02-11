import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import http from './plugins/http'

import router from './router'

import * as VueAos from 'vue-aos'
Vue.use(VueAos)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

require('./plugins/helpers')
window.axios = require('axios');

import "./scss/web.css";

import NProgress from 'nprogress';
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

Vue.config.productionTip = false
require('./store/Subscriber')

store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{
    new Vue({
        store,
        router,
        http,
        render: h => h(App),
        vuetify: new Vuetify({theme: {
                themes: {
                    light: {
                        success: '#4caf54',
                        primary: '#6A1B9A',
                    },
                    dark: {
                        success: '#4caf54',
                        primary: '#6A1B9A',
                    },
                },
            },}),
    }).$mount('#app')
})
