import Service from 'axios';
import store from './store';
import router from './router';

const axios = Service.create({
    baseURL : 'http://photo.upc.pub',
    timeout : 15000,
});



axios.interceptors.request.use(function (config) {
   if (config.url !== "/login") {
           config.headers.common['authorization'] = 'Bearer ' + window.localStorage.getItem('Authorization');
   }
   return config;
}),error=>{
    router.push('/login');
    return Promise.reject(error);
};

axios.interceptors.response.use(function (response) {
    if(typeof(response.headers.authorization) !== 'undefined'
        && response.headers.authorization !== null
        && response.headers.authorization !== ''
        && (response.headers.authorization !== store.state.Authorization)){
        store.commit('saveToken', response.headers.authorization)
    }
    return response;
}), error=> {
    if (error.response){
        if(error.response.status === 401) {
                store.commit('delToken');
                router.push('/login');
        }
    }
    return Promise.reject(error);
};



export default axios;

