<template>
<div id="app" class="full compact">
  <!--导航菜单-->
  <div id="header" class="ui top fixed inverted main menu" style="top:0px;height:50px;background-color: #584B4F;">
    <div class="header item">汇中</div>
    <a class="click item" href="#/">软件管理</a>
    <a class="click item" href="#/user"> 用户管理</a>
    <div class="right menu">
      <a id="profile" class="item">
        <img id="test" class="ui mini avatar image" src="./assets/imgs/user.jpg" style="height:30px;width:30px;">
        <i class="angle down icon"></i>
      </a>
      <a id="apply" class="red item" @click="showPendingSidebar()">
        <i class="alarm icon" style="color:#FFFFFF;top:0px;bottom:0px;"></i>1
      </a>
    </div>
  </div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
import sidebar from './components/sidebar.vue'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    'app-sidebar': sidebar
  },
  methods: {

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
    $('#profile').popup({
      position: 'bottom right',
      inline: true,
      transition: 'slide down',
      delay: {
        show: 500
      },
      content: '点击编辑您的个人信息',
      on: 'hover'
    });
    $('#apply').popup({
      position: 'bottom right',
      inline: true,
      transition: 'slide down',
      delay: {
        show: 500
      },
      content: '点击审核注册和密钥申请',
      on: 'hover'
    });
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
  background-color: #F0EFED !important;
  background: #F0EFED !important;
}

.buttongray {
  background-color: #B4C1AE !important;
  background: #B4C1AE !important;
}
.buttongreen{
  background-color: #40A977 !important;
  background: #40A977 !important;
}
</style>
