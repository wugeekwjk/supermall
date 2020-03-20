import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast)
Vue.use(VueLazyload, {
  loading:require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
