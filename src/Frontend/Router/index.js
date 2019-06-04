import Login from '../Secciones/Login.vue';
import Inicio from '../Secciones/Inicio.vue';
import Clasificacion from '../Secciones/Clasificacion.vue';
import Logout from '../Secciones/Logout.vue';
import Users from '../Secciones/Users.vue';
import Products from '../Secciones/Products.vue';
import store from '../Store/store.js';
import Lotes from '../Secciones/Lotes.vue';
import Almacen from '../Secciones/Almacen.vue';
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
        component: Login, 
        name: 'login', 
        meta: {notAuth: true},
        beforeEnter: (to, from, next) =>  store.state.IsLogged == true ? next('/') : next()
    },
    {
        path: '/usuarios',
        component: Users,
        name: 'users',
        beforeEnter: (to, from, next) =>  store.state.Permissions.administrador > 1 ? next() : next('/')
    },
    {
        path: '/productos',
        component: Products,
        name: 'productos',
        beforeEnter: (to, from, next) => store.state.Permissions.productos > 1 ? next() : next('/')
    },
    {
        path: '/lotes',
        component: Lotes,
        name: 'lotes',

    },
    {
        path: '/almacen',
        component: Almacen,
        name: 'almacen'
    },
    { path: '/logout', component: Logout }
]