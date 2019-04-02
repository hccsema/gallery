import Vue from 'vue';
import Router from 'vue-router';
import About from './pages/About';
import Home from './pages/Home';
import Load from './pages/Load';
import Login from './pages/Login'
import Sex from "@/pages/Sex";
import TimeLine from "@/pages/TimeLine";

Vue.use(Router);

export default new Router({
    //配置路由
    routes: [
        {
            path: '/',
            component: Home,
            children:[
                {
                    path:'/',
                    component: TimeLine
                },
                {
                    path: '/load',
                    name: '下载/上传',
                    component: Load

                },
                {
                    path: '/sex',
                    component: Sex
                },
                {
                    path: '/about',
                    component: About
                },
            ]

        },
        {
            path:'/login',
            component: Login
        },
    ]
})
