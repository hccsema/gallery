import axios from '@/axios'

export async function getAllByFace() {
    return axios({
        method:'get',
        url: '/face/get_all',
    })
}

export async function getPhotoByFace(id) {
    return axios({
        method: 'get',
        url:'/face/get_face/'+ id,
        responseType: 'blob',
    })
}

export async function getFaceGroup(id) {
    return axios({
        method: 'get',
        url:'/face/get_group/'+ id,
    })
}
