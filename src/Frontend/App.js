import Vue from 'vue';
import App from './App.vue';
import 'babel-polyfill';
import VueRouter from 'vue-router';
import Routes from './Router/index.js'
import axios from 'axios'
import Vuex from 'vuex'
import 'babel-polyfill';
Vue.use(Vuex)
Vue.use(VueRouter)



const router = new VueRouter({
    routes: Routes,
    mode: 'history',
})


const store = new Vuex.Store({
    state:{
        IsLogged: false,
        Permissions: {},
        User: {},
        CookieTimer: 10000
    }, 
    mutations: {
        LogginFalse: state => state.IsLogged = false,
        LogginTrue: state => state.IsLogged = true
    },
    actions: {
    }
})
router.beforeEach(async(to, from, next) => {
    /*window.setInterval(function(){
        axios.get('/islogged')
            .then((response) => {
                console.log(response.data)
                if(response.data == true){
                    to.matched
                    console.log("loggeado")
                    next()
                }else{
                    console.log("NOLOG")
                    next({path: '/login'})
                }
        })
    }, 5000);*/

    if(store.state.IsLogged){
        next()
    }else{
        try {
            let response = await axios('/islogged')
            if(response.data == true){

                let info = await axios('/userinfo')
                let {permissions , user } = info.data
                store.state.User = user;
                store.state.Permissions = permissions;
                store.state.IsLogged = true
                next()
            }else{
                if(to.matched.some(record => record.meta.notAuth)){
                    console.log("Estas en login")
                    next()
                }else{
                    console.log("NO ESTAS EN LOGIN")
                    next('/login')
                }
            }
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    console.log(store.state.IsLogged)
 
})


new Vue({
    render: h => h(App),
    router,
    store,
    async beforeCreate() {
            
           
        
    }
    
}).$mount('#main')

