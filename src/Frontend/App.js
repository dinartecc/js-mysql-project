import Vue from 'vue';
import App from './App.vue';
import 'babel-polyfill';
import VueRouter from 'vue-router';
import Routes from './Router/index.js'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
})


new Vue({
    render: h => h(App),
    router: router
}).$mount('#main')
