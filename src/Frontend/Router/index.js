import Login from '../Secciones/Login.vue';
import Inicio from '../Secciones/Inicio.vue';
import Clasificacion from '../Secciones/Clasificacion.vue';
import Logout from '../Secciones/Logout.vue'
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
        console.log("hola" + this.$store)
        /*if(this.$store.state.IsLogged == true){
            next('/')
        }*/
    }},






    { path: '/logout', component: Logout}
]