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
import Forbidden from "../Pages/Errors/Forbidden";
import Departments from "../Pages/Admin/Departments";
import Notifications from "../Pages/Admin/Notifications";
import Search from "../Pages/Admin/Search";
import Projects from "../Pages/Admin/Projects";
import AllUsers from "../Pages/Admin/AllUsers";
import AdminAddNew from "../Pages/Admin/AdminAddNew";
import DepartmentView from "../Pages/Admin/DepartmentView";
import Settings from "../Pages/Admin/Settings";
import AdminProjectView from "../Pages/Admin/AdminProjectView";


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
        children: [
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: Dashboard,
            },
            {
                path: 'departments',
                name: 'admin.departments',
                component: Departments,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'department/:id',
                name: 'admin.departments.view',
                component: DepartmentView,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'notifications',
                name: 'admin.notifications',
                component: Notifications,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'projects',
                name: 'admin.projects',
                component: Projects,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'search',
                name: 'admin.search',
                component: Search,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'users',
                name: 'admin.users',
                component: AllUsers,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'settings',
                name: 'admin.settings',
                component: Settings,
                meta:{  middleware: [auth,admin] },
            },
            {
                path: 'project/:id',
                name: 'admin.project.view',
                component: AdminProjectView,
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
        path:'/not-allowed',
        component:Forbidden,
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
