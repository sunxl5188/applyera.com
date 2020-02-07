// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@@/js/bootstrap'
import laydate from '@@/js/laydate/laydate'
import layer from 'layui-layer'
import vueCookie from 'vue-cookies'
// import { VueMasonryPlugin } from 'vue-masonry'
import '@~/js/vueFilter'
import '@@/css/main.scss'
let $ = require('jquery')
window.$ = window.jQuery = $

Vue.prototype.layer = layer
Vue.prototype.laydate = laydate
Vue.use(vueCookie)
// Vue.use(VueMasonryPlugin)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let V = new Vue()
  let isLogin = V.$cookies.get('isLogin')
  let userInfo = V.$cookies.get('userInfo')
  let arr = to.meta.group
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin === '1') {
      // 如果已登录，更新登录有效时间
      if (userInfo) {
        let access = userInfo.access
        if (arr[0] !== 'payment') {
          // console.log(access,access[arr[0]],arr[0])
          if (access[arr[0]] === undefined) {
            next()
            return false
          }
          // 一级
          // console.log(access[arr[0]])
          if (access[arr[0]]['show'] === 0) {
            V.layer.alert('您无权访问该页面！', {icon: 2})
            return false
          } else {
            // 二级
            if (arr[0] !== 'home' && access[arr[0]]['child'][arr[1]] === 0) {
              V.layer.alert('您无权访问该页面！', {icon: 2})
              return false
            }
          }
        }
      }
      next()
    } else {
      sessionStorage.clear()
      // router.push('/login')
      V.layer.alert('登录超时，请重新登录！', {icon: 2}, function () {
        window.location.href = '/login'
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 11
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
