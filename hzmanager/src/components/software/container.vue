<template>
<div id="container" class="ui basic segment">
  <h4 class="ui horizontal header divider"><i class="bug icon"></i>调试软件</h4>

  <div class="ui link six cards" v-if="debugSoftwares.length != 0">
    <!--卡片-->
    <div class="yellow normal card" v-for="(item,index) in debugSoftwares">
      <div class="blurring image" v-if="item.softwareUseFlag == 0"><img class="image" :src="'/resource/static/' + item.softwareImg" v-on:click="choseSoftware()" />
        <div class="rounded ui dimmer" style="border-radius:5px 5px 0px 0px;" @click="choseSoftware(item)">
          <div class="content">
            <div class="center">
              <h5 class="ui inverted icon header">已停用</h5>
            </div>
          </div>
        </div>
      </div>
      <img class="image" :src="'/resource/static/' + item.softwareImg" v-else @click="choseSoftware(item)" />
      <div class="content" v-on:click="choseSoftware(item)">
        <div class="header">{{item.note.softwareName}}</div>
        <div class="meta">当前版本 : {{item.branch == null ? 'N/A' : item.branch.branchVersion}}</div>
        <div class="meta">语言 : <i class="flag" v-for="flag in item.language" :class="flag | transferLanguageToFlag"></i></div>
        <div class="description">{{item.note.softwareNote}}</div>
      </div>
      <div class="extra content">
        <a :href="'/resource/static/' + item.branch.note.branchAddr" download v-if="item.branch != null"><i class="download icon" data-content="下载"></i></a>
        <a v-if="item.softwareUseFlag == 0"><i class="play icon" data-content="启用" @click="changeSoftwareStatus(item,'used')"></i></a>
        <a v-else><i class="pause icon" data-content="停用" @click="changeSoftwareStatus(item,'useless')"></i></a>
        <a><i class="remove icon" data-content="删除" @click="showDeleteSwChoseMod(item,index)"></i></a>
      </div>
    </div>
    <!--卡片结尾-->
  </div>
  <div class="ui disabled center aligned basic segment" v-else>
    <h2><i class="large ui frown icon"></i>调试软件列表还是空的，赶快添加一个吧！</h2>
  </div>
  <h4 class="ui horizontal header divider"><i class="settings icon"></i>升级软件</h4>
  <div class="ui link six cards" v-if="updateSoftwares != null && updateSoftwares.length != 0">
    <div class="blue card" style="width:190px;" :class="item.color" v-for="(item,index) in updateSoftwares">
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
        <div class="meta">当前版本:{{item.branch == null ? 'N/A' : item.branch.branchVersion}}</div>
        <div class="meta">语言 : <i class="flag" v-for="flag in item.language" :class="flag | transferLanguageToFlag"></i></div>
        <div class="description">{{item.note.softwareNote}}</div>
      </div>
      <div class="extra content">
        <a :href="'/resource/static/' + item.branch.note.branchAddr" download v-if="item.branch != null"><i class="download icon" data-content="下载"></i></a>
        <a v-if="item.softwareUseFlag == 0"><i class="play icon" data-content="启用" v-on:click="changeSoftwareStatus(item,'used')"></i></a>
        <a v-else><i class="pause icon" data-content="停用" v-on:click="changeSoftwareStatus(item,'useless')"></i></a>
        <a><i class="remove icon" data-content="删除" @click="showDeleteSwChoseMod(item,index)"></i></a>
      </div>
    </div>
  </div>
  <div class="ui disabled center aligned basic segment" v-else>
    <h2><i class="large ui frown icon"></i>升级软件列表还是空的，赶快添加一个吧！</h2>
  </div>

  <div id="deleteSwMod" class="ui basic coupled modal">
    <div class="ui icon header"><i class="remove icon"></i> 删除{{deleteSwTemp.note.softwareName}}？ </div>
    <div class="content">
      <p>你是要删除"{{deleteSwTemp.note.softwareName}}"吗，删除软件后，您将不能再对其进行任何操作。</p>
    </div>
    <div class="actions">
      <div class="ui green basic cancel inverted button" @click="dropDelete()"><i class="remove icon"></i> 再想想 </div>
      <div class="ui red ok inverted button" @click="deleteSoftware()"><i class="checkmark icon"></i> 删了吧 </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      debugSoftwares: [],
      updateSoftwares: [],
      deleteSwTemp: {
        index: 0,
        note: {}
      }
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
            this.toast.success('已启用');
          } else if (currentStatus == 'useless') {
            software.softwareUseFlag = 0;
            this.toast.success('已停用');
          }
        }).catch(function(error) {
          alert(error);
        });
    },
    showDeleteSwChoseMod(software, index) {
      this.deleteSwTemp = software;
      this.deleteSwTemp.index = index;
      $('#deleteSwMod').modal('show');
    },
    dropDelete() {
      $('#deleteSwMod').modal('hide');
    },
    deleteSoftware() {
      let software = this.deleteSwTemp;
      axios.put('/resource/dynamic/software/' + software.softwareId + '/status/discussion')
        .then(response => {
          if (software.softwareType == 0) {
            this.debugSoftwares.splice(software.index, 1);
          }
          if (software.softwareType == 1) {
            this.updateSoftwares.splice(software.index, 1);
          }
          $('#deleteSwMod').modal('hide');
          this.toast.success('已删除');
        }).catch(function(error) {
          alert(error);
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
    $('#deleteSwMod').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
    this.showDimmer();
  },
  updated: function() {
    this.showDimmer();
  }
}
</script>
<style>

</style>
