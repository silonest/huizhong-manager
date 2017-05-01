<template>
<div style="display:-webkit-flex;display:flex;flex-flow:column nowrap;min-height:100%;">
  <div style="flex:none;height:50px;"></div>
  <div style="flex:1 1 auto;">
    <div class="ui container" style="margin-top:20px;">
      <div id="inspectorTab" class="ui top attached tabular menu">
        <a class="item active" data-tab="user">用户申请 <div class="floating ui red label">1</div></a>
        <a class="item" data-tab="login">登录申请 <div class="floating ui teal label">2</div></a>
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
                <template v-if="item.userIntroduction != null">我的个人简介是"{{ item.userIntroduction }}"，</template>我想加入你们。
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
                  <a @click="userApprove(item.pass.passId,index)"><i class="check green outline icon"></i></a>
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
              <div class="icon header" style="font-size:13px;"><i class="lock icon"></i>密码</div>
              <div class="meta">在 {{ item.licenceCtime }} 提交申请</div>

              <div class="description">

              </div>
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
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: null,
      licences: null
    }
  },
  methods: {
    fillWaitingUsers() {
      axios.get('/resource/dynamic/manager/waiting/users')
        .then(response => {
          this.users = response.data.content;
        })
        .catch(function(error) {
          alert(response);
        });
    },
    fillWaitingLicence(){
      axios.get('/resource/dynamic/waiting/licences')
        .then(response => {
          this.licences = response.data.content;
        })
        .catch(function(error) {
          alert(response);
        });
    },
    userApprove(passId, index) {
      axios.put('/resource/dynamic/pass/' + passId + '/inspect/approve')
        .then(response => {
          this.toast.success('审核结果已更改');
          this.users.splice(index, 1);
        })
        .catch(function(error) {
          alert(response);
        });
    },
    userDecline(passId, index) {
      axios.put('/resource/dynamic/pass/' + passId + '/inspect/decline',
          this.$refs['user-reason-' + passId][0].value
        )
        .then(response => {
          this.toast.success('审核结果已更改');
          this.users.splice(index, 1);
        })
        .catch(function(error) {
          alert(response);
        });
    },
    licenceApprove(){

    },
    licenceDecline(){

    }
  },
  mounted: function() {
    this.fillWaitingUsers();
    this.fillWaitingLicence();
    $('#inspectorTab .item').tab();
  }
}
</script>
