import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
  hideModules: { 
    "bold": true, 
    "justifyLeft": true, 
    "justifyCenter": true, 
    "justifyRight": true,
    "headings": true,
    "image": true,
    "table": true,
    "separator": true
  }
});

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
