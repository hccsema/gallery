import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/modules/user';
import photo from './store/modules/photo'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {

    },
    modules: {
        user,
        photo
    },
});
