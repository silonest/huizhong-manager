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
        <div class="four wide field">
          <label>用户密码</label>
          <input name="password" type="text" placeholder="请输入用户密码" ref="password" />
        </div>
        <div class="four wide required field">
          <label>用户角色</label>
          <select class="role ui dropdown" ref="userRole">
            <option value="china">中文</option>
            <option value="united kingdom">English</option>
            <option value="france">法文</option>
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
export default {
  data() {
    return {

    }
  },
  methods: {
    show() {
      $('.newuser.ui.modal').modal('show');
    }
  },
  mounted: function() {
    $('.role.ui.dropdown').dropdown('set selected', 'china');
    $('.newuser.ui.modal').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
  }
}
</script>
