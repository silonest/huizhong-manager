<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;">
    <div class="ui container" style="margin-top:20px;">
      <div id="inspectorTab" class="ui top attached tabular menu">
        <a class="item active" data-tab="user">用户申请 <div class="floating ui red label" v-show="waitingCount.passCount > 0">{{waitingCount.passCount}}</div></a>
        <a class="item" data-tab="login">密钥申请 <div class="floating ui red label" v-show="waitingCount.licenceCount > 0">{{waitingCount.licenceCount}}</div></a>
        <div class="right menu">
          <div class="item">
            <div class="ui large transparent icon input">
              <input type="text" placeholder="查找用户...">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="active ui bottom attached tab segment" data-tab="user" style="margin-bottom:0px;">
        <div class="ui cards">
          <div class="red card" v-for="(item,index) in users">
            <div class="content">
              <div class="right floated meta">
                <a class="ui red empty circular label"></a>
              </div>
              <div class="icon header" style="font-size:13px;"><i class="user icon"></i>用户</div>
              <div class="meta">在 {{ item.pass.passCtime }} 提交申请</div>
              <div class="description">我是"{{ item.userName }}"，我的介绍人是"{{ item.pass.passUserReference }}"，
                <template v-if="item.userIntroduction != null">我的个人简介是"{{ item.userIntroduction }}"，
</template>我想加入你们。
              </div>
            </div>
            <div class="extra content">
              <div class="ui mini horizontal divided list">
                <div class="item">
                  <div class="ui transparent icon input">
                    <input type="text" placeholder="拒绝理由..." :ref="'user-reason-'+item.pass.passId">
                    <a @click="userDecline(item.pass.passId,index)"><i class="remove red outline icon"></i></a>
                  </div>
                </div>
                <div class="item">
                  <a @click="showBindRoleToUser(item.pass.passId,index)"><i class="check green outline icon"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui bottom attached tab segment" data-tab="login">
        <div class="ui cards">
          <div class="ui red card" v-for="(item,index) in licences">
            <div class="content">
              <div class="right floated meta">
                <a class="ui red empty circular label"></a>
              </div>
              <div class="icon header" style="font-size:13px;"><i class="lock icon"></i>密钥</div>
              <div class="meta">在 {{ item.licenceCtime }} 提交申请</div>
              <div class="description">我是"{{ item.user.userName }}"，我想使用"{{ item.software.note.softwareName }}"，我的理由是"{{ item.licenceReason }}"</div>
            </div>
            <div class="extra content">
              <div class="ui mini horizontal divided list">
                <div class="item">
                  <div class="ui transparent icon input">
                    <input type="text" placeholder="拒绝理由..." style="width:100px;" :ref="'licence-reason-' + item.licenceId">
                    <a @click="licenceDecline(item.licenceId,index)"><i class="remove red outline icon"></i></a>
                  </div>
                </div>
                <div class="item">
                  <div class="ui transparent right icon input">
                    <input type="text" placeholder="永久有效" style="width:100px;" :ref="'licence-period-' + item.licenceId">
                    <a @click="licenceApprove(item.licenceId,index)"><i class="check green outline icon"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="inspectModal" class="ui small modal">
    <div class="header">绑定角色 </div>
    <div class="content">
      <div id="editUserRoleForm" class="ui small form">
      <div class="four wide required field">
        <label>用户角色</label>
        <select class="role ui dropdown" ref="userRole">
          <option :value="item.roleId" v-for="item in roles">{{item.roleName}}</option>
        </select>
      </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui negative button" @click="drop()">放弃 </div>
      <div class="ui green right labeled icon button" @click="userApprove()"><i class="checkmark right icon"></i>通过</div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import bus from './eventBus.js';
export default {
  data() {
    return {
      roles: {},
      userApproveBuffer: {},
      users: null,
      licences: null,
      waitingCount: {}
    }
  },
  methods: {
    fillWaitingUsers() {
      axios.get('/resource/dynamic/manager/waiting/users')
        .then(response => {
          this.users = response.data.content;
        })
        .catch(function(error) {
          alert(error);
        });
    },
    fillWaitingLicence() {
      axios.get('/resource/dynamic/waiting/licences')
        .then(response => {
          this.licences = response.data.content;
        })
        .catch(function(error) {
          alert(error);
        });
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
    showBindRoleToUser(passId, index) {
      this.userApproveBuffer.passId = passId;
      this.userApproveBuffer.index = index;
      $('#inspectModal').modal('show');
    },
    userApprove() {
      axios.put('/resource/dynamic/pass/' + this.userApproveBuffer.passId + '/inspect/approve', {
        roleId: this.$refs.userRole.value
      }).then(response => {
        this.users.splice(this.userApproveBuffer.index, 1);
        this.waitingCount.passCount--;
        $('#inspectModal').modal('hide');
        this.toast.success('审核成功');
      }).catch(function(error) {
        alert(error);
      });
    },
    userDecline(passId, index) {
      let inspectReason = this.$refs['user-reason-' + passId][0].value;
      if (inspectReason == null || inspectReason == undefined || inspectReason == '') {
        this.$refs['user-reason-' + passId][0].focus();
      } else {
        axios.put('/resource/dynamic/pass/' + passId + '/inspect/decline', {
          inspectReason: inspectReason
        }).then(response => {
          this.toast.success('已拒绝申请');
          this.users.splice(index, 1);
          this.$refs['user-reason-' + passId][0].value = '';
          this.waitingCount.passCount--;
        }).catch(function(error) {
          alert(error);
        });
      }
    },
    licenceApprove(licenceId, index) {
      let period = this.$refs['licence-period-' + licenceId][0].value;
      axios.put('/resource/dynamic/licence/' + licenceId + '/inspect/approve', {
          period: period == null || period == undefined || period == '' ? 0 : period
        })
        .then(response => {
          this.toast.success('已同意申请');
          this.licences.splice(index, 1);
          this.waitingCount.licenceCount--;
        }).catch(function(error) {
          alert(error);
        });
    },
    licenceDecline(licenceId, index) {
      let inspectReason = this.$refs['licence-reason-' + licenceId][0].value;
      if (inspectReason == null || inspectReason == undefined || inspectReason == '') {
        this.$refs['licence-reason-' + licenceId][0].focus();
      } else {
        axios.put('/resource/dynamic/licence/' + licenceId + '/inspect/decline', {
            inspectReason: inspectReason
          })
          .then(response => {
            this.toast.success('已拒绝申请');
            this.licences.splice(index, 1);
            this.$refs['licence-reason-' + licenceId][0].value = '';
            this.waitingCount.licenceCount--;
          }).catch(function(error) {
            alert(error);
          });
      }
    },
    drop() {
      $('#inspectModal').modal('hide');
    }
  },
  mounted: function() {
    $('#inspectModal').modal({
      context: '#app',
      blurring: true,
      allowMultiple: false,
      autofocus: false,
      onHidden(){
        $('#editUserRoleForm').form('clear');
      }
    });
    $('#editUserRoleForm').form();
    this.fillWaitingUsers();
    this.fillWaitingLicence();
    this.fillRoleSelect();
    $('#inspectorTab .item').tab();
    this.waitingCount = bus.getWaitingCount();
    $('.ui.dropdown').dropdown({
      transition: 'slide down'
    });
  }
}
</script>
