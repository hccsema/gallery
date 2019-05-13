import axiox from '@/axios'

export async function getTypeList() {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/photo/get_type_list',
    });
}

export async function getPhotoByType(name) {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/photo/get_photo_by_type',
        params:{typeName: name},
    });
}

//get_thumbnail_photo
