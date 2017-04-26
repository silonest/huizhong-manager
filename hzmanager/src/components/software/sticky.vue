<template>
<div id="ui segment">
  <!--软件操作-->
  <div class="ui yellow message">
    <div class="header">软件管理</div>
    <p>软件管理功能可以帮助您维护服务平台的软件，在该页您可以增加，停用软件。</p>
    <div class="3 fluid ui buttons">
      <div class="ui button" @click="showUser()">用户管理</div>
      <div class="ui button" @click="showRole()">角色管理</div>
      <div class="ui button" v-on:click="showNewSoftwareForm()">新增</div>
    </div>
  </div>
  <div class="ui icon ignored info message" v-show="convenient == ''">
    <i class="info grey icon"></i> 选择软件后可以快捷操作软件版本和关联角色。
  </div>
  <div v-show="convenient == 'active'">
    <div class="ui secondary pointing menu">
      <a class="active item" data-tab="version">最近版本</a>
      <a class="item" data-tab="role">关联角色</a>
    </div>
    <div class="ui bottom attached active tab segment" data-tab="version" style="height:305px;">
      <!--软件分支操组件-->
      <div class="ui grid" style="height:50px;">
        <div class="left floated left aligned ten wide column" style="padding:18px 0px 15px 20px;">
          <h4>软件共 <a id="allVersion" class="ui mini circular label" @click="showAllVersion()">{{versionTotalCount}}</a> 个版本</h4>
          <div id="versionPopup" class="ui popup" style="padding: 5px 10px;">查看所有</div>
        </div>
        <div class="right floated right aligned six wide column" style="padding:12px 15px 10px 5px;">
          <div class="ui mini labeled icon button" v-on:click="showNewVersionForm()"><i class="add icon"></i>新增</div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="ui very relaxed divided list">
        <div class="item" v-for="item in latestVersion" style="padding:6px 0px;">
          <div class="right floated content">
            <div class="ui mini icon buttons">
              <button class="ui button"><i class="check icon"></i></button>
              <button class="ui button"><i class="download icon"></i></button>
            </div>
          </div>
          <img class="ui middle aligned avatar image" :src="'http://127.0.0.1:7000/static/' + software.softwareImg">
          <div class="content">
            <a class="header">{{item.branchVersion}}@{{item.note.branchName}}</a>
            <div class="description">{{item.note.branchNote|substr(15)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui bottom attached tab segment" data-tab="role" style="height:350px;">
      <div ui divided items>
        <div class="item">
        </div>
      </div>
    </div>
  </div>
  <version-modal :software="software"></version-modal>
</div>
</template>
<script>
import axios from 'axios'
import {
  stickyBus
} from './stickyBus.js';
import versionModal from './versionModal.vue'

export default {
  data() {
    return {
      convenient: '',
      versionTotalCount: 0,
      latestVersion: [],
      software: [],
    }
  },
  components: {
    'version-modal': versionModal,
  },
  methods: {
    showNewSoftwareForm() {
      $('#newSoftwareModal').modal('show');
    },
    showNewVersionForm() {
      $('.version.ui.modal').modal('show');
    },
    showUser() {
      this.$router.push({
        path: '/user'
      });
    },
    showRole() {
      this.$router.push({
        path: '/role'
      });
    },
    showAllVersion() {
      this.$router.push({
        path: '/branch',
        query: {
          sid: 1
        }
      });
    }
  },
  mounted: function() {
    $('#allVersion').popup({
      popup: $('#versionPopup'),
      position: 'bottom left',
      preserve: true,
      transition: 'slide down',
      delay: {
        show: 500
      },
      on: 'hover'
    });

    $('.menu .item').tab();

    stickyBus.$on('showVersion', (software) => {
      axios.get('/resource/dynamic/software/' + software.softwareId + '/latest/version')
        .then(response => {
          this.convenient = 'active';
          this.software = software;
          this.versionTotalCount = response.data.content.totalCount;
          this.latestVersion = response.data.content.branchs;
        })
        .catch(function(error) {
          alert(error);
        });
    });
  }
}
</script>
