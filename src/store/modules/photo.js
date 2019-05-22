import Vue from 'vue';
import Vuex from 'vuex'
import {getPhoto, deletePhoto, getThumbnailPhoto, getAll, encryptPhoto} from "../../api/photo";

Vue.use(Vuex);

export default {
    state:{
        url_id: [],
        total_pages:'',
    },
    actions:{

        GetAll({commit},page,number=20){
            return new Promise(((resolve, reject) => {
                getAll(page,number).then(response=>{

                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            }))
        },

        DeletePhoto({commit},id){
            return new Promise( (resolve, reject)=>{
                    deletePhoto(id).then(response=>{
                        commit("deletePhotoFromUrlId",id);
                        resolve(response);
                    }).catch(error=>{
                        reject(error);
                    });
                }
            )
        },
        // EncryptPhoto({commit},id){
        //     return new Promise( (resolve, reject)=>{
        //             encryptPhoto(id).then(response=>{
        //                 commit("encryptPhotoFromUrlId",id);
        //                 resolve(response);
        //             }).catch(error=>{
        //                 reject(error);
        //             });
        //         }
        //     )
        // },

        GetPhoto({commit}, id){
            const _id = id;
            return new Promise( (resolve, reject)=>{
                getPhoto(_id).then(response =>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            })
        },

        GetThumbnailPhoto({commit}, photo){
            return new Promise( (resolve, reject)=>{
                getThumbnailPhoto(photo.id).then(response =>{
                    photo.url = URL.createObjectURL(response.data);
                    commit('addUrlId',photo);
                    commit('sortUrlIdByTime');
                    resolve(photo);
                }).catch(error=>{
                    reject(error);
                })
            })
        },


        GetThumbnailPhotoInCover({commit}, id){
            return new Promise( (resolve, reject)=>{
                getThumbnailPhoto(id).then(response =>{

                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            })
        },

        //！！！！!
        //1. 用map 将所有图片信息以此存入 state 和 缓存
        //2. 将current_page 和 total_pages存入state

    },
    mutations:{
        addUrlId(state,photo){
            state.url_id.push({
                'id':photo.id,
                'time':photo.time,
                'date':photo.date,
                'type':photo.type,
                'url':photo.url,
                'address':photo.address,
                'album':photo.album,
            });
        },


        sortUrlIdByTime(state){
            state.url_id.sort(
                function (a, b) {
                    let value1 = a['time'];
                    let value2 = b['time'];
                    return value1 - value2;
                });
            //对缓存进行修改！！！！

        },
        deletePhotoFromUrlId(state, id){
            for(let i=0; i < state.url_id.length ; i++ ){
                if(id === state.url_id[i].id){
                    state.url_id.splice(i,1);
                    break;
                }
            }
        },
        // encryptPhotoFromUrlId(state, id){
        //     for(let i=0; i < state.url_id.length ; i++ ){
        //         if(id === state.url_id[i].id){
        //             state.url_id.splice(i,1);
        //             break;
        //         }
        //     }
        // },
    },
    getters:{
        getUrlId(state){
            return state.url_id;
        },

    }
}
