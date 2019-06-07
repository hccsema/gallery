import Vue from 'vue';
import Router from 'vue-router';
import About from './pages/About';
import Home from './pages/Home';
import Load from './pages/Load';
import Login from './pages/Login'
import ChangePassword from "./pages/ChangePassword";
import Register from "./pages/Register";
import Sex from "./pages/Sex";
import TimeLine from "./pages/TimeLine";
import MapAlbum from "./pages/MapAlbum";
import UserInfo from "./pages/UserInfo";
import CreateAlbum from "./pages/CreateAlbum";
import Classify from "./pages/Classify";
import Album from "@/pages/Album";
import Privacy from '@/pages/Privacy';
import LoginPrivacy from '@/pages/LoginPrivacy';
import ATPhotos from "@/pages/ATPhotos";
import ShareLogin from "@/pages/ShareLogin"
import SharePhoto from "./pages/SharePhoto";


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: '',
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            // beforeEnter: (to, from, next)=>{
            //     if (to.matched.some(record => record.meta.requireAuth)) {
            //         if (localStorage.userName) {
            //             next();
            //         } else {
            //             next({
            //                 path: '/login',
            //                 // //登陆成功后跳转至该路由
            //                  query: {
            //                     redirect: to.fullPath
            //                  }
            //             });
            //         }
            //     } else {
            //         next();
            //     }
            // },
            children:[
                {
                    path:'/',
                    component: TimeLine
                },
                {
                    path:'/share/get/:id',
                    component: ShareLogin
                },
                {
                    path:'/sharephoto',
                    component:SharePhoto
                },
                {
                    path: '/load',
                    name: '下载/上传',
                    component: Load,
                },
                {
                    path: '/sex',
                    component: Sex
                },
                {
                    path: '/privacy',
                    component: Privacy
                },
                {
                    path: "/loginPrivacy",
                    component: LoginPrivacy
                },
                {
                    path: '/about',
                    component: About
                },
                {
                    path: '/info',
                    component: UserInfo
                },
                {
                    path: '/map',
                    component: MapAlbum
                },
                {
                    path: '/changePwd/:index',
                    name:'ChangePassword',
                    component: ChangePassword
                },
                {
                    path: '/classify',
                    component: Classify
                },
                {
                    path: '/classifyPhoto/:name',
                    name:'ClassifyPhoto',
                    component: ATPhotos
                },
                {
                    path: '/create',
                    component: CreateAlbum
                },
                {
                    path:'/album',
                    component: Album,

                },
                {
                    name: 'AlbumPhoto',
                    path:'albumPhoto/:name',
                    component: ATPhotos,
                },
                {
                    name:'MapPhoto',
                    path:'mapPhoto/:name',
                    component: ATPhotos,
                }


            ]

        },
        // {
        //     path: '/test/',
        //     component: TestHome,
        //     children:[
        //         {
        //             path:'/test/',
        //             component: TimeLine
        //         },
        //         {
        //             path: 'load',
        //             component: Load,
        //         },
        //         {
        //             path: 'sex',
        //             component: Sex
        //         },
        //         {
        //             path: 'about',
        //             component: About
        //         },
        //         {
        //             path: 'info',
        //             component: UserInfo
        //         },
        //         {
        //             path: 'map',
        //             component: MapAlbum
        //         },
        //         {
        //             path: 'changePwd',
        //             component: ChangePassword
        //         },
        //     ]
        // },
        {
            path:'/login',
            component: Login
        },

        {
            path:'/register',
            component: Register
        },
    ]
});


