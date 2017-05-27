<template>
<div style="height:100%;">
  <div class="index-main">
    <div class="index-main-body">
      <div class="index-header">
        <h1 class="logo hide-text">汇中</h1>
        <h2 class="subtitle">《汇中支持中心》管理平台&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;登录</h2>
      </div>
      <form class="ui form">
        <div class="ui basic segment">
          <div class="field"><input placeholder="账号" type="text" ref="account" /></div>
          <div class="field"><input placeholder="密码" type="password" ref="password" /></div>
          <div class="ui green right labeled icon fluid button" @click="login()"><i class="sign in icon"></i>登录</div>
        </div>
      </form>
    </div>
  </div>
  <div class="footer">
    <span>© 2017 汇中仪表股份有限公司</span>
    <span class="dot">·</span>
    <a target="_blank" href="http://www.huizhong.co/">官网</a>
    <span class="dot">·</span>
    <a target="_blank" href="http://software.huizhong.co/center/">下载中心</a>
    <span class="dot">·</span>
    <a target="_blank" href="http://software.huizhong.co/manual/en.html">下载中心使用说明（英文）</a>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {}
  },
  methods: {
    login() {
      let account = this.$refs.account.value;
      let password = this.$refs.password.value;
      if (this.str.isEmpty(account) || this.str.isEmpty(password)) {
        this.toast.error("账号或密码为空");
      } else {
        let password_md5 = $.md5(password);
        axios.post('/resource/dynamic/manager/token', {
          'adminAccount': account,
          'adminPassword': password_md5
        }).then(response => {
          let status = response.data.status;
          if (status == 'SUCCESS') {
            this.token.setToken(response.data.content);
            this.$router.push({
              path: '/software'
            });
          } else {
            this.toast.error(response.data.message.notice);
          }
        }).catch(function(error) {
          this.toast.error('无法连接服务器');
        });
      }
    }
  },
  mounted: function() {
    document.onkeyup = function(e) { //按键信息对象以函数参数的形式传递进来了，就是那个e
      var code = e.charCode || e.keyCode; //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)
      if (code == 13) {
        //此处编写用户敲回车后的代码
        this.login();
      }
    }.bind(this);
  }
}
</script>
<style>
/*.index-main .ui.button {
  background: #21BA45 none;
  color: #FFFFFF;
}

.index-main .ui.button:hover {
  background-color: #178C32;
  background-image: none;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, .15) inset;
  color: #FFFFFF;
}*/
</style>
