import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios'
//import NormailizeCss from 'normalize.css'
//import Icon from 'vue-awesome/components/Icon'
import VueAMap from 'vue-amap'
import store from './store'
import "bootstrap";
//import layer from 'vue-layer'



//Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.prototype.$ajax = axios;

VueAMap.initAMapApiLoader({
  key: '615c48d257645255f6988d27c54fb0de',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

new Vue({
  render: h => h(App),
  store, //取值：$store
  router,

}).$mount('#app');

