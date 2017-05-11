<template>
<div class="ui basic segment">
  <h4 class="ui horizontal header divider"><i class="user icon"></i>所有用户</h4>
  <table class="ui yellow striped table" style="width:100%;height:auto;">
    <thead class="full-width">
      <tr>
        <th class="center aligned">状态</th>
        <th>手机号</th>
        <th>姓名</th>
        <th>邮箱</th>
        <th>角色</th>
        <th>创建时间</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in users">
        <td class="center aligned">
          <div class="ui empty circular label" :class="item.userUseFlag == 0 ? 'red' : item.userUseFlag == 1 ? 'green' : 'orange'"></div>
        </td>
        <td>{{item.userAccount}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.userEmail}}</td>
        <td>
          <div class="ui horizontal list">
            <div class="item">
              <i class="unlock icon"></i>
              <div class="content">
                <div class="header">{{item.role.roleName}}</div>{{item.role.roleIntroduction}}</div>
            </div>
          </div>
        </td>
        <td>{{item.userCtime}}</td>
        <td class="left aligned" style="padding:0px 5px;">
          <!-- <button class="ui small button"><i class="edit icon"></i></button> -->
          <!-- <div class="ui vertical animated mini button" tabindex="0" @click="resetUserPwd(item.userId)">
            <div class="visible content">重置密码</div>
            <div class="hidden content">设为“0”？</div>
          </div> -->
          <button class="ui small label button" v-if="item.userUseFlag == 0" @click="changeUserUsedStatus(item,'used')"><i class="play icon"></i>启用</button>
          <button class="ui small label button" v-else @click="changeUserUsedStatus(item,'unused')"><i class="pause icon"></i>停用</button>
          <button class="ui small label button" @click="editUser(item)"><i class="edit icon"></i>编辑</button>
          <button class="ui small label button" @click="showDeleteUserMod(item,index)"><i class="remove icon"></i>删除</button>
          <!--
          <button class="ui button"><i class="remove icon"></i></button> -->
        </td>
      </tr>
    </tbody>
  </table>

  <div id="deleteUserMod" class="ui basic coupled modal">
    <div class="ui icon header"><i class="remove icon"></i> 删除该用户？ </div>
    <div class="content">
      <p>你是要删除"{{deleteUserTemp.user.userName}}"吗，执行删除操作，用户将不能下载软件，也不能申请密钥，但已经申请过的密钥还能使用。</p>
    </div>
    <div class="actions">
      <div class="ui green basic cancel inverted button"><i class="remove icon"></i> 再想想 </div>
      <div class="ui red ok inverted button" @click="deleteUser(deleteUserTemp.user.userId,deleteUserTemp.index)"><i class="checkmark icon"></i> 删了吧 </div>
    </div>
  </div>

</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      deleteUserTemp: {
        user: {},
        index: 0
      }
    }
  },
  methods: {
    editUser(user) {
      this.$emit('showEditUserMod', user);
    },
    deleteUser(userId, index) {
      axios.put('/resource/dynamic/manager/user/' + userId + '/used/disable')
        .then(response => {
          this.users.splice(index, 1);
          this.toast.success('已删除');
        }).catch(function(error) {
          alert(error);
        });
    },
    changeUserUsedStatus(user, usedType) {
      axios.put('/resource/dynamic/manager/user/' + user.userId + '/used/' + usedType)
        .then(response => {
          if (usedType == 'used') {
            user.userUseFlag = 1;
            this.toast.success('已启用');
          } else if (usedType == 'unused') {
            user.userUseFlag = 0;
            this.toast.success('已停用');
          } else {
            this.toast.error('未执行');
          }
        }).catch(function(error) {
          alert(error);
        });
    },
    showDeleteUserMod(user, index) {
      this.deleteUserTemp.user = user;
      this.deleteUserTemp.index = index;
      $('#deleteUserMod').modal('show');
    },
    fillTable: function() {
      //给table填充用户
      axios.get('/resource/dynamic/manager/users')
        .then(response => {
          this.users = response.data.content;
        })
        .catch(function(error) {
          alert(error);
        });
    }
  },
  mounted: function() {
    $('#deleteUserMod').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
    this.fillTable();
  }
}
</script>
