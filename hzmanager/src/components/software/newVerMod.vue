<template>
<div class="version ui modal">
  <i class="close icon"></i>
  <h4 class="ui header">
    <i class="settings icon"></i>
    <div class="content">新增软件版本
      <div class="sub header">给软件增加一个新的版本</div>
    </div>
  </h4>
  <div class="content">
    <div id="versionForm" class="ui small form">
      <div class="two fields">
        <div class="four wide required field">
          <label>版本号</label>
          <div class="ui labeled input">
            <div class="ui label">V</div>
            <input name="versionNum" type="text" placeholder="请输入版本号..." ref="versionNum" />
          </div>
        </div>
        <div class="required field">
          <label>安装程序</label>
          <div class="ui icon input">
            <input name="fileName" type="text" placeholder="点击按钮，选择该版本软件的安装包..." readonly v-model="fileName" />
            <i class="inverted circular upload link icon" @click="choseSoftware()"></i>
            <input id="choseSoftwareButton" type="file" hidden @change="createSoftwareAndSettingChoseInput($event)" />
          </div>
        </div>
      </div>
    </div>
    <div id="globalForm" class="ui small form">
      <div class="four fields">
        <div class="four wide required field">
          <label>语言</label>
          <select id="versionLanguage" name="versionLanguage" class="ui dropdown" ref="versionFlag" @change="clearVersionInput()">
            <option value="china">中文</option>
            <option value="united kingdom">English</option>
            <option value="france">法文</option>
          </select>
        </div>
        <div class="four wide required field">
          <label>版本名</label>
          <input id="versionName" name="versionName" type="text" placeholder="请输入对应语言的版本名称..." ref="versionName" />
        </div>
        <div class="ten wide required field">
          <label>版本介绍</label>
          <input id="versionIntroduction" name="versionIntroduction" type="text" placeholder="请使用对应语言介绍该版本特性..." ref="versionIntroduction" />
        </div>
        <div class="one wide field">
          <label>&nbsp;</label>
          <button class="ui green icon button" @click="addGlobalTableColumn()"><i class="add icon"></i></button>
        </div>
      </div>
    </div>
    <table class="ui table">
      <thead>
        <tr>
          <th>语言</th>
          <th>版本名</th>
          <th>版本介绍</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in createVersionForm.versionGlobal">
          <td><i class="flag" :class="item.flagClass"></i>{{item.flagName}}</td>
          <td>{{item.versionName}}</td>
          <td>{{item.versionIntroduction}}</td>
          <td><button class="ui mini basic red icon button" @click="removeGlobalTableColumn(index)"><i class="remove icon"></i>删除</button></td>
        </tr>
      </tbody>
    </table>
    <div id="abc" class="ui error message" v-show="errorMsg.show">
      <div class="header">无法提交</div>
      <p>您必须解决以下问题后才能继续</p>
      <ul class="list">
        <li>{{this.errorMsg.content.versionNum}}</li>
        <li>{{this.errorMsg.content.fileName}}</li>
        <li>{{this.errorMsg.content.versionGlobal}}</li>
      </ul>
    </div>
  </div>
  <div class="actions">
    <div class="ui green right labeled icon button" @click="submit()"><i class="checkmark right icon"></i>新增版本</div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      fileName: '',
      errorMsg: {
        show: false,
        content: {}
      },
      createVersionForm: {
        versionGlobal: []
      }
    }
  },
  props: ['software'],
  methods: {
    show() {
      $('.version.ui.modal').modal('show');
    },
    choseSoftware() {
      $('#choseSoftwareButton').click();
    },
    createSoftwareAndSettingChoseInput(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function(e) {
        this.createVersionForm.versionApk = e.target.result;
      }.bind(this);
      reader.readAsDataURL(file);
      let filePath = event.target.value;
      let fileName = filePath.substring(filePath.lastIndexOf("\\") + 1);
      this.fileName = fileName;
    },
    addGlobalTableColumn() {
      let versionGlobal = new Object();
      versionGlobal.flagClass = this.$refs.versionFlag.value;
      versionGlobal.flagName = $('#versionLanguage').find("option:selected").text();
      versionGlobal.versionName = this.$refs.versionName.value;
      versionGlobal.versionIntroduction = this.$refs.versionIntroduction.value;
      if ($('#globalForm').form('validate form')) {
        let isAdd = true;
        for (let index = 0; index < this.createVersionForm.versionGlobal.length; index++) {
          if (this.createVersionForm.versionGlobal[index].flagName == versionGlobal.flagName) {
            isAdd = false;
          }
        }
        if (isAdd) {
          this.createVersionForm.versionGlobal.push(versionGlobal);
          $('.version.ui.modal').modal('refresh');
        }
      }
    },
    removeGlobalTableColumn(index) {
      this.createVersionForm.versionGlobal.splice(index, 1);
      $('.version.ui.modal').modal('refresh');
    },
    clearVersionInput() {
      $('#versionName').val('');
      $('#versionIntroduction').val('');
    },
    submit() {
      let versionName = 'V' + this.$refs.versionNum.value;
      let fileName = this.fileName;
      let allowSubmit = true;
      if (!$('#versionForm').form('validate form')) {
        allowSubmit = false;
      }
      let errMsg = new Object();
      if (versionName == null || versionName == undefined || versionName == '') {
        errMsg.versionNum = '版本号不能为空';
        allowSubmit = false;
      }
      if (fileName == null || fileName == undefined || fileName == '') {
        errMsg.fileName = '需要上传一个软件的安装包';
        allowSubmit = false;
      }
      if (this.createVersionForm.versionGlobal.length == 0) {
        errMsg.versionGlobal = '至少要有一种语言的版本介绍';
        allowSubmit = false;
      }
      this.errorMsg.show = true;
      this.errorMsg.content = errMsg;
      if (allowSubmit) {
        this.errorMsg.show = false;
        let branchNote = new Array();
        for (let index = 0; index < this.createVersionForm.versionGlobal.length; index++) {
          let flag = this.createVersionForm.versionGlobal[index].flagClass;
          let language = '';
          if (flag == 'china') {
            language = 'zh'
          } else if (flag == 'united kingdom') {
            language = 'en'
          } else if (flag = 'france') {
            language = 'fr'
          }
          branchNote.push({
            branchLanguage: language,
            branchName: this.createVersionForm.versionGlobal[index].versionName,
            branchNote: this.createVersionForm.versionGlobal[index].versionIntroduction
          });
        }
        let softwareId = this.software.softwareId;
        axios.post('/resource/dynamic/software/' + softwareId + '/branch', {
          branchVersion: versionName,
          branchApkBase64: this.createVersionForm.versionApk,
          notes: branchNote
        }).then(function(response) {
          if (response.data.status == "SUCCESS") {
            $('.version.ui.modal').modal('hide');
            this.$emit('refreshVersions');
            this.toast.success('添加成功');
          }
        }.bind(this)).catch(function(response) {
          alert(response);
        });
      } else {
        $('.version.ui.modal').modal('refresh');
      }
    }
  },
  mounted: function() {
    //给新增软件中软件类型的下拉菜单绑定效果
    $('#versionLanguage').dropdown('set selected', 'china');
    $('.version.ui.modal').modal({
      context: '#app',
      blurring: true,
      closable: false,
      onHidden: function() {
        $('#versionForm').form('clear');
        $('#globalForm').form('clear');
        $('#versionLanguage').dropdown('set selected', 'china');
      }
    });

    $('#versionForm').form({
      fields: {
        versionNum: {
          rules: [{
            type: 'empty',
            prompt: '版本号不能为空'
          }]
        },
        fileName: {
          rules: [{
            type: 'empty',
            prompt: '需要上传一个软件的安装包'
          }]
        }
      }
    });

    $('#globalForm').form({
      fields: {
        versionGlobal: {
          rules: [{
            type: 'empty'
          }]
        },
        versionName: {
          rules: [{
            type: 'empty'
          }]
        },
        versionIntroduction: {
          rules: [{
            type: 'empty'
          }]
        }
      }
    });

  }
}
</script>
