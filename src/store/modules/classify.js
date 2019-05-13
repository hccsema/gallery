import Vue from 'vue'
import Vuex from 'vuex'
import {getPhotoByType, getTypeList} from "../../api/classify";
import {getThumbnailPhoto} from "@/api/photo";

Vue.use(Vuex);


export default {
    state:{

    },

    actions:{
        GetTypeList({commit}){

            return new Promise(((resolve, reject) => {
                    getTypeList().then(response=>{
                        resolve(response);
                    }).catch(error =>{
                        reject(error);
                    })
                })
            )
        },

        GetPhotoByType({commit},name){
            return new Promise(((resolve, reject) => {
                getPhotoByType(name).then(response=>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            }))
        },

    },


    mutations: {

    },



}
