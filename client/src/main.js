import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import vueRouter from "vue-router";
import Routes from "./routes/routes";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(vueRouter);

const router = new vueRouter({ routes: Routes, mode: "history" });

new Vue({
  vuetify,
  render: (h) => h(App),
  router: router,
}).$mount("#app");
