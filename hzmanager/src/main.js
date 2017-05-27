// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import $ from 'jquery';
import 'semantic/dist/semantic.min';
import login from './components/login/main.vue';
import software from './components/software/main.vue';
import role from './components/role/main.vue';
import user from './components/user/main.vue';
import license from './components/license/main.vue';
import branch from './components/software/branchs.vue';
import inspector from './components/inspector/main.vue';
import toaster from '../toast/dist/jquery.toast.min.js';
import md5 from '../md5/jquery.md5.js';
import VueRouter from 'vue-router';
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
      return '英文';
    case 'fr':
      return '法文';
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
Vue.filter('inspectFlagStr', function(inspectFlag) {
  if(inspectFlag == 1){
    return '通过';
  }else if(inspectFlag == 2){
    return '拒绝';
  }else{
    return '待审';
  }
});
Vue.prototype.toast = {
  success: function(content) {
    $.toast({
      text: content,
      icon: 'success',
      showHideTransition: 'fade', // It can be plain, fade or slide
      bgColor: '#40A977', // Background color for toast
      textColor: '#eee', // text color
      textAlign: 'left', // Alignment of text i.e. left, right, center
      position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
  },
  error: function(content) {
    $.toast({
      text: content,
      icon: 'error',
      showHideTransition: 'fade', // It can be plain, fade or slide
      bgColor: '#C43627', // Background color for toast
      textColor: '#eee', // text color
      textAlign: 'left', // Alignment of text i.e. left, right, center
      position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
  },
  info: function(content) {
    $.toast({
      text: content,
      icon: 'info',
      showHideTransition: 'fade', // It can be plain, fade or slide
      bgColor: '#40A977', // Background color for toast
      textColor: '#eee', // text color
      textAlign: 'left', // Alignment of text i.e. left, right, center
      position: 'bottom-right' // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
  }
}

Vue.prototype.file = {
  encodeImage: function(input) {
    let file = input.files[0];
    let result = new Object();
    result.status = 'ERR';
    let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (file && supportedTypes.indexOf(file.type) >= 0) {
      let reader = new FileReader();
      reader.onloadend = function(e) {
        result.chars = e.target.result;
      };
      reader.readAsDataURL(file);
      let filePath = input.value;
      result.path = filePath.substring(filePath.lastIndexOf("\\") + 1);
      result.status = 'SUCCESS';
    } else {
      result.status = 'ILLEGAL';
    }
    return result
  },
  encodeApk: function(input) {
    let file = input.files[0];
    let result = new Object();
    result.status = 'ERR';
    let reader = new FileReader();
    reader.onloadend = function(e) {
      result.chars = e.target.result;
    };
    reader.readAsDataURL(file);
    let filePath = input.value;
    result.path = filePath.substring(filePath.lastIndexOf("\\") + 1);
    result.status = 'SUCCESS';
    return result
  }
}

Vue.prototype.str = {
  isEmpty: function(str) {
    return str == '' || str == null || str == undefined ? true : false;
  }
}

Vue.prototype.token = {
  getToken: function() {
    let token = eval('(' + window.localStorage.getItem('huizhong_support_manager_token') + ')');
    if (token == null || token == undefined) {
      return null
    } else {
      let tokenCtime = new Date(token.ctime);
      let ms = new Date().getTime() - tokenCtime.getTime();
      let mm = ms / 6000;
      if (mm >= 240) {
        window.localStorage.removeItem('huizhong_support_manager_token');
        return null;
      } else {
        return token.ciphertext;
      }
    }
  },
  setToken: function(text) {
    let token = new Object();
    token.ciphertext = text;
    token.ctime = new Date();
    window.localStorage.setItem('huizhong_support_manager_token', JSON.stringify(token));
  },
  clearToken: function() {
    window.localStorage.removeItem('huizhong_support_manager_token');
  },
  isValid: function() {
    if (Vue.prototype.token.getToken() == null) {
      return false;
    } else {
      return true;
    }
  }
}

//定义路径
const routes = [{
    path: '/',
    component: login
  }, {
    path: '/software',
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
    path: '/license',
    component: license
  },
  {
    path: '/branch',
    component: branch
  },
  {
    path: '/inspector',
    component: inspector
  }
]
//创建路由对象
const router = new VueRouter({
  hashbang: false,
  history: true,
  routes
})

router.beforeEach(({
    meta,
    path
  },
  from,
  next
) => {
  if (path == '/') {
    Vue.prototype.token.clearToken();
    next();
  } else {
    var isLogin = Vue.prototype.token.isValid();
    if (!isLogin && path !== '/') {
      return next({
        path: '/'
      })
    } else {
      next();
    }
  }
});
/* eslint-disable no-new */
new Vue({
  router: router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
