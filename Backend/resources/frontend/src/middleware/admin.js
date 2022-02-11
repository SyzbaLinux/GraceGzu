import store from "../store";

export default function auth({ next, router }) {

    if(store.getters['auth/user'].role !== 'admin'){
        return router.push({ name: 'error-403'});
    }

    return next();
}
