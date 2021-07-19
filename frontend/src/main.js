import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'

const moment = require('moment')
require('moment/locale/pt-br')
Vue.use(require('vue-moment'), {
  moment
})

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
