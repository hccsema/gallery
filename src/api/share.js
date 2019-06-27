import axios from '@/axios';

export async function getThumbnailPhotoByShare(id) {
    return axios({
        method: 'get',
        url: 'http://photo.upc.pub/share/get_thumbnail_photo/' + id,
        responseType: 'blob',
    })
}


export async function getPhotoByShare(id) {
    return axios({
        method: 'get',
        url: 'http://photo.upc.pub/share/get_photo/' + id,
        responseType: 'blob',
    })
}

export async function getAllBysShare(id, password) {
    let Base64 = require('js-base64').Base64;
    return axios({
        method: 'get',
        url: 'http://photo.upc.pub/share/get/' + id,
        params:{
            password: Base64.encode(password),
        },
        headers:{
            'ContentType': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
    })
}

export async function isPrivate(id) {
    return axios({
        method:'get',
        url:'http://photo.upc.pub/share/is_private/'+ id,
    })
}
