<template>
<div id="newRoleModal" class="ui small modal">
  <div class="header">新增角色</div>
  <div class="content">
    <div id="newRoleForm" class="ui small form">
      <div class="two fields">
        <div class="six wide required field">
          <label>角色名</label>
          <input name="roleName" type="text" placeholder="请输入角色名..." ref="roleName" />
        </div>
        <div class="six wide required field">
          <label>角色简介</label>
          <input name="roleIntroduction" type="text" placeholder="请输入角色简介..." ref="roleIntroduction" />
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui negative button">放弃 </div>
    <div class="ui green right labeled icon button" @click="submit()"><i class="checkmark right icon"></i>新增角色</div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
    }
  },
  methods: {
    show() {
      $('#newRoleModal').modal('show');
    },
    hide(){
      $('#newRoleModal').modal('hide');
      $('#newRoleForm').form('clear');
    },
    submit(){
      axios.post('/resource/dynamic/role', {
          roleName: this.$refs.roleName.value,
          roleIntroduction: this.$refs.roleIntroduction.value
        }).then(function(response) {
          this.hide();
          this.$emit('refreshRoles');
          this.toast.success('新增成功');
        }.bind(this)).catch(function(error) {
          this.toast.error('无法连接服务器');
        });
    }
  },
  mounted: function() {
    $('#newRoleModal').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
  }
}
</script>
