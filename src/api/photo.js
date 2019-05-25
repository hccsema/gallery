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


export async function getAllByAlbum(id, page, number=20) {
    return axios({
        method:'get',
        url: 'http://photo.upc.pub/photo/get_album_photos/' + id +'/' + page +'/' + number,
    })
}

export async function getAllByType(type) {
    return axios({
        method:'get',
        url: 'http://photo.upc.pub/photo/get_type_photos/'+type,
    })
}

