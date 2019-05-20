import Vue from 'vue'
import Vuex from 'vuex'
import {getAlbumInfo,moveToAlbum} from '../../api/album'

Vue.use(Vuex);


export default {
    state:{
        album:[],
    },

    actions: {
        GetAlbumInfo({commit}) {
            return new Promise(((resolve, reject) => {
                    getAlbumInfo().then(res=>{
                        let data = res.data;
                        for(let i=0; i < data.length ;i++)
                        {
                            commit("getAlbum",{'name':data[i]['name'],'id':data[i]['id']});
                        }
                        resolve(res);
                    }).catch(error =>{
                        reject(error);
                    })
                })
            )
        },
        MoveToAlbum({commit},movedphoto){
            return new Promise(((resolve, reject) => {
                    moveToAlbum(movedphoto).then(res=>{
                        resolve(res);
                    }).catch(error =>{
                        reject(error);
                    })
                })
            )
        },
        // GetAlbumPhoto({commit},album_id) {
        //     return new Promise(((resolve, reject) => {
        //             getAlbumPhoto(album_id).then(res=>{
        //                 let data = res.data;
        //                 for(let i=0; i < data.length ;i++)
        //                 {
        //                     commit("getAlbum",{'name':data[i]['name'],'id':data[i]['id']});
        //                 }
        //                 resolve(res);
        //             }).catch(error =>{
        //                 reject(error);
        //             })
        //         })
        //     )
        // },
    },

    mutations: {
        getAlbum(state, albuminfo) {
            if(JSON.stringify(state.album).indexOf(JSON.stringify(albuminfo)) === -1){
                state.album.push(albuminfo); // 进行动态的操作
            }
        },
    },
    getters:{
        getAlbum(state){
            return state.album;
        }
    },



}
