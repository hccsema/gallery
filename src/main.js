import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NormailizeCss from 'normalize.css'
import Icon from 'vue-awesome/components/Icon'


Vue.config.productionTip = false;
Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  router,


}).$mount('#app')
