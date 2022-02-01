const axios = require('axios').default;
export default {
    namespaced:true,
    state:{
        mytasks:[]
    },

    getters:{
        mytasks(state){
            return state.mytasks
        },
    },

    mutations:{
        SET_MYTASKS(state,mytasks){
            state.mytasks      = mytasks
        },
    },

    actions:{

        async fetchUserTasks({commit}){

            await axios.get('admin/tasks').then(resp=>{

                commit('SET_MYTASKS', resp.data)

                console.log( resp.data)

            }).catch(error =>{
                console.log(error)
            })
        }
    }
}