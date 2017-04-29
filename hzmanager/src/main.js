// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import 'semantic/dist/semantic.min'
import './components/config/global'
import software from './components/software/main.vue'
import role from './components/role/main.vue'
import user from './components/user/main.vue'
import branch from './components/software/branchs.vue'
import VueRouter from 'vue-router'
//import router from './router'
Vue.config.productionTip = false
Vue.use(VueRouter);
// 自定义字符串过滤器
Vue.filter('substr', function(str, length) {
  if (str.length > length) {
    return str.substr(0, length) + '...';
  } else {
    return str;
  }
});
Vue.filter('transferLanguageToFlag', function(language) {
  switch (language) {
    case 'zh':
      return 'china';
    case 'en':
      return 'united kingdom';
    case 'fr':
      return 'france';
    default:
      'china'
  }
});
Vue.filter('transferLanguageToStr', function(language) {
  switch (language) {
    case 'zh':
      return '中文';
    case 'en':
      return 'English';
    case 'fr':
      return 'France';
    default:
      '中文'
  }
});
Vue.filter('isEmpty', function(e) {
  var t;
  for (t in e)
    return !1;
  return !0
});
//定义路径
const routes = [{
    path: '/',
    component: software
  },
  {
    path: '/role',
    component: role
  },
  {
    path: '/user',
    component: user
  },
  {
    path: '/branch',
    component: branch
  }
]
//创建路由对象
const router = new VueRouter({
  hashbang: false,
  history: true,
  routes
})
/* eslint-disable no-new */
new Vue({
  router: router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
