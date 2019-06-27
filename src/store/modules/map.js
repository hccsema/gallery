import Vuex from 'vuex';
import Vue from 'vue';
import {getCityCoverInfo, getCityList} from "@/api/map";

Vue.use(Vuex);

export default {
    state:{

    },
    actions:{
        GetCityList(){
            return new Promise(((resolve, reject) => {
                getCityList().then(response=>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            }))
        },
        GetCityCoverInfo({commit},name){
            return new Promise(((resolve, reject) => {
                getCityCoverInfo(name).then(response=>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
            }))
        },

    },
    mutations: {

    },
    getters:{

    }
}
