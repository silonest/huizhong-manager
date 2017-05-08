<template>
<div id="newSoftwareModal" class="software ui modal">
  <i class="close icon"></i>
  <div class="content" style="padding: 0px 1px;">
    <!--分步控件-->
    <div class="ui mini three top attached steps">
      <div class="step" v-bind:class="stepShow.stepOneActiveClass">
        <i class="settings icon"></i>
        <div class="content">
          <div class="title">软件信息</div>
        </div>
      </div>
      <div class="step" v-bind:class="stepShow.stepTwoActiveClass">
        <i class="world icon"></i>
        <div class="content">
          <div class="title">多语言</div>
        </div>
      </div>
      <div class="step" v-bind:class="stepShow.stepThreeActiveClass">
        <i class="trophy icon"></i>
        <div class="content">
          <div class="title">确认信息</div>
        </div>
      </div>
    </div>
    <!--第一步的内容-->
    <div class="ui attached segment" v-show="stepShow.stepOneActiveClass == 'active'">
      <div class="ui icon ignored info message" style="margin-bottom:30px;">
        <i class="close icon"></i>
        <i class="grey talk icon"></i>
        <div class="content">
          <p>
            我将引导您正确添加软件并上传软件的首版安装文件。
          </p>
          <p>
            首先，您需要给软件的首版本命名一个版本号，并选择软件类别。随后，您需要为软件选择一张展示图，并选择一个首版本的安装文件。全部成功后点击“下一步”按钮。
          </p>
        </div>
      </div>
      <div id="softwareInfoForm" class="ui small form">
        <div class="two fields">
          <div class="required field">
            <label>起始版本号</label>
            <div class="ui labeled input">
              <div class="ui label">V</div>
              <input name="firstVersion" type="text" v-model="createSoftwareForm.softwareVersion" placeholder="请输入软件的起始版本号，比如0.2.1..." />
            </div>
          </div>
          <div class="required field">
            <label>软件类别</label>
            <select name="softwareType" class="ui dropdown" v-model="createSoftwareForm.softwareType">
              <option selected="selected" value="0">调试软件</option>
              <option value="1">升级软件</option>
            </select>
          </div>
        </div>
        <div class="two fields">
          <div class="required field">
            <label>展示图</label>
            <div class="ui icon input">
              <input name="softwareImgPath" type="text" placeholder="点击按钮，选择图片。只能上传png、jpg、jepg格式的图片..." v-model="softwareImgPath" readonly/>
              <i class="inverted circular image outline link icon" v-on:click="choseSoftwareImg()"></i>
              <input id="uploadImgButton" type="file" hidden v-on:change="createSoftwareImg($event)" />
            </div>
          </div>
          <div class="required field">
            <label>安装程序</label>
            <div class="ui icon input">
              <input name="softwarePath" type="text" placeholder="点击按钮，选择软件安装包..." v-model="softwarePath" readonly/>
              <i class="inverted circular upload link icon" v-on:click="choseSoftware()"></i>
              <input id="uploadSoftwareButton" type="file" hidden v-on:change="createSoftware($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--第二步的内容-->
    <div class="ui attached segment" v-show="stepShow.stepTwoActiveClass == 'active'">
      <div class="ui icon ignored info message" style="margin-bottom:30px;">
        <i class="close icon"></i>
        <i class="grey talk icon"></i>
        <div class="content">
          <p>
            好的，软件信息填写完成。您现在需要给软件和首版本配置多语言的显示信息。请先选择语言，随后使用选择的语言填写软件和首版本的名称和说明，完成后点击“+”按钮，下方列表中将会显示一条记录。 您可能会对软件和首版本名称及说明有所疑惑，如有需要，您可以查看
            <a>软件和版本</a>的帮助文档。
          </p>
        </div>
      </div>
      <div id="languageForm" class="ui small form">
        <div class="four wide required field">
          <div class="four wide required field">
            <label>语言</label>
            <select id="language" name="language" class="ui dropdown" ref="language">
              <option value="china">中文</option>
              <option value="united kingdom">English</option>
              <option value="france">法文</option>
            </select>
          </div>
        </div>
        <div class="two fields">
          <div class="four wide required field">
            <label>软件名</label>
            <input name="softwareName" type="text" placeholder="请输入对应语言的软件名..." ref="softwareName" />
          </div>
          <div class="ten wide required field">
            <label>软件介绍</label>
            <input name="softwareIntroduction" type="text" placeholder="请使用对应语言介绍软件..." ref="softwareIntroduction" />
          </div>
        </div>
        <div class="three fields">
          <div class="four wide required field">
            <label>首版本名</label>
            <input name="versionName" type="text" placeholder="请输入对应语言的版本名称..." ref="versionName" />
          </div>
          <div class="ten wide required field">
            <label>首版本介绍</label>
            <input name="versionIntroduction" type="text" placeholder="请使用对应语言介绍该版本..." ref="versionIntroduction" />
          </div>
          <div class="one wide field">
            <label>&nbsp;</label>
            <button class="ui green icon button" v-on:click="addLanguage()"><i class="add icon"></i></button>
          </div>
        </div>
      </div>
      <table class="ui table">
        <thead>
          <tr>
            <th>语言</th>
            <th>软件名</th>
            <th>软件介绍</th>
            <th>起始版本名</th>
            <th>起始版本说明</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in createSoftwareForm.softwareGlobal">
            <td><i class="flag" :class="item.flag"></i>{{ item.softwareLanguage }}</td>
            <td>{{ item.softwareName }}</td>
            <td>{{ item.softwareIntroduction }}</td>
            <td>{{ item.versionName }}</td>
            <td>{{ item.versionIntroduction }}</td>
            <td><button class="ui mini basic red icon button" v-on:click="removeLanguage(index)"><i class="remove icon"></i>删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--第三步的内容-->
    <div class="ui attached segment" v-show="stepShow.stepThreeActiveClass == 'active'" v-refresh>
      <div class="ui icon ignored info message" style="margin-bottom:30px;">
        <i class="close icon"></i>'
        <i class="grey talk icon"></i>
        <div class="content">
          <p>
            非常好，软件有了初始版本和多语言环境。现在请您核实信息，确认无误后点击“新增”按钮，稍后片刻我们将为您创建新的软件及一个初始版本，但软件创建完成后是不启用的，您可以在您需要的时候启用它。
          </p>
        </div>
      </div>
      <div class="ui horizontal segments">
        <div class="ui segment" v-for="item in createSoftwareForm.softwareGlobal">
          <div class="ui card">
            <div class="image">
              <img :src="createSoftwareForm.softwareImg" style="width 160px;height: 160px">
            </div>
            <div class="content">
              <a class="header">{{ item.softwareName }}</a>
              <div class="description">{{ item.softwareIntroduction }}</div>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <div class="header">{{ createSoftwareForm.softwareFirstVersion }}</div>
              <div class="description">{{ item.versionIntroduction }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui negative icon message" v-show="message.title != null || message.content != null">
        <i class="announcement icon"></i>
        <div class="content">
          <div class="header">{{ message.title }}</div>
          <p>{{ message.content }}</p>
        </div>
      </div>
    </div>
  </div>
  <!--操作区-->
  <div class="actions">
    <div class="ui left labeled icon button" v-on:click="backStep()" v-if="stepShow.stepTwoActiveClass == 'active' || stepShow.stepThreeActiveClass == 'active'">上一步<i class="arrow left icon"></i></div>
    <div class="ui right labeled icon button" v-on:click="nextStep()" v-if="stepShow.stepOneActiveClass == 'active' || stepShow.stepTwoActiveClass == 'active'">下一步<i class="arrow right icon"></i></div>
    <div class="ui green right labeled icon button" v-on:click="submit()" v-if="stepShow.stepThreeActiveClass == 'active'"><i class="checkmark right icon"></i>新增</div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'

Vue.directive('refresh', {
  update: function() {
    $('#newSoftwareModal').modal('refresh');
  }
});
export default {
  data() {
    return {
      softwareImgPath: '',
      softwarePath: '',
      stepShow: {
        stepOneActiveClass: 'active',
        stepTwoActiveClass: 'disabled',
        stepThreeActiveClass: 'disabled'
      },
      createSoftwareForm: {
        softwareVersion: '',
        softwareType: '',
        softwareGlobal: []
      },
      message: {
        title: null,
        content: null
      }
    }
  },
  methods: {
    show() {
      $('.software.ui.modal').modal('show');
    },
    backStep() {
      if (this.stepShow.stepTwoActiveClass == 'active') {
        this.stepShow.stepOneActiveClass = 'active';
        this.stepShow.stepTwoActiveClass = 'disabled';
        this.stepShow.stepThreeActiveClass = 'disabled';
        return;
      }
      if (this.stepShow.stepThreeActiveClass == 'active') {
        this.stepShow.stepOneActiveClass = 'disabled';
        this.stepShow.stepTwoActiveClass = 'active';
        this.stepShow.stepThreeActiveClass = 'disabled';
        return;
      }
    },
    nextStep() {
      if (this.stepShow.stepOneActiveClass == 'active') {
        if ($('#softwareInfoForm').form('validate form')) {
          this.stepShow.stepOneActiveClass = 'disabled';
          this.stepShow.stepTwoActiveClass = 'active';
          this.stepShow.stepThreeActiveClass = 'disabled';
          return;
        }
      }
      if (this.stepShow.stepTwoActiveClass == 'active') {
        this.stepShow.stepOneActiveClass = 'disabled';
        this.stepShow.stepTwoActiveClass = 'disabled';
        this.stepShow.stepThreeActiveClass = 'active';
        return;
      }
    },
    addLanguage() {
      var software = new Object();
      software.softwareName = this.$refs.softwareName.value;
      software.flag = this.$refs.language.value;
      software.softwareLanguage = $('#language').find("option:selected").text();
      software.softwareIntroduction = this.$refs.softwareIntroduction.value;
      software.versionName = this.$refs.versionName.value;
      software.versionIntroduction = this.$refs.versionIntroduction.value;
      if ($('#languageForm').form('validate form')) {
        var isAdd = true;
        for (var index = 0; index < this.createSoftwareForm.softwareGlobal.length; index++) {
          if (this.createSoftwareForm.softwareGlobal[index].flag == software.flag) {
            isAdd = false;
          }
        }
        if (isAdd) {
          this.createSoftwareForm.softwareGlobal.push(software);
          $('#newSoftwareModal').modal('refresh');
        }
      }
    },
    removeLanguage(index) {
      this.createSoftwareForm.softwareGlobal.splice(index, 1);
      $('#newSoftwareModal').modal('refresh');
    },
    choseSoftwareImg() {
      $('#uploadImgButton').click();
    },
    choseSoftware() {
      $('#uploadSoftwareButton').click();
    },
    createSoftwareImg(event) {
      let file = event.target.files[0];
      //this.createSoftwareForm.softwareImgFile = file;
      let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (file && supportedTypes.indexOf(file.type) >= 0) {
        let reader = new FileReader();
        reader.onloadend = function(e) {
          this.createSoftwareForm.softwareImg = e.target.result;
        }.bind(this);
        reader.readAsDataURL(file);
        let filePath = $('#uploadImgButton').val();
        this.softwareImgPath = filePath.substring(filePath.lastIndexOf("\\") + 1);
      } else {
        $('#softwareInfoForm').form('add prompt', "softwareImgPath", "您选择的文件不是图片格式。");
      }
    },
    createSoftware(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function(e) {
        this.createSoftwareForm.softwareApk = e.target.result;
      }.bind(this);
      reader.readAsDataURL(file);
      let filePath = $('#uploadSoftwareButton').val();
      let fileName = filePath.substring(filePath.lastIndexOf("\\") + 1);
      this.softwarePath = fileName;
    },
    submit() {
      let softwareNote = new Array();
      let branch = new Object();
      branch.branchVersion = 'V' + this.createSoftwareForm.softwareVersion;
      branch.branchApkBase64 = this.createSoftwareForm.softwareApk;
      let branchNote = new Array();
      for (let index = 0; index < this.createSoftwareForm.softwareGlobal.length; index++) {
        let flag = this.createSoftwareForm.softwareGlobal[index].flag;
        let language = '';
        if (flag == 'china') {
          language = 'zh'
        } else if (flag == 'united kingdom') {
          language = 'en'
        } else if (flag = 'france') {
          language = 'fr'
        }
        softwareNote.push({
          softwareLanguage: language,
          softwareName: this.createSoftwareForm.softwareGlobal[index].softwareName,
          softwareNote: this.createSoftwareForm.softwareGlobal[index].softwareIntroduction
        });
        branchNote.push({
          branchLanguage: language,
          branchName: this.createSoftwareForm.softwareGlobal[index].versionName,
          branchNote: this.createSoftwareForm.softwareGlobal[index].versionIntroduction
        });
      }
      branch.notes = branchNote;
      axios.post('/resource/dynamic/software', {
          'softwareImgBase64': this.createSoftwareForm.softwareImg,
          'softwareType': this.createSoftwareForm.softwareType,
          'notes': softwareNote,
          'branch': branch
        }).then(function(response) {
          $('#newSoftwareModal').modal('hide');
          this.$emit('refreshSoftwares');
          this.toast.success('添加成功');
        }.bind(this)).catch(function(response) {
          alert(response);
        });
    }
  },
  mounted: function() {
    $('.software.ui.modal').modal({
      context: '#app',
      blurring: true,
      closable: false,
      onHidden: function() {
        this.softwareImgPath = ''
        this.softwarePath = ''
        this.stepShow.stepOneActiveClass = 'active'
        this.stepShow.stepTwoActiveClass = 'disabled'
        this.stepShow.stepThreeActiveClass = 'disabled'
        this.createSoftwareForm = {
            softwareVersion: '',
            softwareType: '',
            softwareImg: {},
            softwareApk: {},
            softwareGlobal: []
          },
          //this.message = {
          //title: '',
          //content: ''
          //}
          $('#softwareInfoForm').form('clear');
        $('#languageForm').form('clear');
      }.bind(this)
    });

    $('#softwareInfoForm').form({
      fields: {
        softwareImgPath: {
          rules: [{
            type: 'empty'
          }]
        },
        softwarePath: {
          rules: [{
            type: 'empty'
          }]
        },
        firstVersion: {
          rules: [{
            type: 'empty'
          }]
        },
        softwareType: {
          rules: [{
            type: 'empty'
          }]
        }
      }
    });

    $('#languageForm').form({
      fields: {
        language: {
          rules: [{
            type: 'empty'
          }]
        },
        softwareName: {
          rules: [{
            type: 'empty'
          }]
        },
        softwareIntroduction: {
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
<type>
</type>
