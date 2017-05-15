<template>
<div id="allVersionApp" class="ui basic segment" style="box-sizing: border-box ; position: relative;left:0px;margin:0px;padding:0px;height:100%;width:100%;">
  <div class="ui basic segment" style="height:79px;width:100%;padding:0px;margin:0px;">
    <div class="ui breadcrumb" style="margin-top:65px;margin-left:10px;">
      <a class="section" href="#/"><span style="color:#24292e;"><i class="circular arrow left icon"></i></span></a>
    </div>
  </div>
  <div class="ui basic segment" style="position:absolute;top:100px;bottom:0px;width:100%;margin: 0px 10px 0px 0px;padding:15px;">
    <table class="ui yellow celled table">
      <thead>
        <tr>
          <th>版本号</th>
          <th>语言</th>
          <th>版本名</th>
          <th>版本简介</th>
          <th>创建时间</th>
          <th>最后更新时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in branchs">
          <template v-if="item.notes.length == 1 || item.notes.length == 0">
            <tr>
              <td><div class="ui teal ribbon label" v-show="item.branchUseFlag == 1" >Now</div>{{item.branchVersion}}</td>
              <td><i class="flag" :class="item.notes[0].branchLanguage | transferLanguageToFlag"></i>{{item.notes[0].branchLanguage | transferLanguageToStr}}</td>
              <td>{{item.notes[0].branchName}}</td>
              <td>{{item.notes[0].branchNote}}</td>
              <td>{{item.branchCtime}}</td>
              <td>{{item.branchUtime}}</td>
              <td>
                <div class="ui small basic icon buttons">
                  <button class="ui button" @click="editVersion(item.notes[0])"><i class="edit icon"></i></button>
                  <a class="ui button" :href="'/resource/static/' + item.notes[0].branchAddr" download><i class="download icon"></i></a>
                </div>
              </td>
            </tr>
</template>
          <template v-else>
<template v-for="(note,index) in item.notes">
              <tr v-if="index == 0">
                <td :rowspan="item.notes.length"><div class="ui teal ribbon label" v-show="item.branchUseFlag == 1">Now</div>{{item.branchVersion}}</td>
                <td><i class="flag" :class="note.branchLanguage | transferLanguageToFlag"></i>{{note.branchLanguage | transferLanguageToStr}}</td>
                <td>{{note.branchName}}</td>
                <td>{{note.branchNote}}</td>
                <td>{{item.branchCtime}}</td>
                <td>{{item.branchUtime}}</td>
                <td>
                  <div class="ui small basic icon buttons">
                    <button class="ui button" @click="editVersion(note)"><i class="edit icon"></i></button>
                    <a class="ui button" :href="'/resource/static/' + note.branchAddr" download><i class="download icon"></i></a>
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td><i class="flag" :class="note.branchLanguage | transferLanguageToFlag"></i>{{note.branchLanguage | transferLanguageToStr}}</td>
                <td>{{note.branchName}}</td>
                <td>{{note.branchNote}}</td>
                <td>{{item.branchCtime}}</td>
                <td>{{item.branchUtime}}</td>
                <td>
                  <div class="ui small basic icon buttons">
                    <button class="ui button" @click="editVersion(note)"><i class="edit icon"></i></button>
                    <a class="ui button" :href="'/resource/static/' + note.branchAddr" download><i class="download icon"></i></a>
                  </div>
                </td>
              </tr>
</template>
          </template>
        </template>
      </tbody>
    </table>
  </div>
  <div class="allversion ui modal">
    <i class="close icon"></i>
    <h4 class="ui header">
      <i class="edit icon"></i>
      <div class="content">修改版本
        <div class="sub header">修改当前版本的信息</div>
      </div>
    </h4>
    <div class="content">
      <div class="ui form">
        <div class="two fields">
          <div class="four wide required field">
            <label>版本名</label>
            <div class="ui labeled input">
              <input name="versionName" type="text" ref="versionName" :value="currentNote.branchName"/>
            </div>
          </div>
          <div class="required field">
            <label>安装程序</label>
            <div class="ui icon input">
              <input type="text" readonly v-model="fileName"/>
              <i class="inverted circular upload link icon" @click="choseApk()"></i>
              <input id="choseSoftwareButton" type="file" hidden @change="createSoftwareAndSettingChoseInput($event)" />
            </div>
          </div>
        </div>
        <div class="required field">
          <label>版本简介</label>
          <textarea ref="versionIntroduction">{{currentNote.branchNote}}</textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui green right labeled icon button" @click="submit()"><i class="checkmark right icon"></i>修改版本信息</div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      branchs: [],
      currentNote: {},
      fileName: '',
      branchApk: ''
    }
  },
  methods: {
    choseApk() {
      $('#choseSoftwareButton').click();
    },
    createSoftwareAndSettingChoseInput(event) {
      let apk = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function(e) {
        this.branchApk = e.target.result;
      }.bind(this);
      reader.readAsDataURL(apk);
      let filePath = event.target.value;
      let fileName = filePath.substring(filePath.lastIndexOf("\\") + 1);
      this.fileName = fileName;
    },
    editVersion(note) {
      this.currentNote = note;
      this.fileName = this.currentNote.branchAddr;
      $('.allversion.ui.modal').modal('show');
    },
    fillTable() {
      axios.get('/resource/dynamic/software/' + this.$route.query.sid + '/all/version')
        .then(response => {
          this.branchs = response.data.content;
        }).catch(function(error) {
          alert(error);
        });
    },
    submit() {
      axios.put('/resource/dynamic/branch/note/' + this.currentNote.noteId, {
        note: {
          'branchName': this.$refs.versionName.value,
          'branchNote': this.$refs.versionIntroduction.value
        },
        'branchApkBase64': this.branchApk
      }).then(response => {
        $('.allversion.ui.modal').modal('hide');
        this.fillTable();
      }).catch(function(error) {
        alert(error);
      });
    }
  },
  mounted: function() {
    $('.allversion.ui.modal').modal({
      context: '#app',
      blurring: true,
      closable: false
    });
    this.fillTable();
  }
}
</script>
