import Vue from 'vue';
import Vuex from 'vuex'
import {getPhoto, deletePhoto, getThumbnailPhoto, getAll} from "../../api/photo";

Vue.use(Vuex);

export default {
    state:{
        total_pages:'',
    },
    actions:{

        GetAll({commit,rootState},page,number=20){
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
                        commit("deletePhotoFromUrlId",id, {root:true});
                        resolve(response);
                    }).catch(error=>{
                        reject(error);
                    });
                }
            )
        },

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
    },
    getters:{

    }
}
