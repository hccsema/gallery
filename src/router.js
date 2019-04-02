import Vue from 'vue';
import Router from 'vue-router';
import About from './pages/About';
import Home from './pages/Home';
import Load from './pages/Load';
import Login from './pages/Login'
import Sex from "@/pages/Sex";

Vue.use(Router);

export default new Router({
    //配置路由
    routes: [
        {
            path: '/',
            component: Home,

        },
        {
            path: '/about',
            component: About
        },
        {
            path:'/login',
            component: Login
        },
        {
            path: '/load',
            component: Load

        },
        {
            path: '/sex',
            component: Sex
        }

    ]
})
