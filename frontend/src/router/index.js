import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import PublicLayout from "../Pages/Layouts/PublicLayout";
import Welcome from "../Pages/Public/Welcome";
import VerifyAccount from "../Pages/Public/Auth/VerifyAccount";
import Register from "../Pages/Public/Register";
import ForgotPassword from "../Pages/Public/Auth/ForgotPassword";
import AllBlogs from "../Pages/Public/blog/AllBlogs";
import SingleBlog from "../Pages/Public/blog/SingleBlog.";
import NotFound from "../Pages/Errors/NotFound";
import ResetPassword from "../Pages/Public/Auth/ResetPassword";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Dashboard from "../Pages/Admin/Dashboard";
import Home from "../Pages/Task/Home";
import Tasks from "../Pages/Task/Tasks";


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
                path: '',
                name: 'login',
                component: Welcome,
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
        path:'/admin',
        component: AdminDashboard,
        meta:{  middleware: [auth,admin] },
        children: [
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: Dashboard,
                meta:{  middleware: [auth,admin] },
            }
        ]
    },

    {
        path:'/app',
        component: Tasks,
        children: [
            {
                path: 'dashboard',
                name: 'task.dashboard',
                component: Home,
            }
        ]
    },

    {
        path:'not-allowed',
        component:NotFound,
        name:'error-403',
        meta:{   auth: undefined  }
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
