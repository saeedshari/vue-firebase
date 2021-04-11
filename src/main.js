import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "@/firebase/index.js"

// loads the Icon plugin
UIkit.use(Icons);

Vue.config.productionTip = false
require("./assets/main.scss")

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
