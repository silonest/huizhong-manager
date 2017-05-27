<template>
<div class="full compact">
  <app-header></app-header>
  <div class="ui basic segment" style="box-sizing: border-box ; position: relative;left:0px;margin:0px;padding:0px;height:100%;width:100%;">
    <div class="ui basic segment" style="height:79px;width:100%;padding:0px;margin:0px;">
      <div class="ui breadcrumb" style="margin-top:65px;margin-left:10px;">
        <a class="section" href="#/user"><span style="color:#24292e;"><i class="circular arrow left icon"></i></span></a>
      </div>
    </div>
  </div>
  <div class="ui basic segment" style="position:absolute;top:100px;bottom:0px;width:100%;margin: 0px 10px 0px 0px;padding:15px;">
    <table class="ui yellow compact celled table">
      <thead>
        <tr>
          <th>用户</th>
          <th>账号</th>
          <th>角色</th>
          <th>软件名</th>
          <th>PIN</th>
          <th>申请理由</th>
          <th>申请时间</th>
          <th>结果</th>
          <th>时长/台数</th>
          <th>审核时间</th>
          <th>密钥</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in licenses">
          <td>{{item.user.userName}}</td>
          <td>{{item.user.userAccount}}</td>
          <td>{{item.user.role.roleName}}</td>
          <td>{{item.software.note.softwareName}}</td>
          <td>{{item.licencePin}}</td>
          <td>{{item.licenceReason}}</td>
          <td>{{item.licenceCtime}}</td>
          <td :class="item.licenceInspectFlag == 0 ? 'warning' : item.licenceInspectFlag == 1 ? 'positive' : 'negative'">
            {{item.licenceInspectFlag | inspectFlagStr}}
          </td>
          <td v-if="item.licenceInspectFlag > 0">{{item.software.softwareType == 0 ? '使用时长：'+(item.licencePeriod == 0 ? '∞' : item.licencePeriod)+'小时' : '升级台数：'+(item.licenceUseNumber == 0 ? '∞' : item.licenceUseNumber)+'台'}}</td>
          <td v-else>N/A</td>
          <td>{{(item.licenceItime == null || item.licenceItime == '') ? 'N/A' : item.licenceItime}}</td>
          <td>{{(item.licenceStr == null || item.licenceStr == '') ? 'N/A' : item.licenceStr}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import header from '../header/main.vue';

export default {
  data() {
    return {
      licenses: []
    }
  },
  components: {
    'app-header': header
  },
  methods: {
    fillTable() {
      axios.get('/resource/dynamic/user/' + this.$route.query.uid + '/all/licences').then(response => {
        this.licenses = response.data.content;
      }).catch(function(error) {
        this.toast.error('无法连接服务器');
      });
    }
  },
  mounted: function() {
    this.fillTable();
  }
}
</script>
