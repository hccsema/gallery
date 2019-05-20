import axiox from '@/axios'

export async function getAlbumInfo() {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/album/get_all_album',
    });
}

export async function moveToAlbum(movedphoto) {
    return axiox({
        method: 'post',
        url:'http://photo.upc.pub/photo/change_to_album',
        params:{albumId: movedphoto.album_id,photoId:movedphoto.photo_id},
    });
}

// export async function getAlbumPhoto(album_id) {
//     return axiox({
//         method: 'get',
//         url:'http://photo.upc.pub/photo/get_album_photos/' + toString(album_id),
//     });
// }
