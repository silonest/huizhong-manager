<template>
<div id="container" class="ui basic segment">
  <h4 class="ui horizontal header divider"><i class="bug icon"></i>调试软件</h4>

  <div class="ui link six cards" v-if="debugSoftwares.length != 0">
    <!--卡片-->
    <div class="yellow card" style="width:190px;" v-for="item in debugSoftwares">
      <div class="blurring image" v-if="item.softwareUseFlag == 0"><img class="image" style="width 190px;height: 190px" :src="'/resource/static/' + item.softwareImg" v-on:click="choseSoftware()" />
        <div class="rounded ui dimmer" style="border-radius:5px 5px 0px 0px;" @click="choseSoftware(item)">
          <div class="content">
            <div class="center">
              <h5 class="ui inverted icon header">已停用</h5>
            </div>
          </div>
        </div>
      </div>
      <img class="image" style="height: 190px" :src="'/resource/static/' + item.softwareImg" v-else @click="choseSoftware(item)" />
      <div class="content" v-on:click="choseSoftware(item)">
        <div class="header">{{item.note.softwareName}}</div>
        <div class="meta">当前版本:{{item.branch.branchVersion}}</div>
        <div class="description">{{item.note.softwareNote}}</div>
      </div>
      <div class="extra content">
        <a :href="'/resource/static/' + item.branch.note.branchAddr" download><i class="download icon" data-content="下载"></i></a>
        <a v-if="item.softwareUseFlag == 0"><i class="play icon" data-content="启用" @click="changeSoftwareStatus(item,'used')"></i></a>
        <a v-else><i class="pause icon" data-content="停用" @click="changeSoftwareStatus(item,'useless')"></i></a>
        <a><i class="remove icon" data-content="删除"></i></a>
      </div>
    </div>
    <!--卡片结尾-->
  </div>
  <div class="ui disabled center aligned basic segment" v-else>
    <h2><i class="large ui frown icon"></i>调试软件列表还是空的，赶快添加一个吧！</h2>
  </div>
  <h4 class="ui horizontal header divider"><i class="settings icon"></i>升级软件</h4>
  <div class="ui link six cards" v-if="updateSoftwares != null && updateSoftwares.length != 0">
    <div class="blue card" style="width:190px;" :class="item.color" v-for="item in updateSoftwares">
      <div class="blurring image" v-if="item.softwareUseFlag == 0"><img class="image" style="width 190px;height: 190px" :src="'/resource/static/' + item.softwareImg" v-on:click="choseSoftware()" />
        <div class="rounded ui dimmer" style="border-radius:5px 5px 0px 0px;" @click="choseSoftware(item)">
          <div class="content">
            <div class="center">
              <h5 class="ui inverted icon header">已停用</h5>
            </div>
          </div>
        </div>
      </div>
      <img class="image" style="height: 190px" :src="'/resource/static/' + item.softwareImg" v-else @click="choseSoftware(item)" />
      <div class="content">
        <div class="header">{{item.note.softwareName}}</div>
        <div class="meta">当前版本:{{item.branch.branchVersion}}</div>
        <div class="description">{{item.note.softwareNote}}</div>
      </div>
      <div class="extra content">
        <a :href="'/resource/static/' + item.branch.note.branchAddr" download><i class="download icon" data-content="下载"></i></a>
        <a v-if="item.softwareUseFlag == 0"><i class="play icon" data-content="启用" v-on:click="changeSoftwareStatus(item,'used')"></i></a>
        <a v-else><i class="pause icon" data-content="停用" v-on:click="changeSoftwareStatus(item,'useless')"></i></a>
        <a><i class="remove icon" data-content="删除"></i></a>
      </div>
    </div>
  </div>
  <div class="ui disabled center aligned basic segment" v-else>
    <h2><i class="large ui frown icon"></i>升级软件列表还是空的，赶快添加一个吧！</h2>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      debugSoftwares: [],
      updateSoftwares: []
    }
  },
  methods: {
    fillSoftwares() {
      axios.get('/resource/dynamic/manager/softwares/type/debugger')
        .then(response => {
          this.debugSoftwares = response.data.content;
        }).catch(function(error) {
          alert(response);
        });
      axios.get('/resource/dynamic/manager/softwares/type/updater')
        .then(response => {
          this.updateSoftwares = response.data.content;
        }).catch(function(error) {
          alert(response);
        });
    },
    changeSoftwareStatus(software, currentStatus) {
      axios.put('/resource/dynamic/software/' + software.softwareId + '/status/' + currentStatus)
        .then(response => {
          if (currentStatus == 'used') {
            software.softwareUseFlag = 1;
          } else if (currentStatus == 'useless') {
            software.softwareUseFlag = 0;
          }
        })
        .catch(function(error) {
          alert(response);
        });
    },
    showDimmer() {
      $('.blurring.image').dimmer({
        opacity: '0.4',
        closable: false
      }).dimmer('show');
    },
    choseSoftware(software) {
      this.$emit('selectSoftware', software);
    },
    refreshSoftwares() {
      this.fillSoftwares();
    }
  },
  created: function() {
    this.fillSoftwares();
  },
  mounted: function() {
    this.showDimmer();
  },
  updated: function() {
    this.showDimmer();
  }
}
</script>
<style>

</style>
