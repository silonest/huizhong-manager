<template>
<!--由于vue2无法将元素挂在到body上，所以只能挂在在body内的div下，但这样不符合samentic的语法规范。会弹出错误提示。-->
<!-- 从右侧弹出的事件提醒栏 -->
<div class="ui cards" style="margin: 5px 5px;">
  <div class="card" v-for="item in items">
    <div class="content">
      <img class="ui right floated mini avatar image" src="../assets/imgs/user.jpg">
      <div class="header">张培旭</div>
      <div class="meta">注册于2017-12-05</div>
      <div class="description">
        <p>张培旭是xxxx，个人简介如下：</p>
        <p>我是一个xxxx，我要使用xxx软件。</p>
      </div>
    </div>
    <div class="extra content">
      <div class="ui two mini buttons">
        <div class="ui basic animated green button" tabindex="0">
          <div class="hidden content"><i class="check icon"></i></div>
          <div class="visible content">允许</div>
        </div>
        <div class="ui basic animated red button" tabindex="0">
          <div class="hidden content"><i class="close icon"></i></div>
          <div class="visible content">拒绝</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      items: [{
        message: '1'
      }, {
        message: '1'
      }, {
        message: '1'
      }]
    }
  }
}
</script>
