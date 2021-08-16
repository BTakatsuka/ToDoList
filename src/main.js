import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false


const getApiConfig = async () => {
  const apiConfig = await fetch("/data/api-config.json");
  return await apiConfig.json();
};
getApiConfig().then(function(json) {
  Vue.mixin({
  data() {
    return {
      API_ENDPOINT: json.API_URL
    };
  }
});
new Vue({
  el: "#app",
  render: h => h(App),
  router
  });
});
/* new Vue({
  render: h => h(App),
  router,
}).$mount('#app') */
