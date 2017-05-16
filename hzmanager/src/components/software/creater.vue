<template>
<div>
  <div id="software_creater" class="ui modal">
    <div class="header">新增软件</div>
    <div class="content">
      <div id="software_creater_form" class="ui small form">
        <div class="two fields">
          <div class="four wide field">
            <label>软件类别</label>
            <select name="softwareType" class="ui dropdown" v-model="buffer.type">
            <option selected="selected" value="0">调试软件</option>
            <option value="1">升级软件</option>
          </select>
          </div>
          <div class="four wide required field">
            <label>展示图</label>
            <div class="ui icon input">
              <input name="imagePath" type="text" placeholder="支持png、jpg、jepg" readonly ref="softwareImageInput" />
              <i class="inverted circular image outline link icon" @click="showChoseImageFileInput()"></i>
              <input type="file" hidden @change="addImageDataToBuffer($event)" ref="choseImageFileInput" />
            </div>
          </div>
        </div>
        <h5 class="ui horizontal header divider"><i class="ui world icon"></i>多语言支持</h5>
        <div class="required field">
          <label>软件说明</label>
          <div class="four fields">
            <div class="three wide field">
              <div class="ui fluid selection dropdown">
                <input name="noteLanguage" type="hidden" ref="noteLanguage" @change="clearNote()">
                <i class="dropdown icon"></i>
                <div class="default text">语言</div>
                <div class="menu">
                  <div class="item" data-value="zh"><i class="china flag"></i>中文</div>
                  <div class="item" data-value="en"><i class="united kingdom flag"></i>英文</div>
                  <div class="item" data-value="fr"><i class="france flag"></i>法文</div>
                </div>
              </div>
            </div>
            <div class="three wide field">
              <input name="softwareName" type="text" placeholder="软件名" ref="softwareName" />
            </div>
            <div class="ten wide field">
              <input name="softwareIntroduction" type="text" placeholder="请使用对应语言介绍软件" ref="softwareIntroduction" />
            </div>
            <div class="one wide field">
              <button class="ui green icon button" @click="putNote()"><i class="add icon"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="ui disabled center aligned global segment" v-if="buffer.notes.length == 0">
        <h2><i class="large ui add icon"></i>请添加软件的支持语言</h2>
      </div>
      <div class="ui global segment" v-else>
        <div class="ui cards">
          <div class="normal yellow card" v-for="(item,index) in buffer.notes">
            <div class="ui fluid image">
              <a class="ui right corner label" @click="removeNote(index)">
                <i class="ui red trash outline icon"></i>
              </a>
              <img class="image" :src="buffer.image.chars" />
            </div>
            <div class="content">
              <div class="header">{{item.name}}</div>
              <div class="meta">语言: <i class="flag" :class="item.language | transferLanguageToFlag"></i></div>
              <div class="description">{{item.introduction}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions" style="padding:10px;">
      <div class="ui negative button" @click="dropCreate()">取消 </div>
      <div class="ui green right labeled icon button" :class="{'disabled': buffer.notes.length == 0 || buffer.image.path == '' || buffer.image.chars == ''}" @click="submit()"><i class="checkmark right icon"></i>新增软件</div>
    </div>
  </div>
  <div id="creater_result" class="ui small modal">
    <div class="content">
      <h3 class="ui center aligned icon header">
        <i class="circular green check icon"></i>
        添加成功！您可以继续添加版本。
      </h3>
    </div>
    <div class="actions" style="padding:10px;">
      <div class="ui red cancel button">取消 </div>
      <div class="ui green button" @click="goToBinder()"><i class="checkmark icon"></i>继续 </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      buffer: {
        image: {
          path: '',
          chars: ''
        },
        type: 0,
        notes: [],
        clear: function() {
          this.image = {
            path: '',
            chars: ''
          };
          this.imagePath = '';
          this.type = 0;
          this.notes = [];
        }
      }
    }
  },
  // filters: {
  //   allowSubmit: function() {
  //     alert(1);
  //     if () {
  //       return false;
  //     } else if (this.str.isEmpty(this.buffer.type)) {
  //       return false;
  //     } else if (this.str.isEmpty(this.buffer.notes.length == 0)) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // },
  methods: {
    show: function() {
      $('#software_creater').modal('show');
    },
    showChoseImageFileInput() {
      this.$refs.choseImageFileInput.click();
    },
    addImageDataToBuffer(event) {
      var imageData = this.file.encodeImage(event.target);
      if (imageData.status == 'SUCCESS') {
        this.$refs.softwareImageInput.value = imageData.path;
        this.buffer.image = imageData;
      } else if (imageData.status == 'ILLEGAL') {
        $('#software_creater_form').form('add prompt', 'imagePath');
      }
    },
    checkNote: function() {
      let result = true;
      if (this.str.isEmpty(this.$refs.noteLanguage.value)) {
        result = false;
        $('#software_creater_form').form('add prompt', 'noteLanguage');
      }
      if (this.str.isEmpty(this.$refs.softwareName.value)) {
        result = false;
        $('#software_creater_form').form('add prompt', 'softwareName');
      }
      if (this.str.isEmpty(this.$refs.softwareIntroduction.value)) {
        result = false;
        $('#software_creater_form').form('add prompt', 'softwareIntroduction');
      }
      if (this.str.isEmpty(this.buffer.image.chars)) {
        result = false;
        $('#software_creater_form').form('add prompt', 'imagePath');
      }
      return result;
    },
    clearNote: function() {
      this.$refs.softwareName.value = null;
      this.$refs.softwareIntroduction.value = null;
    },
    putNote: function() {
      if (this.checkNote()) {
        let note = new Object();
        note.language = this.$refs.noteLanguage.value;
        note.name = this.$refs.softwareName.value;
        note.introduction = this.$refs.softwareIntroduction.value;
        for (let index = 0; index < this.buffer.notes.length; index++) {
          if (this.buffer.notes[index].language == note.language) {
            return;
          }
        }
        this.buffer.notes.push(note);
      }
    },
    removeNote: function(index) {
      this.buffer.notes.splice(index, 1);
    },
    submit() {
      let softwareNotes = new Array();
      for (let index = 0; index < this.buffer.notes.length; index++) {
        let note = this.buffer.notes[index];
        softwareNotes.push({
          softwareLanguage: note.language,
          softwareName: note.name,
          softwareNote: note.introduction
        });
      }
      axios.post('/resource/dynamic/manager/software', {
        'softwareImgBase64': this.buffer.image.chars,
        'softwareType': this.buffer.type,
        'notes': softwareNotes
      }).then(function(response) {
        this.$emit('checkSoftwareAndRefreshList',response.data.content);
        $('#software_creater').modal('hide');
        $('#creater_result').modal('show');
      }.bind(this)).catch(function(response) {
        alert(response);
      });
    },
    goToBinder() {
      $('#creater_result').modal('hide');
      this.$emit('showBinder');
    },
    dropCreate() {
      $('#software_creater').modal('hide');
    }
  },
  mounted: function() {
    $('#software_creater').modal({
      context: '#app',
      blurring: true,
      allowMultiple: false,
      autofocus: false,
      closable: false,
      onHidden: function() {
        this.$refs.choseImageFileInput.value = '';
        $('#software_creater_form').form('reset');
        this.buffer.clear();
      }.bind(this)
    });
    $('#creater_result').modal({
      context: '#app',
      blurring: true,
      allowMultiple: false,
      autofocus: false
    });
    $('#software_creater_form').form({
      fields: {
        imagePath: {
          rules: [{
            type: 'empty'
          }]
        },
        noteLanguage: {
          rules: [{
            type: 'empty'
          }]
        },
        softwareName: {
          rules: [{
            type: 'empty'
          }]
        },
        softwareIntroduction: [{
          rules: [{
            type: 'empty'
          }]
        }]
      }
    });
    $('.ui.dropdown').dropdown({
      transition: 'slide down'
    });
  }
}
</script>
<style>
.global.segment {
  height: 350px;
}
</style>
