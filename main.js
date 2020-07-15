import Vue from 'vue'
import App from './App'
import publicHeader from './components/public_header'
import appAlert from './components/appAlert'
import store from './store/signIn.js'
Vue.config.productionTip = false

App.mpType = 'app'
import { dianji } from './common/common'
Vue.prototype.$dianji = dianji;
import dfilters from './common/filter.js';

for (let key in dfilters) {
    Vue.filter(key, dfilters[key]);
}
Vue.component('public-header', publicHeader) //头部组件
Vue.component('appAlert', appAlert) //头部组件

const app = new Vue({
    ...App,
    store
})
app.$mount()
