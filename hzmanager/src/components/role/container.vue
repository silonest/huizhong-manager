<template>
<div class="ui basic segment">
  <h4 class="ui horizontal header divider">所有角色</h4>
  <table class="ui yellow striped table" <div class="ui grid">
    <div class="four wide column">
      <div class="ui link cards">
        <div class="ui card" v-for="item in roles" v-if="item.roleLevel == 1">
          <div class="content" v-on:click="choseRole(item)">
            <i class="left floated ui pin icon"></i>
            <div class="header">{{item.roleName}}</div>
            <div class="description">{{item.roleIntroduction}}</div>
          </div>
          <div class="extra content">
            <a v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item.roleId,'used')"><i class="play icon" data-content="启用"></i></a>
            <a v-else @click="changeRoleStatus(item.roleId,'unused')"><i class="pause icon" data-content="停用"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="twelve wide column">
      <div class="ui cards">
        <div class="ui card" v-for="item in roles" v-if="item.roleLevel == 2">
          <div class="content" v-on:click="choseRole(item)">
            <div class="header">{{item.roleName}}</div>
            <div class="description">{{item.roleIntroduction}}</div>
          </div>
          <div class="extra content">
            <a v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item.roleId,'used')"><i class="play icon" data-content="启用"></i></a>
            <a v-else @click="changeRoleStatus(item.roleId,'unused')"><i class="pause icon" data-content="停用"></i></a>
            <a @click="changeRoleStatus(item.roleId,'disable')"><i class="remove icon" data-content="删除"></i></a>
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
        })
        .catch(function(error) {
          alert(error);
        });
    },
    changeRoleStatus: function(roleId, status) {
      alert('/resource/dynamic/role/' + roleId + '/used/' + status);
      axios.put('/resource/dynamic/role/' + roleId + '/used/' + status)
        .then(response => {
          this.toast.success(status == 0 ? '已停用' : status == 1 ? '已启用' : '操作成功');
        })
        .catch(function(error) {
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
