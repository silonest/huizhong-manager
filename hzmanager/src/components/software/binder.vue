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
    <div class="version ui small form">
      <div class="two fields">
        <div class="four wide required field">
          <label>版本号</label>
          <div class="ui labeled input">
            <div class="ui label">V</div>
            <input name="versionNum" type="text" placeholder="如:1.2.6" v-model="buffer.version" />
          </div>
        </div>
        <div class="four wide required field">
          <label>安装程序</label>
          <div class="ui icon input">
            <input name="softwareApkInput" type="text" placeholder="上传软件的安装包" readonly ref="softwareApkInput" />
            <i class="inverted circular upload link icon" @click="showChoseApkFileInput()"></i>
            <input type="file" hidden @change="addApkDataToBuffer($event)" ref="choseApkFileInput" />
          </div>
        </div>
      </div>
      <h5 class="ui horizontal header divider"><i class="ui world icon"></i>多语言支持</h5>
      <div class="inline fields" v-for="(item,index) in software.language">
        <label><i class="flag" :class="item | transferLanguageToFlag"></i>{{item | transferLanguageToStr}}</label>
        <div class="three wide field">
          <input :name="'name_'+item" type="text" placeholder="版本名" v-model="buffer.notes[index].branchName" />
        </div>
        <div class="ten wide field">
          <input :name="'introduction_'+item" type="text" placeholder="请使用对应语言介绍该版本特性" v-model="buffer.notes[index].branchNote" />
        </div>
      </div>
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
      entity: {
        main: null,
        form: null
      },
      sw: {},
      buffer: {
        version: '',
        apk: {
          path: '',
          chars: ''
        },
        notes: [],
        clear: function() {
          this.buffer = {
            version: '',
            apk: {
              path: '',
              chars: ''
            },
            notes: []
          }
        }
      }
    }
  },
  props: ['software'],
  methods: {
    init() {
      // 初始化modal
      this.entity.main.modal({
        context: '#app',
        blurring: true,
        closable: false,
        onHidden: function() {
          this.$refs.choseApkFileInput.value = '';
          $('.version.form').form('clear');
          this.buffer.clear();
        }.bind(this)
      });
      // 初始化form
      this.entity.form.form();
    },
    initNotes() {
      let notes = new Array();
      for (let index in this.software.language) {
        let note = new Object();
        note.branchLanguage = this.software.language[index];
        note.branchName = '';
        note.branchNote = '';
        notes.push(note);
      }
      this.$set(this.$data.buffer, 'notes', notes);
    },
    show() {
      this.entity.main.modal('show');
    },
    showChoseApkFileInput() {
      this.$refs.choseApkFileInput.click();
    },
    addApkDataToBuffer(event) {
      var apkData = this.file.encodeApk(event.target);
      if (apkData.status == 'SUCCESS') {
        this.$refs.softwareApkInput.value = apkData.path;
        this.buffer.apk = apkData;
      } else {
        $('#software_creater_form').form('add prompt', 'softwareApkPath');
      }
    },
    submit() {
      axios.post('/resource/dynamic/software/' + this.software.softwareId + '/branch', {
        branchVersion: 'V' + this.buffer.version,
        branchApkBase64: this.buffer.apk.chars,
        notes: this.buffer.notes
      }).then(function(response) {
        if (response.data.status == "SUCCESS") {
          this.entity.main.modal('hide');
          this.$emit('refreshVersions');
          this.toast.success('添加成功');
        }
      }.bind(this)).catch(function(response) {
        alert(response);
      });
    },
  },
  created() {
    // 初始化data数据
    this.initNotes();
  },
  mounted() {
    // 将jquery控件的实体写入data中。
    this.entity.main = $('.version.modal');
    this.entity.form = $('.version.form');
    // 初始化一些必要的组件。
    this.init();
  }
}
</script>
