import Login from '../Secciones/Login.vue';
import Inicio from '../Secciones/Inicio.vue';
import Clasificacion from '../Secciones/Clasificacion.vue';

export default[
    {
        path: '/',
        component: Inicio
    },
    {
        path: '/clasificacion',
        component: Clasificacion
    }
]