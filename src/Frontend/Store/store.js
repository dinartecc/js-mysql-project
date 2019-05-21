import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
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