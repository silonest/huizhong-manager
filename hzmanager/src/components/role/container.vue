<template>
<div class="ui basic segment">
  <h4 class="ui horizontal header divider">所有角色</h4>
  <table class="ui yellow striped table" <div class="ui grid">
    <div class="four wide column">
      <div class="ui link cards">
        <div class="ui card" v-for="(item,index) in roles" v-if="item.roleLevel == 1">
          <div class="content" v-on:click="choseRole(item)">
            <i class="left floated ui pin icon"></i>
            <div class="header">{{item.roleName}}</div>
            <div class="description">{{item.roleIntroduction}}</div>
          </div>
          <div class="extra content">
            <a v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item,'used',index)"><i class="play icon" data-content="启用"></i></a>
            <a v-else @click="changeRoleStatus(item,'unused',index)"><i class="pause icon" data-content="停用"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="twelve wide column" style="border-left:1px solid #DDDEDE;">
      <div class="ui cards">
        <div class="ui card" v-for="(item,index) in roles" v-if="item.roleLevel == 2">
          <div class="content" v-on:click="choseRole(item)">
            <div class="header">{{item.roleName}}</div>
            <div class="description">{{item.roleIntroduction}}</div>
          </div>
          <div class="extra content">
            <a v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item,'used',index)"><i class="play icon" data-content="启用"></i></a>
            <a v-else @click="changeRoleStatus(item,'unused',index)"><i class="pause icon" data-content="停用"></i></a>
            <a @click="changeRoleStatus(item,'disable',index)"><i class="remove icon" data-content="删除"></i></a>
          </div>
        </div>
      </div>
    </div>
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
    fillRoles: function() {
      axios.get('/resource/dynamic/roles')
        .then(response => {
          this.roles = response.data.content;
        }).catch(function(error) {
          alert(error);
        });
    },
    refresh: function() {
      this.fillRoles();
    },
    changeRoleStatus: function(role, status, index) {
      axios.put('/resource/dynamic/role/' + role.roleId + '/used/' + status)
        .then(response => {
          if (status == 'used') {
            role.roleUseFlag = 1;
            this.toast.success('已启用');
          } else if (status == 'unused') {
            role.roleUseFlag = 0;
            this.toast.success('已停用');
          } else if (status == 'disable') {
            this.roles.splice(index, 1);
            this.toast.success('已删除');
          } else {
            this.toast.error('不能执行操作');
          }
        }).catch(function(error) {
          alert(error);
        });
    },
    choseRole(role) {
      this.$emit('selectRole', role);
    }
  },
  mounted: function() {
    this.fillRoles();
  }
}
</script>
