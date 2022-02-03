<template>
    <v-app id="inspire">
        <v-app-bar
            app
            :flat="flat"
            :color="colored"
            v-scroll="onScroll"
            class="easy-all"
        >
            <v-container  class="pa-0 fill-height">
                <router-link :to="{ name:'welcome'}" class="mx-3">
                    <v-img
                        v-if="flat"
                        contain
                        max-width="90px"
                        src="../../assets/images/logo-white.png"
                    />
                    
                    <v-img
                        v-else
                        contain
                        max-width="90px"
                        src="../../assets/images/logo.png"
                    />
                </router-link>
                <v-spacer/>
                
                <div class="hidden-sm-and-down">
                    <v-btn
                        v-for="(menu, i) in menu_items"
                        :key="i"
                        text
                        :to="menu.to"
                        class="menu-btn"
                        :color="btnColor"
                    >
                        {{ menu.title }}
                    </v-btn>
                </div>
                
                <v-spacer/>
                <div v-if="!user" class="hidden-sm-and-down">
                    <v-btn  color="success"  dark  :to="{ name: 'login'}"  class="menu-btn mx-1">
                        <v-icon>mdi-account-key-outline mdi-18px</v-icon>&nbsp;Login
                    </v-btn>
                    <v-btn  color="primary" :outlined="!flat"  dark  :to="{ name: 'register'}"  class="menu-btn mx-1">
                        <v-icon>mdi-account-plus mdi-18px</v-icon>&nbsp;Add Listing
                    </v-btn>
                </div>
                
                <div v-if="user">
                    <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                small
                                v-bind="attrs"
                                v-on="on"
                                class="hidden-sm-and-down no-uppercase"
                            >
                                My Account
                            </v-btn>
                        </template>
                        
                        <v-list>
                            <v-list-item-group   color="primary">
                                
                                <v-list-item  >
                                    <v-list-item-icon>
                                        <v-icon>mdi-teach</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>My Dashboard</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </div>
                
<!--                <v-btn to="/" small color="primary"   class="mx-1 hidden-md-and-up">-->
<!--                    <v-icon>mdi-account</v-icon>-->
<!--                </v-btn>-->
<!--                -->
                <v-menu
                    bottom
                    origin="center center"
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            small
                            v-bind="attrs"
                            v-on="on"
                            class="hidden-md-and-up"
                        >
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    
                    <v-list>
                        <v-list-item-group   color="primary">
                            <v-list-item
                                v-for="(menu, i) in menu_items"
                                :to="menu.to"
                                :key="i"
                            >
                                <v-list-item-icon>
                                    <v-icon>{{ menu.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </v-container>
        </v-app-bar>
        
        
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
            menu_items: [
                {
                    icon:'mdi-home',
                    title: 'Home',
                    to: '/',
                },
                {
                    icon:'mdi-information-outline',
                    title: 'About',
                    to: 'about',
                },
                {
                    icon:'mdi-newspaper-variant-outline',
                    title: 'How To',
                    to: 'help',
                },
                {
                    icon:'mdi-phone-classic',
                    title: 'Contact Us',
                    to:'contact',
                },
            ],
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
