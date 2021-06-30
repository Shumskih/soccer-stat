// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
require('./assets/scss/app.css')

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.filter('formatDate', function (date) {
  let dateObject = new Date(date)

  return (
    ('0' + dateObject.getDate()).slice(-2) +
    '.' +
    ('0' + (dateObject.getMonth() + 1)).slice(-2) +
    '.' +
    dateObject.getFullYear()
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
