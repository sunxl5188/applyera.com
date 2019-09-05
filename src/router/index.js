import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'manage',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exactActive',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'], resolve),
      meta: {
        requiresAuth: true,
        title: '首页',
        group: ['home', '', '']
      },
      children: [
        {
          path: 'home/taskdate',
          name: 'taskdate',
          component: resolve => require(['@/components/TaskDate'], resolve),
          meta: {
            title: '日历', requiresAuth: true, group: ['home', 0, '']
          }
        },
        {
          path: 'home/payment',
          name: 'payment',
          component: resolve => require(['@/components/Payment'], resolve),
          meta: {
            title: '在线支付', requiresAuth: true, group: ['home', 1, '']
          }
        },
        {
          path: 'home/user',
          name: 'userInfo',
          component: resolve => require(['@/components/User'], resolve),
          meta: {
            title: '个人中心', requiresAuth: true, group: ['home', 2, '']
          }
        },
        {
          path: 'home/enterprise',
          name: 'enterprise',
          component: resolve => require(['@/components/Enterprise'], resolve),
          meta: {
            title: '我的企业', requiresAuth: true, group: ['home', 3, '']
          }
        },
        {
          path: 'home/imagecropper',
          name: 'imagecropper',
          component: resolve => require(['@/components/ImageCropper'], resolve),
          meta: {
            title: '我的企业', requiresAuth: true, group: ['home', 4, '']
          }
        },
        {
          path: 'home/workProcess',
          name: 'workProcess',
          component: resolve => require(['@/components/WorkProcess'], resolve),
          meta: {
            title: '工作流程', requiresAuth: true, group: ['home', 5, '']
          }
        }
      ]
    },
    {
      path: '*', name: 'Error', component: resolve => require(['@/components/Error'], resolve)
    }
  ]
})
