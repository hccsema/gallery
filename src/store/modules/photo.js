import Vue from 'vue';
import Vuex from 'vuex'
import {deletePhoto} from "../../api/photo";

Vue.use(Vuex);

export default {
    state:{

    },
    actions:{
        DeletePhoto({commit},id){
            const _id = id;
            return new Promise( (resolve, reject)=>{
                deletePhoto(_id).then(response=>{
                    resolve(response);
                }).catch(error=>{
                    reject(error);
                })
                }
            )
        }

    },
    mutations:{

    },
    getters:{

    }
}
