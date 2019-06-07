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

export async function getAll(page, number=20) {
    return axios({
        method:'get',
        url: 'http://photo.upc.pub/photo/get_all/' + page +'/' + number,
    })
}

export async function sharePhoto(share_info) {
    return axios({
        method:'post',
        url: 'http://photo.upc.pub/share/add/',
        data: {
            "type":"0",
            "password":share_info.password,
            "expiration":share_info.expiration,
            "shareList":share_info.list,
        }
    })
}
