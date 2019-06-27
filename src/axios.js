import Service from 'axios';
import store from '@/store';
import router from '@/router';

const axios = Service.create({
    baseURL : 'http://photo.upc.pub',
    timeout : 15000,
});



axios.interceptors.request.use(function (config) {
   if (config.url !== "/login" && config.url !== "/share" ) {
           config.headers.common['authorization'] = 'Bearer ' + window.localStorage.getItem('Authorization');
   }
   return config;
}),error=>{
    router.push('/login');
    return Promise.reject(error);
};

axios.interceptors.response.use( response => {
    if(typeof(response.headers.authorization) !== 'undefined'
        && response.headers.authorization !== null
        && response.headers.authorization !== ''
        && (response.headers.authorization !== store.state.Authorization)){
        store.commit('saveToken', response.headers.authorization)
    }

        if(response.status === 401) {
            console.log('a');
            store.commit('delToken');
            router.push('/login');
        }
    return response;
}),error=> {
    console.log(error);

    return Promise.reject(error);
};



export default axios;

