import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import shop from '@/components/shop'
import chat from '@/components/chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [{
      	path: '*',
      	components: {
      		'shop': shop,
      		'chat': chat
      	}
      }]
    }
  ]
})
