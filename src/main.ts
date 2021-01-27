import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Select } from 'element-ui';
import './mock'

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
