<template>
<div id="app" class="full compact">
  <!--导航菜单-->
  <div id="header" class="ui top fixed inverted main menu" style="top:0px;height:50px;background-color: #584B4F;">
    <div class="header item" style="color:#EEEAE1;font-size:17px;">汇 中</div>
    <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/">软件管理</a>
    <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/user"> 用户管理</a>
    <a class="click item" style="color:#EEEAE1;font-size:15px;" href="#/role">角色管理</a>
    <div class="right menu">
      <a id="profile" class="item" style="height:50px;">
        <img class="ui mini avatar image" src="./assets/imgs/user.jpg" style="height:30px;width:30px;">
        <i class="angle down icon"></i>
      </a>
      <a id="apply" class="item" style="height:50px;" href="#/inspector" :class="(waitingCount.licenceCount + waitingCount.passCount) > 0 ? 'red' : null">
        <i class="mail icon" style="top:0px;bottom:0px;" :style="(waitingCount.licenceCount + waitingCount.passCount) > 0 ? {color: '#FFFFFF'} : null"></i>
        <template v-if="(waitingCount.licenceCount + waitingCount.passCount) > 0">{{waitingCount.licenceCount + waitingCount.passCount}}</template>
      </a>
    </div>
  </div>
  <keep-alive v-if="waitingCount.licenceCount != null || waitingCount.passCount != null">
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
//import sidebar from './components/sidebar.vue'
import axios from 'axios'
import inspectorEventBus from './components/inspector/eventBus.js';
export default {
  name: 'app',
  data() {
    return {
      waitingCount: {},
      alarmStyle: {},
      alarmClass: {}
    }
  },
  components: {
    //'app-sidebar': sidebar
  },
  methods: {
    fillInspectCount() {
      axios.get('/resource/dynamic/waiting/count')
        .then(response => {
          this.waitingCount = response.data.content;
          inspectorEventBus.setWaitingCount(this.waitingCount);
        }).catch(function(error) {
          alert(error);
        });
    }
  },
  mounted: function() {
    // $('.click.item').on('click', function() {
    //   $(this)
    //     .addClass('active')
    //     .closest('.ui.top.fixed.inverted.menu')
    //     .find('.item')
    //     .not($(this))
    //     .removeClass('active');
    // })
    this.fillInspectCount();
    //给新增软件中软件类型的下拉菜单绑定效果
    $('.ui.dropdown').dropdown({
      transition: 'slide down'
    });

    //给信息的关闭按钮绑定事件
    $('.message .close').on('click', function() {
      $(this).closest('.message').fadeOut();
    });
  }
}
</script>

<style>
@import '../semantic/dist/semantic.min.css';
@import '../toast/dist/jquery.toast.min.css';
.ui.inverted.menu .active.item,
.ui.inverted.menu {
  background-color: #72ACAB
}

.red.item {
  background-color: #C43627!important;
}

.ui.read.label,
.ui.read.labels .label {
  background-color: #C43627!important;
  border-color: #C43627!important;
}

.full {
  width: 100% !important;
  height: 100% !important;
}

.fullwidth {
  width: 100% !important;
}

.compact {
  margin: 0px !important;
  padding: 0px !important;
}

.lightgray {
  background-color: #EFEAE1 !important;
  background: #EFEAE1 !important;
}

.buttongray {
  background-color: #B4C1AE !important;
  background: #B4C1AE !important;
}

.buttongreen {
  background-color: #40A977 !important;
  background: #40A977 !important;
}

img {
  background: #FFFFFF !important;
}
</style>
