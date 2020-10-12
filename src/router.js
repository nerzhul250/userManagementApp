import Vue from 'vue';
import Router from 'vue-router';
import login from './views/login'
import usuarios from './views/usuarios'
import dependencias from './views/dependencias'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            component: usuarios
        },
        {
            path:'/dependencias',
            name: 'dependencias',
            component: dependencias
        }
    ]
})