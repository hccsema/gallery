import Vue from 'vue';
import Router from 'vue-router';
import About from './pages/About';
import Home from './pages/Home';
import Load from './pages/Load';
import Login from './pages/Login'
import Register from "./pages/Register";
import Sex from "./pages/Sex";
import TimeLine from "./pages/TimeLine";
import MapAlbum from "./pages/MapAlbum";
import ChangePassword from "./pages/ChangePassword";
import Info from "./pages/Info";

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
                {
                    path: '/Map',
                    component: MapAlbum
                },
                {
                    path: '/changepassword',
                    component: ChangePassword
                },
                {
                    path: '/info',
                    component: Info
                }
            ]

        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/register',
            component: Register
        },
    ]
})
