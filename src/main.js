import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入阿里图标库
import '@/assets/inconfont/iconfont.css'
import '@/assets/inconfont/iconfont.js'
// 引入样式
import 'github-markdown-css/github-markdown-light.css'

//导入代码高亮文件
import hljs from 'highlight.js' 
//导入代码高亮样式
import 'highlight.js/styles/monokai-sublime.css' 
//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

// 解决路由重复问题
import VueRouter from "vue-router";
Vue.use(VueRouter);




const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import service from '@/plugin/service'
Vue.prototype.service = service

import {Header} from 'element-ui';
Vue.use(Header)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
