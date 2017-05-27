<template>
<!--导航菜单-->
<div class="ui top fixed inverted main menu" style="top:0px;height:50px;background-color: #424E69;">
  <div class="header item" style="color:#EEEAE1;font-size:17px;">汇 中</div>
  <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/software">软件管理</a>
  <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/user"> 用户管理</a>
  <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/role">角色管理</a>
  <div class="right menu">
    <a id="profile" class="ui dropdown item">
      <img class="ui mini avatar image" src="../../assets/imgs/user.jpg" style="height:30px;width:30px;" />
      <i class="angle down icon"></i>
      <div class="menu">
        <a class="item" @click="showLogoutMod()"><i class="power icon"></i>注销</a>
  </div>
  </a>
  <a id="apply" class="item" style="height:50px;" href="#/inspector" :class="(waitingCount.licenceCount + waitingCount.passCount) > 0 ? 'red' : null">
      <i class="mail icon" style="top:0px;bottom:0px;" :style="(waitingCount.licenceCount + waitingCount.passCount) > 0 ? {color: '#FFFFFF'} : null"></i>
      <span v-if="(waitingCount.licenceCount + waitingCount.passCount) > 0">{{waitingCount.licenceCount + waitingCount.passCount}}</span>
    </a>
</div>
<div id="logoutMod" class="ui small modal">
  <div class="header">注销</div>
  <div class="content">
    <p>注销账户并退出系统？</p>
  </div>
  <div class="actions">
    <div class="ui red cancel button">取消 </div>
    <div class="ui green right labeled icon button" @click="logout()"><i class="power right icon"></i>注销</div>
  </div>
</div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      waitingCount: {}
    }
  },
  methods: {
    fillInspectCount() {
      axios.get('/resource/dynamic/waiting/count').then(response => {
        this.waitingCount = response.data.content;
        // 向父控件传出总数的结果。父控件可接收也可不接收。
        this.$emit('setWaitingCount', this.waitingCount);
      }).catch(function(error) {
        this.toast.error('无法连接服务器');
      });
    },
    setWaitingCount(waitingCount) {
      this.waitingCount = waitingCount;
    },
    showLogoutMod() {
      $('#logoutMod').modal('show');
    },
    logout() {
      this.token.clearToken();
      this.$router.push({
        path: '/'
      });
    }
  },
  created: function() {
    this.fillInspectCount();
  },
  mounted: function() {
    $('#logoutMod').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
  }
}
</script>
