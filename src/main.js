import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/style.css"
import "@/assets/ico-fonts.css"
import "@/assets/ico-fonts-v2.css"

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
