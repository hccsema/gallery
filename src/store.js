import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/modules/user'
import photo from './store/modules/photo'
import classify from './store/modules/classify'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        photo,
        classify
    },
});
