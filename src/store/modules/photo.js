import Vue from 'vue';
import Vuex from 'vuex'
import {deletePhoto, getAll, getPhoto, getThumbnailPhoto, sharePhoto} from "../../api/photo";
import {getAllByAlbum} from "@/api/photo";

Vue.use(Vuex);

export default {
    state:{
        total_pages:'',
        dialogPhotoVisible : false,
        pic_detail:{address:{
                country:'',
                city:'',
                province:'',
                district:''
            }},

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

        //obj 3 params

        GetAllByAlbum({commit,rootState},obj){
            return new Promise(((resolve, reject) => {
                getAllByAlbum(obj.id, obj.page, obj.number).then(response=>{
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

        SharePhoto({commit},share_info){
            return new Promise( (resolve, reject)=>{
                    sharePhoto(share_info).then(response=>{
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
                    commit('addUrlId',photo,{root:true});
                    commit('sortUrlIdByTime',{root:true});
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

        RiseDetailsDialog({commit}, pic){
            commit('updatePicDetails', pic);
            commit('changeDialogPhotoVisible');
            return new Promise( (resolve, reject)=>{
                getPhoto(pic.id).then(response =>{
                    pic.url = URL.createObjectURL(response.data);
                    commit('updatePicDetails', pic);
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            })


        }



        //！！！！!
        //1. 用map 将所有图片信息以此存入 state 和 缓存
        //2. 将current_page 和 total_pages存入state

    },
    mutations:{
        changeDialogPhotoVisible(state){
            state.dialogPhotoVisible = !state.dialogPhotoVisible;
        },
        updatePicDetails(state,pic){
            state.pic_detail = pic;
        }
    },
    getters:{
        getDialogPhotoVisible(state){
            return state.dialogPhotoVisible;
        },
        getPicDetail(state){
            return state.pic_detail;
        }
    }
}
