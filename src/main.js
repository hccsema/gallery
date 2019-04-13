import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAMap from 'vue-amap';
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(Vuex);
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
axios.defaults.baseURL= 'http://photo.upc.pub';



VueAMap.initAMapApiLoader({
  key: '615c48d257645255f6988d27c54fb0de',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

// const store = new Vuex.store(
//     {
//
//     }
// )

new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')
