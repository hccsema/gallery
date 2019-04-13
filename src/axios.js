import service from 'axios';

// 创建axios实例
    const axios = service.create({
        baseURL: 'http://photo.upc.pub', // api的base_url
        timeout: 15000,                  // 请求超时时间
    });


// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
// axios.interceptors.response.use(
//     res => {
//         if(res.headers.authorization){
//             axios.defaults.headers.common['Authorization'] = res.data.token;
//         }
//         return res;
//     },
//     error => {
//         // if (error.response) {
//         //     switch (error.response.status) {
//         //         case 401:
//         //             // 这里写清除token的代码
//         //             router.replace({
//         //                 path: 'login',
//         //                 query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//         //             })
//         //     }
//         // }
//         return Promise.reject(error.response.data)
//     })
export default axios;
