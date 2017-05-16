<template>
<div class="ui basic segment">
  <!-- <h4 class="ui horizontal header divider"><i class="lock icon"></i>所有角色</h4> -->
  <div class="ui grid">
    <div class="eight wide column">
      <h5 class="ui header">
        <i class="lock icon"></i>
        <div class="content">
          内置角色
          <div class="sub header">内置角色不能删除。</div>
        </div>
      </h5>
      <div class="ui segment">
        <div class="ui large very relaxed middle aligned animated divided list">
          <div class="item" v-if="fixedRoles.length > 0" v-for="(item,index) in fixedRoles" @click="choseRole(item)">
            <div class="right floated aligned content">
              <div class="ui label button" v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item,'used',index)"><i class="play icon" data-content="启用"></i>启用</div>
              <div class="ui label button" v-else @click="changeRoleStatus(item,'unused',index)"><i class="pause icon" data-content="停用"></i>停用</div>
            </div>
            <img class="ui avatar image" style="width:60px;height:60px;" src="../../assets/imgs/role.svg">
            <div class="content">
              <div class="header">{{item.roleName}}</div>
              <div class="meta"><span>内置</span></div>
              <div class="description">
                <p>{{item.roleIntroduction}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="eight wide column">
      <h5 class="ui header">
        <i class="unlock icon"></i>
        <div class="content">
          自定义角色
          <div class="sub header">管理员只能添加属于用户类别的自定义角色，增加后可以删除可以删除。</div>
        </div>
      </h5>
      <div class="ui segment">
        <div class="ui large very relaxed middle aligned animated divided list" v-if="variableRoles.length > 0">
          <div class="item" v-for="(item,index) in variableRoles" @click="choseRole(item)">
            <div class="right floated middle aligned content">
              <div class="ui label button" v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item,'used',index)"><i class="play icon" data-content="启用"></i>启用</div>
              <div class="ui label button" v-else @click="changeRoleStatus(item,'unused',index)"><i class="pause icon" data-content="停用"></i>停用</div>
              <div class="ui label button" @click="changeRoleStatus(item,'disable',index)"><i class="remove icon" data-content="删除"></i>删除</div>
            </div>
            <img class="ui avatar image" style="width:60px;height:60px;" src="../../assets/imgs/role.svg">
            <div class="content">
              <div class="header">{{item.roleName}}</div>
              <div class="meta"><span>自定义</span></div>
              <div class="description">
                <p>{{item.roleIntroduction}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ui disabled center aligned basic segment" v-else>
          <h3>还没有自定义角色</h3>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="ui six link cards">
    <div class="ui card" v-for="(item,index) in roles" :class="{blue:item.roleLevel == 1}">
      <div class="content" style="padding: 10px 10px;" v-on:click="choseRole(item)">
        <i class="right floated ui pin icon" v-if="item.roleLevel == 1"></i> -->
  <!-- <div class="right floated meta">
          <a class="ui blue empty circular label"></a>
        </div> -->
  <!-- <div class="header">{{item.roleName}}</div>
        <div class="description">{{item.roleIntroduction}}</div>
      </div>
      <div class="extra content" style="background:#F6F8FA;">
        <a v-if="item.roleUseFlag == 0" @click="changeRoleStatus(item,'used',index)"><i class="play icon" data-content="启用"></i></a>
        <a v-else @click="changeRoleStatus(item,'unused',index)"><i class="pause icon" data-content="停用"></i></a>
        <a v-if="item.roleLevel == 2" @click="changeRoleStatus(item,'disable',index)"><i class="remove icon" data-content="删除"></i></a>
      </div>
    </div>
  </div> -->
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      fixedRoles: [],
      variableRoles: []
    }
  },
  methods: {
    fillRoles: function() {
      axios.get('/resource/dynamic/roles')
        .then(response => {
          let roles = response.data.content;
          for(let index = 0;index < roles.length;index++){
            if(roles[index].roleLevel == 1){
              this.fixedRoles.push(roles[index]);
            }else{
              this.variabledRoles.push(roles[index]);
            }
          }
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
