<template>
<div id="ui segment">
  <!--导航栏-->
  <div class="ui breadcrumb">
    <div class="section"><span style="color:#584B4F;"><i class="circular home icon"></i></span></div>
    <i class="right arrow icon divider"></i>
    <div class="active section"><span style="color:#584B4F;">软件管理</span></div>
  </div>
  <!--软件提示-->
  <div class="ui explain small message">
    <div class="header">软件管理</div>
    <p>软件管理功能可以帮助您维护服务平台的软件和软件的版本。如果您对软件和版本的概念不是很理解，您可以查看<a href="">帮助</a></p>
    <div class="fluid ui buttons">
      <div class="ui green right labeled icon button" @click="showNewSwMod()"><i class="add icon"></i>新增软件</div>
    </div>
  </div>
  <div class="ui icon explain small message" v-show="selectedSoftware == null || selectedSoftware.softwareId == null || selectedSoftware.softwareId == ''">
    <i class="info grey icon"></i> 选择软件后可以快捷操作软件版本和关联角色。
  </div>
  <!-- <div class="right item" style="padding:8px 5px;" v-if="selectedSoftware != null && selectedSoftware.note != null">
    <div class="ui label">{{selectedSoftware.note.softwareName}}</div>
  </div> -->
  <div class="ui segment" v-if="selectedSoftware != null && selectedSoftware.note != null">
    <img class="ui avatar image" :src="'/resource/static/' + selectedSoftware.softwareImg">
    <span>{{selectedSoftware.note.softwareName}}</span>
  </div>

  <!-- <h5 class="ui center aligned icon header" v-if="selectedSoftware != null && selectedSoftware.note != null"><img class="ui centered medium image" :src="'/resource/static/' + selectedSoftware.softwareImg"> {{selectedSoftware.note.softwareName}} </h5> -->
  <!-- <h5 class="ui header"><img :src="'/resource/static/' + selectedSoftware.softwareImg" class="ui circular image"> {{selectedSoftware.note.softwareName}} </h5> -->
  <!--点击软件后显示的操作区，如果不点击软件，则给出提示消息。-->
  <div class="ui basic segment" style="padding:0px;" v-show="selectedSoftware != null && selectedSoftware.softwareId != null && selectedSoftware.softwareId != ''">
    <div id="softwareControllerTab" class="ui pointing secondary menu">
      <a class="item active" data-tab="version">最近版本</a>
      <a class="item" data-tab="role">关联角色</a>
    </div>
    <!--分支的快捷操作-->
    <div class="active ui bottom attached tab segment" data-tab="version" style="height:285px;padding:10px;margin-bottom:0px;">
      <div class="ui mini icon ignored yellow message">
        <i class="close icon"></i>
        <i class="info grey icon"></i>快捷菜单只显示当前版本。
      </div>
      <div class="ui grid" style="height:50px;">
        <div class="left floated left aligned ten wide column" style="padding:18px 0px 15px 20px;">
          <h5>共 <div class="ui mini circular label">{{branch.count}}</div> 个版本</h5>
        </div>
        <div class="right floated right aligned six wide column" style="padding:18px 15px 15px 5px;">
          <a href="javascript:return" @click="showBranchsBelongSw(selectedSoftware.softwareId)" data-content="点击查看全部" data-variation="mini inverted" data-position="right center"><i class="list layout blue outline icon"></i></a>
          <a href="javascript:return" @click="showNewVerMod()" data-content="点击添加新版本" data-variation="mini inverted" data-position="right center"><i class="add blue outline icon"></i></a>
        </div>
      </div>
      <div class="ui divider" style="margin: 14px 0px 2px 0px;"></div>
      <div v-if="branch.item != null" class="ui very relaxed divided list" style="margin-top:2px;">
        <div class="item" v-for="item in branch.item.notes" style="padding:6px 0px;">
          <div class="right floated content" style="padding:6px 1px;">
            <i class="flag" :class="item.branchLanguage | transferLanguageToFlag"></i>
            <a :href="'/resource/static/'+item.branchAddr"><i class="download blue outline icon"></i></a>
          </div>
          <img class="ui middle aligned avatar image" :src="'/resource/static/' + selectedSoftware.softwareImg">
          <div class="content">
            <div class="header">{{branch.item.branchVersion}}@{{item.branchName}}</div>
            <div class="description">{{item.branchNote | substr(13)}}</div>
          </div>
        </div>
      </div>
      <div class="ui disabled center aligned basic segment" v-else>
        <h5>还没有版本，点击右上角的“+”按钮，新增版本。</h5>
      </div>
    </div>
    <!--关联角色的快捷操作-->
    <div class="ui bottom attached tab basic segment" data-tab="role" style="padding:0;margin-bottom:0px;">
      <table class="ui small compact single line table" style="margin:0;">
        <thead>
          <tr>
            <th>角色名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in roles">
            <td>{{item.roleName}}</td>
            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox" v-model="item.selected" @click="changeCheckBox(item)"><label></label>
              </div>
            </td>
          </tr>
          <!-- <tr v-for="item in roles">
            <td></td>
            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox" @click="changeCheckBox(item)" v-model="item.selected"> <label></label>
              </div>
            </td>
          </tr> -->
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
      if (this.selectedSoftware != null && this.selectedSoftware != '' && this.selectedSoftware != undefined) {
        this.fillRoles();
        this.fillVersions();
      }
    }
  },
  methods: {
    objArrayHandler(arry) {
      if (arry != null) {
        for (let i = 0; i < arry.length; i++) {
          let obj = arry[i];
          if (obj.softwareId != null) {
            obj['selected'] = true;
          } else {
            obj['selected'] = false;
          }
          arry[i] = obj;
        }
        return arry;
      }
    },
    fillVersions() {
      axios.get('/resource/dynamic/software/' + this.selectedSoftware.softwareId + '/latest/version')
        .then(response => {
          let branch = new Object();
          branch.count = response.data.content.totalCount;
          branch.item = response.data.content.branch;
          this.branch = branch;
        }).catch(function(error) {
          this.toast.error('无法连接服务器');
        });
    },
    fillRoles() {
      axios.get('/resource/dynamic/software/' + this.selectedSoftware.softwareId + '/latest/role')
        .then(response => {
          this.roles = this.objArrayHandler(response.data.content);
        }).catch(function(error) {
          this.toast.error('无法连接服务器');
        });
    },
    changeCheckBox(role) {
      let bindType = role.selected ? "bind" : "unbind";
      axios.put('/resource/dynamic/software/' + this.selectedSoftware.softwareId + '/role/' + role.roleId + '/' + bindType)
        .then(response => {
          if (response.data.status == 'SUCCESS') {
            role.selected ? this.toast.success('绑定成功') : this.toast.success('解除绑定');
          }
        }).catch(function(error) {
          this.toast.error('无法连接服务器');
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
    $('.message .close')
      .on('click', function() {
        $(this)
          .closest('.message')
          .transition('fade');
      });
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
