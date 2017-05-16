<template>
<div id="ui segment">
  <!--导航栏-->
  <div class="ui breadcrumb">
    <div class="section"><span style="color:#584B4F;"><i class="circular home icon"></i></span></div>
    <i class="right arrow icon divider"></i>
    <div class="active section"><span style="color:#584B4F;">角色管理</span></div>
  </div>
  <!--角色管理提示-->
  <div class="ui info small message">
    <div class="header">角色管理</div>
    <p>角色管理功能可以帮助您维护服务平台的软件，在该页您可以增加，停用软件。</p>
    <div class="fluid ui buttons">
      <div class="ui green right labeled icon button" @click="showNewRoleMod()"><i class="checkmark icon"></i>新增角色</div>
    </div>
  </div>
  <div class="ui icon info small message" v-show="selectedRole == null || selectedRole.roleId == null || selectedRole.roleId == ''">
    <i class="info grey icon"></i> 选择角色后可以快捷操作角色关联的软件。
  </div>
  <div class="ui basic segment" style="padding:0px;" v-show="selectedRole != null && selectedRole.roleId != null && selectedRole.roleId != ''">
    <div id="roleControllerTab" class="ui pointing secondary menu">
      <a class="item active" data-tab="debugger">调试软件</a>
      <a class="item" data-tab="updater">升级软件</a>
      <div class="right item" style="padding:8px 5px;" v-if="selectedRole.roleName != null">
        <div class="ui label">{{ selectedRole.roleName }}</div>
      </div>
    </div>
    <div class="active ui bottom tab basic segment" data-tab="debugger" style="padding:0px;margin-bottom:0px;">
      <div class="ui mini icon ignored yellow message" v-if="debuggers == null || debuggers.length == 0">
        <i class="info grey icon"></i>没有可用软件，如果您添加了软件，但在此列表中不显示，请确认软件是否启用。
      </div>
      <table class="ui small compact single line table" v-else>
        <thead>
          <tr>
            <th>软件名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in debuggers">
            <td>{{ item.note.softwareName }}</td>
            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox" @click="changeCheckBox(item)" v-model="item.selected"> <label></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="ui mini right floated pagination menu" style="margin-top:10px;">
        <a class="item">
          <i class="left arrow icon"></i>
        </a>
        <a class="item">
          <i class="icon right arrow"></i>
        </a>
      </div> -->
    </div>
    <div class="ui bottom tab basic segment" data-tab="updater" style="padding:0;margin-bottom:0px;">
      <div class="ui mini icon ignored yellow message" v-if="updaters == null || updaters.length == 0">
        <i class="info grey icon"></i>没有可用软件，如果您添加了软件，但在此列表中不显示，请确认软件是否启用。
      </div>
      <table class="ui small compact single line table" v-else>
        <thead>
          <tr>
            <th>软件名</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in updaters">
            <td>{{ item.note.softwareName }}</td>
            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox" @click="changeCheckBox(item)" v-model="item.selected"> <label></label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      debuggers: {},
      updaters: {}
    }
  },
  props: ['selectedRole'],
  watch: {
    selectedRole: function() {
      axios.get('/resource/dynamic/role/' + this.selectedRole.roleId + '/type/debugger/softwares')
        .then(response => {
          this.debuggers = this.objArrayHandler(response.data.content);
        }).catch(function(error) {
          alert(error);
        });

      axios.get('/resource/dynamic/role/' + this.selectedRole.roleId + '/type/updater/softwares')
        .then(response => {
          this.updaters = this.objArrayHandler(response.data.content);
        }).catch(function(error) {
          alert(error);
        });
    }
  },
  methods: {
    objArrayHandler(arry) {
      if (arry != null) {
        for (let i = 0; i < arry.length; i++) {
          let obj = arry[i];
          if (obj.role != null && obj.role.roleId != null) {
            obj['selected'] = true;
          } else {
            obj['selected'] = false;
          }
          arry[i] = obj;
        }
        return arry;
      }
    },
    changeCheckBox(software) {
      let bindType = software.selected ? "bind" : "unbind";
      axios.put('/resource/dynamic/role/' + this.selectedRole.roleId + '/software/' + software.softwareId + '/' + bindType)
        .then(response => {
          if (response.data.status == 'SUCCESS') {
            software.selected ? this.toast.success('绑定成功') : this.toast.success('解除绑定');
          }
        }).catch(function(error) {
          alert(error);
        });
    },
    showNewRoleMod() {
      this.$emit('showNewRoleMod');
    }
  },
  mounted: function() {
    $('#roleControllerTab .item').tab();
  }
}
</script>
