import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import http from './plugins/http'

import router from './router'

import * as VueAos from 'vue-aos'
Vue.use(VueAos)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

require('./plugins/helpers')

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
        vuetify,
    }).$mount('#app')
})
