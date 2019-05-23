import axiox from '@/axios'

export async function getAlbumInfo() {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/album/get_all_album',
    });
}

export async function moveToAlbum(albumId,photoId) {
    return axiox({
        method: 'post',
        url:'http://photo.upc.pub/photo/change_to_album',
        params:{albumId: albumId,photoId: photoId},
    });
}

