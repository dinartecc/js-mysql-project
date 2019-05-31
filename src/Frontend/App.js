import Routes from './Router/index.js'
import App from './App.vue';
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router'
import axios from 'axios'
import 'babel-polyfill';

Vue.use(VueRouter)

import store from './Store/store.js'




const router = new VueRouter({
    routes: Routes,
    mode: 'history',
})

const getUserInfo = async function(){
    try {
        let info = await axios('/userinfo') // Pide la informacion almacenada en la sesion del backend.
        let {permissions , user} = info.data    // Extrae la informacion de los datos recibidos.
        return {permissions, user}
    } catch (error) {
        console.log(error)
    }
}

router.beforeEach( async (to, from, next) => {
    if(store.state.IsLogged){
        let response = await axios('/islogged')
        if(response.data == false){
            store.state.IsLogged = false;
            next('/login') 
        }
        next()
    }else{
        try {
            let response = await axios('/islogged') // Revisa en el backend si existe una sesion activa.
            if(response.data == true){ // Si existe...
                const {permissions, user} = await getUserInfo()
                
                store.state.User = user;                // La almacena en las variables 
                console.log(store.state.User)
                store.state.Permissions = permissions;  // temporales globales.
                store.state.IsLogged = true             // Y existe una sesion.\
                next()
            }else{
                if(to.matched.some(record => record.meta.notAuth)){ // Si en la ruta existe el meta de meta notAuth y si este es verdadero...
                    next()
                }else{                                              // De otra forma...
                    next('/login')                                  // Lo redirige a '/login'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
})
new Vue({
    render: h => h(App),
    router,
    store, 
}).$mount('#main')

