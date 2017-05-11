<template>
<div id="ui segment">
  <!--导航栏-->
  <div class="ui breadcrumb">
    <div class="section"><span style="color:#584B4F;"><i class="circular home icon"></i></span></div>
    <i class="right arrow icon divider"></i>
    <div class="active section"><span style="color:#584B4F;">软件管理</span></div>
  </div>
  <!--软件提示-->
  <div class="ui info message">
    <div class="header">软件管理</div>
    <p>软件管理功能可以帮助您维护服务平台的软件和软件的版本。如果您对软件和版本的概念不是很理解，您可以查看<a href="">帮助</a></p>
    <div class="fluid ui buttons">
      <div class="ui button" @click="showNewSwMod()">新增软件</div>
    </div>
  </div>
  <!--点击软件后显示的操作区，如果不点击软件，则给出提示消息。-->

  <div class="ui basic segment" style="padding:0px;" v-show="selectedSoftware != null && selectedSoftware.softwareId != null && selectedSoftware.softwareId != ''">
    <div id="softwareControllerTab" class="ui pointing secondary menu">
      <a class="item active" data-tab="version">最近版本</a>
      <a class="item" data-tab="role">关联角色</a>
    </div>
    <!--分支的快捷操作-->
    <div class="active ui bottom attached tab segment" data-tab="version" style="height:285px;padding:10px;margin-bottom:0px;">
      <div class="ui mini icon ignored info message">
        <i class="info grey icon"></i>快捷菜单只显示当前版本。
      </div>
      <div class="ui grid" style="height:50px;">
        <div class="left floated left aligned ten wide column" style="padding:18px 0px 15px 20px;">
          <h4>共 <div class="ui mini circular label">{{branch.count}}</div> 个版本</h4>
        </div>
        <div class="right floated right aligned six wide column" style="padding:18px 15px 15px 5px;">
          <a href="javascript:return" @click="showBranchsBelongSw(selectedSoftware.softwareId)" data-content="点击查看全部" data-variation="mini inverted" data-position="right center"><i class="list layout blue outline icon"></i></a>
          <a href="javascript:return" @click="showNewVerMod()" data-content="点击添加新版本" data-variation="mini inverted" data-position="right center"><i class="add green outline icon"></i></a>
        </div>
      </div>
      <div class="ui divider" style="margin: 14px 0px 2px 0px;"></div>
      <div class="ui very relaxed divided list" style="margin-top:2px;">
        <div class="item" v-for="item in branch.item.notes" style="padding:6px 0px;">
          <div class="right floated content" style="padding:6px 1px;">
            <i class="flag" :class="item.branchLanguage | transferLanguageToFlag"></i>
            <a :href="'/resource/static/'+item.branchAddr"><i class="download blue outline icon"></i></a>
          </div>
          <img class="ui middle aligned avatar image" :src="'/resource/static/' + selectedSoftware.softwareImg">
          <div class="content">
            <div class="header">{{branch.item.branchVersion}}@{{item.branchName | substr(15)}}</div>
            <div class="description">{{item.branchNote | substr(15)}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--关联角色的快捷操作-->
    <div class="ui bottom attached tab segment" data-tab="role" style="height:305px;padding:10px;margin-bottom:0px;">
      <div class="ui grid" style="height:50px;">
        <div class="left floated left aligned ten wide column" style="padding:18px 0px 15px 20px;">
          <h4>软件共 <a class="ui mini circular label" @click="showBranchsBelongSw(selectedSoftware.softwareId)">{{branch.count}}</a> 个角色</h4>
        </div>
        <!-- <div class="right floated right aligned six wide column" style="padding:12px 15px 10px 5px;">
          <button class="ui mini icon button" @click="showNewVerMod()" style="margin:0px;"><i class="add icon"></i></button>
        </div> -->
      </div>
      <div class="ui divider" style="margin: 14px 0px 2px 0px;"></div>
      <div class="ui very relaxed divided list" style="margin-top:2px;">

        <div class="item" v-for="item in roles" style="padding:6px 0px;">
          <!-- <div class="right floated content">
            <button class="ui mini icon button" style="margin:0px;"><i class="download icon"></i></button>
          </div> -->
          <img class="ui middle aligned avatar image" :src="'/resource/static/' + selectedSoftware.softwareImg">
          <div class="content">
            <a class="header">{{item.roleName}}</a>
            <div class="description">{{item.roleIntroduction | substr(13)}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="ui icon ignored yellow message" v-show="selectedSoftware == null || selectedSoftware.softwareId == null || selectedSoftware.softwareId == ''">
    <i class="info grey icon"></i> 选择软件后可以快捷操作软件版本和关联角色。
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      branch: {
        count: 0,
        item: []
      },
      roles: {}
    }
  },
  props: ["selectedSoftware"],
  watch: {
    //给传入的软件绑定监听事件，当参数发生变化时，重新查询数据
    selectedSoftware: function() {
      this.fillRoles();
      this.fillVersions();
    }
  },
  methods: {
    fillVersions() {
      axios.get('/resource/dynamic/software/' + this.selectedSoftware.softwareId + '/latest/version')
        .then(response => {
          console.log(response);
          let branch = new Object();
          branch.count = response.data.content.totalCount;
          branch.item = response.data.content.branch;
          this.branch = branch;
        }).catch(function(error) {
          alert(error);
        });
    },
    fillRoles() {
      axios.get('/resource/dynamic/software/' + this.selectedSoftware.softwareId + '/latest/role')
        .then(response => {
          this.roles = response.data.content;
        }).catch(function(error) {
          alert(error);
        });
    },
    showNewSwMod() {
      this.$emit('showNewSwMod');
    },
    showNewVerMod() {
      this.$emit('showNewVerMod');
    },
    showBranchsBelongSw(softwareId) {
      this.$router.push({
        path: '/branch',
        query: {
          sid: softwareId
        }
      });
    },
    refreshVersions() {
      this.fillVersions();
    }
  },
  mounted: function() {
    $('#softwareControllerTab .item').tab();
    $('a').popup({
      on: 'hover'
    });
    $('.label').popup({
      on: 'hover'
    });
    $('.button').popup({
      on: 'hover'
    });
  }
}
</script>
