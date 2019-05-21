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
        component: Clasificacion
    },
    { path: '/login' ,name: 'login', component: Login , meta: {notAuth: true},
    beforeEnter: (to, from, next) => {
        if(store.state.IsLogged == true){
            next('/')
        }else{
            next()
        }
    }},
    {
        path: '/usuarios',
        component: Users,
        name: 'users'
    },





    { path: '/logout', component: Logout}
]