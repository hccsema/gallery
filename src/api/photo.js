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
