<template>
<div class="newuser ui modal">
  <i class="close icon"></i>
  <h4 class="ui header">
      <i class="settings icon"></i>
      <div class="content">新增用户
        <div class="sub header">新增一个系统用户</div>
      </div>
    </h4>
  <div class="content">
    <div id="newUserForm" class="ui small form">
      <div class="four fields">
        <div class="four wide required field">
          <label>手机号</label>
          <input name="phoneNum" type="text" placeholder="请输入用户手机号" ref="phoneNum" />
        </div>
        <div class="four wide required field">
          <label>用户姓名</label>
          <input name="userName" type="text" placeholder="请输入用户姓名" ref="userName" />
        </div>
        <div class="four wide required field">
          <label>用户密码</label>
          <input name="password" type="text" placeholder="请输入用户密码" ref="password" />
        </div>
        <div class="four wide required field">
          <label>用户角色</label>
          <select class="role ui dropdown" ref="userRole">
            <option :value="item.roleId" v-for="item in roles">{{item.roleName}}</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>电子邮箱</label>
        <input name="email" type="text" placeholder="请输入电子邮箱地址" ref="email" />
      </div>
      <div class="required field">
        <label>用户简介</label>
        <textarea name="userProfile" placeholder="请输入用户简介" ref="userProfile" />
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui green right labeled icon button" @click="submit()"><i class="checkmark right icon"></i>新增用户</div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      roles: {}
    }
  },
  methods: {
    show() {
      $('.newuser.ui.modal').modal('show');
    },
    fillRoleSelect() {
      //给角色选择下拉菜单填充用户
      axios.get('/resource/dynamic/roles')
        .then(response => {
          this.roles = response.data.content;
        }).catch(function(error) {
          alert(error);
        });
    },
    submit() {
      if ($('#newUserForm').form('validate form')) {
        let requestParam = new Object();
        requestParam.userAccount = this.$refs.phoneNum.value;
        requestParam.userPhoneNum = this.$refs.phoneNum.value;
        requestParam.userName = this.$refs.userName.value;
        requestParam.userPassword = this.$refs.password.value;
        let role = new Object();
        role.roleId = this.$refs.userRole.value;
        requestParam.role = role;
        requestParam.userEmail = this.$refs.email.value;
        requestParam.userIntroduction = this.$refs.userProfile.value;
        axios.post('/resource/dynamic/manager/user', requestParam).then(function(response) {
          $('.newuser.ui.modal').modal('hide');
          $('#newUserForm').form('clear');
          this.$emit('refreshUsers');
          if (response.data.status == 'SUCCESS') {
            this.toast.success('添加成功');
          } else {
            this.toast.error(response.data.message);
          }
        });
      }
    }
  },
  mounted: function() {
    this.fillRoleSelect();
    $('.newuser.ui.modal').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
    $('#newUserForm').form({
      fields: {
        phoneNum: {
          rules: [{
            type: 'empty'
          }]
        },
        userName: {
          rules: [{
            type: 'empty'
          }]
        },
        password: {
          rules: [{
            type: 'empty'
          }]
        },
        userRole: {
          rules: [{
            type: 'empty'
          }]
        },
        userProfile: {
          rules: [{
            type: 'empty'
          }]
        }
      }
    });
  }
}
</script>
