import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import linkify from 'vue-linkify'

Vue.directive('linkified', linkify)

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
