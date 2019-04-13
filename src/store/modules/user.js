
import {getUserInfo, login} from '../../api/user';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default ({
    state: {
// 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        UserName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    },
    mutations: {
// 修改token，并将token存入localStorage
        saveToken(state, token) {
            state.Authorization = token;
            localStorage.setItem('Authorization', token);
        },
        saveUserName(state, userName) {
            state.UserName = userName;
            localStorage.setItem('userName', userName);
        },
    },
    getters: {
        getUserName(state) {
            return state.UserName;
        },
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            const password = userInfo.password.trim();
            return new Promise((resolve, reject) => {
                login(username, password).then((response) => {
                    const data = response.data;
                    if ( typeof(data.token) === 'undefined' || data.token === null || data.token === '') {
                        throw new Error('用户名或密码错误');
                    }
                    commit('saveToken', data.token);
                    resolve(response);
                }).catch(
                    (error) => {
                        reject(error);
                    });
            });
        },
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response.data;
                    commit('saveUserName', data.username);
                    resolve(response);
                }).catch(
                    error => {
                        reject(error);
                    });
            });
        },
    },
});

