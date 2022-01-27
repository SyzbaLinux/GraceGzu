const axios = require('axios').default;

export default {
    namespaced:true,
    state:{
        token:null,
        user:null,
        email_error:null,
        password_error:null,
        phone_errors:null,
        fullname_error:null,
        gen_error:null,
        terms_errors:null,
    },

    getters:{
        authenticated(state){
            return state.token && state.user
        },

        user(state){
            return state.user
        },


        get_email_errors(state){
            return state.email_error
        },

        get_password_errors(state){
            return state.password_error
        },

        get_phone_errors(state){
            return state.phone_errors
        },

        get_fullname_errors(state){
            return state.fullname_error
        },


        get_gen_errors(state){
            return state.gen_error
        },

        get_terms_errors(state){
            return state.terms_errors
        },

    },
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        },
        SET_USER(state,user){
            state.user      = user
        },



        SET_EMAIL_ERROR(state,email_error){
            state.email_error = email_error
        },

        SET_PASSWORD_ERROR(state,password_error){
            state.password_error = password_error
        },

        SET_PHONE_ERROR(state,phone_errors){
            state.phone_errors = phone_errors
        },

        SET_FULLNAME_ERROR(state,fname_error){
            state.fullname_error = fname_error
        },

        SET_GENERAL_ERROR(state,gen_error){
            state.gen_error = gen_error
        },

        SET_TERMS_ERROR(state,terms_errors){
            state.terms_errors = terms_errors
        }
    },

    actions:{

        async SignIn({ dispatch, commit, state },loginData){

            if(state.gen_error){
                commit('SET_GENERAL_ERROR', null)
            }

            await axios.post('auth/login', loginData).then(response=>{
                return dispatch('attempt',response.data.token)

            }).catch(error => {

                if(error.response.data.errors){
                    commit('SET_GENERAL_ERROR', error.response.data.errors)
                }

                if(error.response.data.errors.email){
                    commit('SET_EMAIL_ERROR', error.response.data.errors.email)
                }

                if(error.response.data.errors.password){
                    commit('SET_PASSWORD_ERROR', error.response.data.errors.password)
                }
            })

        },

        // eslint-disable-next-line no-unused-vars
        async Register({ dispatch, commit },registerData){

            try{
                await axios.post('auth/register', registerData).then(()=>{

                    return dispatch('SignIn',registerData)

                }).catch(error => {

                    if(error.response.data.message){
                        commit('SET_GENERAL_ERROR', error.response.data.message)
                    }
                    if(error.response.data.errors.name){

                        commit('SET_FULLNAME_ERROR', error.response.data.errors.fullname)
                    }
                    if(error.response.data.errors.email){
                        commit('SET_EMAIL_ERROR', error.response.data.errors.email)
                    }
                    if(error.response.data.errors.password){
                        commit('SET_PASSWORD_ERROR', error.response.data.errors.password)
                    }
                    if(error.response.data.errors.mobile){

                        commit('SET_PHONE_ERROR', error.response.data.errors.mobile)
                    }
                    if(error.response.data.errors.terms_errors){

                        commit('SET_TERMS_ERROR', error.response.data.errors.terms_errors)
                    }

                })
            } catch (e) {

                return e
            }
        },

        async attempt({ commit, state },token){
            if(token){
                commit('SET_TOKEN', token)
            }
            if(!state.token){
                return false
            }
            try {

                await axios.post('auth/user')
                    .then(res=>{
                        commit('SET_USER', res.data.user)
                        return true

                    })
                    .catch(error=>{

                        commit('SET_TOKEN', null)
                        commit('SET_USER', null)
                        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
                        console.log(error)
                    })

            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                axios.defaults.baseURL = '/api/';
            }
        },

        async signOut ({ commit }){
            try{

                await axios.post('auth/logout').then((res)=>{
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                    console.log(res.data)

                }).catch(error=>{

                    console.log(error)
                })

            } catch (e) {
                console.log(e)
            }
        },
    },

}
