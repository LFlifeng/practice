// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import Axios from 'axios'
// import Http from '@/plugins/http'
import 'mint-ui/lib/style.css'
import './assets/css/base.css'
Vue.config.productionTip = false
// Vue.use(Http)
// Vue.use(Axios)
Vue.use(ElementUI)
Vue.use(Mint)
Vue.prototype.$axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
