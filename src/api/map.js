import axiox from '@/axios'

export async function getCityCoverInfo(name) {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/photo/get_photo_by_city',
        params:{cityName:name},
    });
}

export async function getCityList() {
    return axiox({
        method: 'get',
        url:'http://photo.upc.pub/photo/get_city_list',
    });
}
