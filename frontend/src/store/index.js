import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import task from './modules/task'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{
    },

    modules:{
        auth,task,dashboard
    },
})
