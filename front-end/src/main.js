// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import iView from 'iview'

import './iview.less'

import './components/filter/indexToSelection'

import PaperCar from './components/sub/paper-car'

Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {
    PaperCar
  }
})
