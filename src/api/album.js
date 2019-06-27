import axiox from '@/axios'

export async function getAlbumInfo() {
    return axiox({
        method: 'get',
        url:'/album/get_all_album',
    });
}

export async function moveToAlbum(albumId,photoId) {
    return axiox({
        method: 'post',
        url:'/photo/change_to_album',
        params:{albumId: albumId,photoId: photoId},
    });
}


export async function getAllByAlbum(id, page, number=20) {
    return axios({
        method:'get',
        url: 'http://photo.upc.pub/photo/get_album_photos/'+ id +'/'+ page +'/' + number,
    })

}

