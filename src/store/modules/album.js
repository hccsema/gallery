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
                        //console.log(data);
                        commit("clearAlbum");
                        for(let i=0; i < data.length ;i++)
                        {
                            commit("updateAlbum",data[i]);
                        }
                        resolve(res);
                    }).catch(error =>{
                        reject(error);
                    })
                })
            )
        },

        //传入对象（all）包含2个参数
        //param1: album
        //param2：photoId

        MoveToAlbum({commit},all){
            return new Promise(((resolve, reject) => {
                moveToAlbum(all.album.id,all.photoId).then(res=>{
                        commit("moveToAlbumFromUrlId",all);
                        resolve(res);
                    }).catch(error =>{
                        reject(error);
                    })
                })
            )
        },
    },

    mutations: {
        clearAlbum(state){
          state.album = [];
        },

        updateAlbum(state, album) {
            state.album.push(album); // 进行动态的操作
        },


    },
    getters:{
        getAlbum(state){
            return state.album;
        }
    },



}
