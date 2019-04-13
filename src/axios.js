import Service from 'axios';

const axios = Service.create({
    baseURL : 'http://photo.upc.pub',
    timeout : 15000,
});


export default axios;

