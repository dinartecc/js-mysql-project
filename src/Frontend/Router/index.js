import Login from '../Secciones/Login.vue';
import Inicio from '../Secciones/Inicio.vue';
import Clasificacion from '../Secciones/Clasificacion.vue';
import Logout from '../Secciones/Logout.vue'
import Users from '../Secciones/Users.vue'
import store from '../Store/store.js'
export default[
    {
        path: '/',
        component: Inicio,
        name: 'inicio'
    },
    {
        path: '/clasificacion',
        component: Clasificacion,
        beforeEnter: (to, from, next) => store.state.Permissions.clasificacion > 1 ? next() : next('/')
    },
    { 
        path: '/login' ,
        component: Login , 
        name: 'login', 
        meta: {notAuth: true},
        beforeEnter: (to, from, next) =>  store.state.IsLogged == true ? next('/') : next()
    },
    {
        path: '/usuarios',
        component: Users,
        name: 'users'
    },





    { path: '/logout', component: Logout}
]