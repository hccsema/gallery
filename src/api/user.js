import axios from '../axios';

export async function login(username, password) {
    return axios( {
        method: 'post',
        url: '/login',
        data:{
            username,
            password,
        },
    });
}

export async function getUserInfo() {
    return axios({
        method: 'get',
        url: '/user/get_info'
    });
}

export async function changeNickName(nickName) {
    return axios({
        method: 'post',
        url: '/user/change_nick_name',
        data: {
            nickName,
        }
    });
}

