import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/modules/user'
import photo from './store/modules/photo'
import classify from './store/modules/classify'
import album from './store/modules/album'
import map from './store/modules/map'


Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        url_id: [],
    },

    modules: {
        user,
        photo,
        classify,
        album,
        map,
    },

    mutations:{
        addUrlId(state,photo){
            // state.url_id.push({
            //     'id':photo.id,
            //     'time':photo.time,
            //     'date':photo.date,
            //     'type':photo.type,
            //     'url':photo.url,
            //     'address':photo.address,
            //     'album':photo.album,
            // });
            state.url_id.push(photo)
        },

        deletePhotoFromUrlId(state, id){
            for(let i=0; i < state.url_id.length ; i++ ){
                if(id === state.url_id[i].id){
                    state.url_id.splice(i,1);
                    break;
                }
            }
        },

        sortUrlIdByTime(rootState){
            rootState.url_id.sort(
                function (a, b) {
                    let value1 = a['time'];
                    let value2 = b['time'];
                    return value1 - value2;
                });
        },

        moveToAlbumFromUrlId(state, all){
            for(let i=0; i < state.url_id.length ; i++ ){
                if(all.photoId === state.url_id[i].id){
                    let center = state.url_id[i];
                    center.album = all.album;
                    state.url_id.splice(i,1,center);
                    break;
                }
            }
        }

    },
    getters:{
        getUrlId(state){
            return state.url_id;
        },
    }
});
