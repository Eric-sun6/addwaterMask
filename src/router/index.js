import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'q'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/compress',
      name: 'Compress',
      component: () => import('@/pages/Compress')
    },
    // {
    //   path: '/compress',
    //   name: 'Compress',
    //   component: () => import('/')
    // }
  ]
})
