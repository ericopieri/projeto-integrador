import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/css/style.css'
import VueCarousel from 'vue-carousel';

import './axios/index.js'

Vue.use(VueCarousel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
