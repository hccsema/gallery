import axios from '../axios'

export async function deletePhoto(id) {
    return axios( {
        method : 'post',
        url : '/photo/delete',
        params: {
            id : id,
        },
    });
}


export async function getPhoto(id) {
    return axios({
        method: 'get',
        url: 'http://photo.upc.pub/photo/get_photo/' + id,
        responseType: 'blob',
    })
}


export async function getThumbnailPhoto(id) {
    return axios({
        method: 'get',
        url: 'http://photo.upc.pub/photo/get_thumbnail_photo/' + id,
        responseType: 'blob',
    })
}
