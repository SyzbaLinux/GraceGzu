<template>
  <div >

    <div class="main-hero mt-n16  ">
      <vue-particles
          class="login-background"
          color="#bcb8b7"
          :particleOpacity="0.7"
          :particlesNumber="65"
          shapeType="circle"
          :particleSize="4"
          linesColor="#bcb8b7"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="5"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
      ></vue-particles>
      <div class="text-center mt-15 container">
        <v-card  class="mx-auto text-center" max-width="500">
          <v-card-title class="mb-5 pt-5">
            <v-toolbar dark dense color="primary">
              <v-toolbar-title>
                Create Account
              </v-toolbar-title>
            </v-toolbar>
          </v-card-title>

          <v-alert
              border="left"
              dismissible
              icon="mdi-alert"
              type="error"
              v-if="get_gen_errors"
              @click="clearGenErrors"
          >
            {{ get_gen_errors }}
          </v-alert>


          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                      :rules="titleRules"
                      :error-messages="title_errors"
                      @input="clearTitleErrors"
                      v-model="form.title"
                      prepend-inner-icon="mdi-account"
                      label="Work Title"
                      outlined
                      dense
                      type="text"
              />

              <v-text-field
                      :rules="nameRules"
                      :error-messages="name_errors"
                      @input="clearNameErrors"
                      v-model="form.name"
                      prepend-inner-icon="mdi-account"
                      label="Name"
                      outlined
                      dense
                      type="text"
              />
              <v-text-field
                      :rules="emailRules"
                      :error-messages="email_errors"
                      @input="clearEmailErrors"
                      v-model="form.email"
                      prepend-inner-icon="mdi-email"
                      label="Email"
                      type="email"
                      outlined
                      dense
              />
              <v-text-field
                      :rules="passwordRules"
                      :error-messages="password_errors"
                      @input="clearPasswordErrors"
                      v-model="form.password"
                      prepend-inner-icon="mdi-lock"
                      label="Password"
                      outlined
                      dense
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
              />
              <v-text-field
                  v-model="form.password_confirmation"
                  prepend-inner-icon="mdi-lock"
                  label="Password Confirmation"
                  outlined
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
              />
              <v-btn
                  :loading="loading"
                  type="submit"
                  block
                  color="primary"
                  class="mt-3"
              >
                Register
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="elevation-3 mt-5 mb-5">
            <v-container class="text-center">
              New to our here? <router-link :to="{ name:'register'}">Create Free Account</router-link>
            </v-container>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "Login",

  data(){

    return{
      valid:false,
      loading:false,
      showPassword: false,
      form:{
            name: '',
            title: '',
            accepted_terms: 1,
            email: '',
            password: '',
            password_confirmation: '',
      },


      nameRules: [
        v => !!v || 'Fullname is required',
        v => v.length >= 3 || 'Name must be more than 3 characters',
      ],

      titleRules: [
        v => !!v || 'Work Title is required',
      ],

      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 5 || 'Password must be more than 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        // v => v.length >= 100 || 'Email is Taken, Please login',
      ],
    }

  },

  computed:{
    ...mapGetters({
      user: 'auth/user',
      authenticated: 'auth/authenticated',
      email_errors: 'auth/get_email_errors',
      password_errors: 'auth/get_password_errors',
      get_gen_errors: 'auth/get_gen_errors',
      name_errors: 'auth/get_name_errors',
      title_errors: 'auth/get_title_errors',
    })
  },

  watch:{
    authenticated(){
      if(this.authenticated){
        this.redirectUser()
      }
    },
  },


  async created(){
    if(this.authenticated){
      this.redirectUser()
    }
  },
  methods: {

    redirectUser(){

      if(this.user.role === 'admin'){
        this.$router.push({ name: 'admin.dashboard'})
      }
      else{
        this.$router.push({ name: 'task.dashboard'})
      }
    },

    ...mapActions({

      Register: 'auth/Register'
    }),

    async register(){
      this.loading =true

      await this.Register(this.form).then((res)=>{
        if(res === true){
          this.redirectUser()
        }
      })

      this.loading = false
    },

    clearEmailErrors(){
      if(this.email_errors){
        this.$store.commit('auth/SET_EMAIL_ERROR', null)
      }
      this.clearGenErrors()
    },

    clearPasswordErrors(){
      if(this.password_errors){
        this.$store.commit('auth/SET_PASSWORD_ERROR', null)
      }
      this.clearGenErrors()
    },

    clearGenErrors(){
      this.$store.commit('auth/SET_GENERAL_ERROR', null)
    },

    clearNameErrors(){
      this.$store.commit('auth/SET_NAME_ERROR', null)
    },
    clearTitleErrors(){
      this.$store.commit('auth/SET_TITLE_ERROR', null)
    },


  },
}
</script>

<style scoped>

.main-hero{
  padding-top: 60px;
  min-height: 600px;
  background-image: url('../../assets/images/auth-bg.png');
  background-position: bottom;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;

}

.login-background {
  width: 100%;
  height: 75vh;
  position: absolute;
}
</style>
