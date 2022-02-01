const axios = require('axios').default;
export default {
    namespaced:true,
    state:{
        admin:[]
    },

    getters:{
        admin(state){
            return state.admin
        },
    },

    mutations:{
        SET_ADMINSTATS(state, admin){
            state.admin      = admin
        },
    },

    actions:{

        async fetchAdminStats({commit}){

            await axios.get('admin/stats').then(resp=>{

                commit('SET_ADMINSTATS', resp.data)

                console.log( resp.data)

            }).catch(error =>{
                console.log(error)
            })
        }
    }
}