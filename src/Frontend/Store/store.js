import Vuex from 'vuex'

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


export default store;