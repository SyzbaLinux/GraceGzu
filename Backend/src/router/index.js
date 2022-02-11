import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/auth';
import PublicLayout from "../Pages/Layouts/PublicLayout.vue";
import Welcome from "../Pages/Public/Welcome.vue";
import VerifyAccount from "../Pages/Public/Auth/VerifyAccount.vue";
import Register from "../Pages/Public/Auth/Register.vue";
import ForgotPassword from "../Pages/Public/Auth/ForgotPassword.vue";
import Login from "../Pages/Public/Auth/Login.vue";
import About from "../Pages/Public/About.vue";
import Contact from "../Pages/Public/Contact.vue";
import Help from "../Pages/Public/Help.vue";
import AllBlogs from "../Pages/Public/blog/AllBlogs.vue";
import SingleBlog from "../Pages/Public/blog/SingleBlog.vue";
import NotFound from "../Pages/Errors/NotFound.vue";
import ResetPassword from "../Pages/Public/Auth/ResetPassword.vue";


Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        component: PublicLayout,
        children: [
            {
                path: '',
                name: 'welcome',
                component: Welcome,
            },
            {
                path:'blogs',
                component:PublicLayout,
                children:[
                    {
                        path:'',
                        name: 'all-blogs',
                        component: AllBlogs,
                    },
                    {
                        path:':slug',
                        name: 'single-blog',
                        component: SingleBlog,
                    }
                ]
            },
            {
                path: 'contact',
                name: 'contact',
                component: Contact,
            },
            {
                path: 'about',
                name: 'about',
                component: About,
            },
            {
                path: 'help',
                name: 'help',
                component: Help,
            },


            {
                path: 'login',
                name: 'login',
                component: Login,
            },
            {
                path: 'register',
                name: 'register',
                component:Register,
            },
            {
                path: 'verify',
                name: 'verify',
                component:VerifyAccount,
                meta:{ auth }
            },
            {
                path: 'forgot-password',
                name: 'forgot-password',
                component:ForgotPassword,
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component:ResetPassword,
            },
            {
                path: 'verify-account',
                name: 'verify-account',
                component:VerifyAccount,
            },
        ]
    },
    {
        path:'/*',
        component:NotFound,
        name:'error-404',
        meta:{   auth: undefined  }
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

export default router
