import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from '@/request/http'
import api from '@/request/api'
import '@/permission'
import permission from './directive/permission'

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;


Vue.prototype.$EventBus = new Vue()
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(permission)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");