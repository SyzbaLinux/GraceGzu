<template>
    <v-app id="inspire">
        <v-main>
            <transition :name="transitionName" mode="out-in"   origin="center center">
                <router-view></router-view>
            </transition>
        </v-main>
        <Footer/>
    </v-app>
</template>

<script>
import Footer from "./Footer";
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "PublicLayout",
    components:{
        Footer
    },
    watch:{
        authenticated(){
            if(!this.authenticated){
                this.$router.push({ name: 'login'})
            }
        },
    },
    computed:{
        ...mapGetters({
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        }),
    },
    data(){
        return{
            flat:true,
            colored:'transparent',
            btnColor:'white',
            transitionName:'scale-transition',
            animate: false,
            clipped: true,
            drawer: false,
            fixed: false,

        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            let transitionName = to.meta.transitionName || from.meta.transitionName;
            if (transitionName === 'slide') {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                transitionName = toDepth < fromDepth ? 'slide-x-transition' : 'scroll-x-reverse-transition';
            }
            this.transitionName = transitionName || 'slide-x-transition';
            next();
        });
    },
    methods:{
        ...mapActions({
            signOut: 'auth/signOut'
        }),
        onScroll(){
            if (window.pageYOffset > 25) {
                this.colored = 'white';
                this.btnColor = 'black';
                this.flat = false
            } else {
                this.colored = 'transparent';
                this.btnColor = 'white';
                this.flat = true
            }
        }
    }
}
</script>

<style>
.easy-all{
    transition: all 0.4s ease 0.03s;
}
</style>
