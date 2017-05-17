<template>
<div id="editUserModal" class="edituser ui modal">
  <div class="header">修改用户</div>
  <div class="content">
    <div class="edituser ui small form">
      <div class="four fields">
        <div class="four wide required field">
          <label>手机号</label>
          <div class="ui disabled input">
            <input type="text" :value="user.userAccount" />
          </div>
        </div>
        <div class="four wide required field">
          <label>用户姓名</label>
          <input type="text" :value="user.userName" ref="userName" />
        </div>
        <div class="four wide required field">
          <label>密码</label>
          <input type="password" :value="user.userPassword" ref="userPassword" />
        </div>
        <div class="four wide required field">
          <label>用户角色</label>
          <select class="role ui dropdown" ref="roleId">
            <option :value="item.roleId" v-for="item in roles">{{item.roleName}}</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>电子邮箱</label>
        <input type="text" :value="user.userEmail" placeholder="用户的电子邮件将用于找回密码..." ref="userEmail" />
      </div>
      <div class="required field">
        <label>用户简介</label>
        <textarea :value="user.userIntroduction" placeholder="用户简介将有利于您了解用户..." ref="userIntroduction" />
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui red cancel button">取消 </div>
    <div class="ui green right labeled icon button" @click="submit()"><i class="checkmark right icon"></i>修改</div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      roles: {}
    }
  },
  props: ["user"],
  watch: {
    user: function() {
      $('.role.ui.dropdown').dropdown('set selected', this.user.role.roleId);
    }
  },
  methods: {
    show() {
      $('#editUserModal').modal('show');
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
      var role = new Object();
      role.roleId = this.$refs.roleId.value;
      let password = null;
      if (this.$refs.userPassword.value != this.user.userPassword) {
        password = $.md5(this.$refs.userPassword.value);
      }
      axios.put('/resource/dynamic/manager/user', {
        userId: this.user.userId,
        userName: this.$refs.userName.value,
        userPassword: password,
        userEmail: this.$refs.userEmail.value,
        userIntroduction: this.$refs.userIntroduction.value,
        role: role
      }).then(response => {
        $('#editUserModal').modal('hide');
        this.toast.success('修改成功');
        this.$emit('refreshUsers');
      }).catch(function(error) {
        alert(error);
      });
    }
  },
  mounted: function() {
    this.fillRoleSelect();
    $('#editUserModal').modal({
      context: '#app',
      autofocus: false,
      blurring: true,
      closable: false
    });
  }
}
</script>
